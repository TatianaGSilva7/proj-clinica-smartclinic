import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, FlatList, Alert, TextInput } from 'react-native';
import { criarServicoBle, pedirPermissoes, MODO_SIMULADO } from '../../../services/bluetooth';
import { post } from '../../../api/http';

export function SinaisVitaisScreen({ navigation, route }) {
    const { consultaId } = route.params || {};

    const [estado, setEstado] = useState('PROCURANDO');
    const [aparelhos, setAparelhos] = useState([]);
    const [aparelhoSelecionado, setAparelhoSelecionado] = useState(null);
    const [leituras, setLeituras] = useState([]);
    const [bpmAtual, setBpmAtual] = useState(null);
    const [bateria, setBateria] = useState(null);
    const [desatualizado, setDesatualizado] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [modoManual, setModoManual] = useState(false);
    const [valorManual, setValorManual] = useState('');

    const servicoRef = useRef(null);
    const timeoutBuscaRef = useRef(null);
    const timeoutConexaoPerdidaRef = useRef(null);
    const aparelhoSelecionadoRef = useRef(null);
    const tentativasReconexaoRef = useRef(0);

    useEffect(() => {
        servicoRef.current = criarServicoBle();
        iniciarBusca();

        return () => {
            limparTimeouts();
            if (servicoRef.current) {
                servicoRef.current.pararBusca();
                servicoRef.current.desconectar();
            }
        };
    }, []);

    const limparTimeouts = () => {
        if (timeoutBuscaRef.current) clearTimeout(timeoutBuscaRef.current);
        if (timeoutConexaoPerdidaRef.current) clearTimeout(timeoutConexaoPerdidaRef.current);
    };

    const iniciarBusca = async () => {
        limparTimeouts();
        setEstado('PROCURANDO');
        setAparelhos([]);
        setDesatualizado(false);

        if (!MODO_SIMULADO) {
            const permitido = await pedirPermissoes();
            if (!permitido) {
                Alert.alert('Permissão Negada', 'Autorize o uso do Bluetooth nas configurações do seu celular para continuar.');
                setEstado('ERRO');
                return;
            }
        }

        servicoRef.current.procurar((erro, dispositivo) => {
            if (erro) return;
            if (dispositivo) {
                setAparelhos(prev => {
                    if (prev.find(d => d.id === dispositivo.id)) return prev;
                    return [...prev, dispositivo];
                });
            }
        });

        timeoutBuscaRef.current = setTimeout(() => {
            if (servicoRef.current) servicoRef.current.pararBusca();
            setEstado(prev => prev === 'PROCURANDO' ? 'BUSCA_FINALIZADA' : prev);
        }, 8000);
    };

    const conectar = async (aparelho) => {
        if (servicoRef.current) servicoRef.current.pararBusca();
        limparTimeouts();
        setAparelhoSelecionado(aparelho);
        aparelhoSelecionadoRef.current = aparelho;
        setEstado('CONECTANDO');

        try {
            await servicoRef.current.conectar(aparelho.id);
            setEstado('CONECTADO');

            // Ler bateria uma vez ao conectar
            const nivelBateria = await servicoRef.current.lerBateria();
            if (nivelBateria !== null) setBateria(nivelBateria);

            servicoRef.current.monitorarFrequencia((bpm) => {
                setBpmAtual(bpm);
                setDesatualizado(false);
                setLeituras(prev => [...prev, bpm]);

                if (timeoutConexaoPerdidaRef.current) clearTimeout(timeoutConexaoPerdidaRef.current);
                timeoutConexaoPerdidaRef.current = setTimeout(() => {
                    setDesatualizado(true);
                    tentarReconexao();
                }, 5000);
            });

            // Reset tentativas on successful connection
            tentativasReconexaoRef.current = 0;
        } catch (erro) {
            Alert.alert('Erro de Conexão', 'Não foi possível conectar. Aproxime o aparelho, confirme que está ligado e tente de novo.');
            setEstado('BUSCA_FINALIZADA');
            setAparelhoSelecionado(null);
        }
    };

    const tentarReconexao = async () => {
        if (tentativasReconexaoRef.current < 3) {
            tentativasReconexaoRef.current += 1;
            console.log(`Tentativa de reconexão: ${tentativasReconexaoRef.current}`);
            try {
                if (aparelhoSelecionadoRef.current) {
                    await servicoRef.current.conectar(aparelhoSelecionadoRef.current.id);
                    setDesatualizado(false);

                    const nivelBateria = await servicoRef.current.lerBateria();
                    if (nivelBateria !== null) setBateria(nivelBateria);

                    // Reiniciar monitoramento
                    servicoRef.current.monitorarFrequencia((bpm) => {
                        setBpmAtual(bpm);
                        setDesatualizado(false);
                        setLeituras(prev => [...prev, bpm]);

                        if (timeoutConexaoPerdidaRef.current) clearTimeout(timeoutConexaoPerdidaRef.current);
                        timeoutConexaoPerdidaRef.current = setTimeout(() => {
                            setDesatualizado(true);
                            tentarReconexao();
                        }, 5000);
                    });
                }
            } catch (err) {
                console.log('Falha na reconexão');
            }
        }
    };

    const tentarNovamente = () => {
        iniciarBusca();
    };

    const calcularMedia = () => {
        if (leituras.length === 0) return 0;
        const soma = leituras.reduce((acc, curr) => acc + curr, 0);
        return Math.round(soma / leituras.length);
    };

    const importarProntuario = async () => {
        if (leituras.length === 0) return;
        await enviarDados(calcularMedia(), 'bluetooth');
    };

    const enviarManual = async () => {
        const freq = parseInt(valorManual, 10);
        if (isNaN(freq) || freq <= 0) {
            Alert.alert('Valor inválido', 'Por favor, insira uma frequência cardíaca válida.');
            return;
        }
        await enviarDados(freq, 'manual');
    };

    const enviarDados = async (frequenciaCardiaca, origem) => {
        setEnviando(true);
        try {
            // TODO: Endpoint correto para Sinais Vitais
            await post('/sinais-vitais', {
                consultaId,
                frequenciaCardiaca,
                origem
            });

            if (servicoRef.current) servicoRef.current.desconectar();
            navigation.goBack();
        } catch (erro) {
            Alert.alert('Erro ao enviar', 'Houve um problema ao salvar os dados. Tente novamente.');
            setEnviando(false);
        }
    };

    if (modoManual) {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Inserção Manual</Text>
                <View style={styles.card}>
                    <Text style={styles.label}>Frequência Cardíaca (bpm)</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={valorManual}
                        onChangeText={setValorManual}
                        placeholder="Ex: 75"
                    />
                    <Pressable
                        style={[styles.botaoPrimary, (!valorManual || enviando) && styles.botaoDisabled]}
                        onPress={enviarManual}
                        disabled={!valorManual || enviando}
                    >
                        {enviando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTextoPrimary}>Salvar</Text>}
                    </Pressable>
                    <Pressable style={styles.botaoOutline} onPress={() => setModoManual(false)}>
                        <Text style={styles.botaoOutlineTexto}>Voltar para Bluetooth</Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    const renderConteudo = () => {
        if (estado === 'PROCURANDO') {
            return (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#2B3AB0" />
                    <Text style={styles.texto}>Buscando aparelhos...</Text>
                    <FlatList
                        data={aparelhos}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Pressable style={styles.itemAparelho} onPress={() => conectar(item)}>
                                <Text style={styles.textoAparelho}>{item.name}</Text>
                            </Pressable>
                        )}
                        style={{ marginTop: 20, width: '100%' }}
                    />
                </View>
            );
        }

        if (estado === 'BUSCA_FINALIZADA') {
            return (
                <View style={styles.center}>
                    {aparelhos.length === 0 ? (
                        <Text style={styles.textoInstrucao}>
                            Nenhum aparelho encontrado. Ligue o aparelho, deixe-o perto do celular e toque em Procurar novamente, ou digite os valores manualmente.
                        </Text>
                    ) : (
                        <FlatList
                            data={aparelhos}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <Pressable style={styles.itemAparelho} onPress={() => conectar(item)}>
                                    <Text style={styles.textoAparelho}>{item.name}</Text>
                                </Pressable>
                            )}
                            style={{ width: '100%' }}
                        />
                    )}
                    <Pressable style={styles.botaoOutline} onPress={tentarNovamente}>
                        <Text style={styles.botaoOutlineTexto}>Procurar novamente</Text>
                    </Pressable>
                </View>
            );
        }

        if (estado === 'CONECTANDO') {
            return (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#2B3AB0" />
                    <Text style={styles.texto}>Conectando... isso leva alguns segundos</Text>
                </View>
            );
        }

        if (estado === 'CONECTADO') {
            return (
                <View style={styles.center}>
                    <Text style={styles.nomeAparelho}>
                        {aparelhoSelecionado?.name} {bateria !== null && `(🔋 ${bateria}%)`}
                    </Text>
                    <Text style={[styles.bpm, desatualizado && styles.bpmDesatualizado]}>
                        {bpmAtual || '--'} <Text style={styles.bpmUnidade}>bpm</Text>
                    </Text>
                    {desatualizado && (
                        <Text style={styles.avisoDesatualizado}>Sem leituras recentes, a conexão pode ter caído</Text>
                    )}
                    <View style={styles.stats}>
                        <Text style={styles.textoStats}>{leituras.length} leituras recebidas</Text>
                        <Text style={styles.textoStats}>Média: {calcularMedia()} bpm</Text>
                    </View>

                    <Pressable
                        style={[styles.botaoPrimary, leituras.length === 0 && styles.botaoDisabled]}
                        onPress={importarProntuario}
                        disabled={leituras.length === 0 || enviando}
                    >
                        {enviando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTextoPrimary}>Importar para o prontuário</Text>}
                    </Pressable>
                </View>
            );
        }

        return (
            <View style={styles.center}>
                <Text style={styles.erroTexto}>Permissão necessária para buscar aparelhos.</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Sinais Vitais</Text>

            <View style={styles.card}>
                {renderConteudo()}
            </View>

            <View style={styles.manualContainer}>
                <Pressable style={styles.botaoManual} onPress={() => setModoManual(true)}>
                    <Text style={styles.botaoManualTexto}>Digitar os valores manualmente</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#FFFFFF' },
    titulo: { fontSize: 24, fontWeight: 'bold', color: '#2B3AB0', marginBottom: 20 },
    card: { backgroundColor: '#F9FAFE', padding: 20, borderRadius: 24, elevation: 0, minHeight: 300, borderWidth: 1, borderColor: '#E5E7EB' },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    texto: { fontSize: 16, color: '#111111', marginTop: 10, textAlign: 'center' },
    textoInstrucao: { fontSize: 16, color: '#111111', textAlign: 'center', marginBottom: 20 },
    itemAparelho: { backgroundColor: '#CBD5E5', padding: 15, borderRadius: 8, width: '100%', marginBottom: 10 },
    textoAparelho: { fontSize: 16, color: '#2B3AB0', fontWeight: 'bold' },
    botaoOutline: { borderWidth: 1, borderColor: '#2B3AB0', padding: 15, borderRadius: 8, marginTop: 20, width: '100%', alignItems: 'center' },
    botaoOutlineTexto: { color: '#2B3AB0', fontSize: 16, fontWeight: 'bold' },
    nomeAparelho: { fontSize: 18, color: '#2B3AB0', fontWeight: 'bold', marginBottom: 20 },
    bpm: { fontSize: 64, fontWeight: 'bold', color: '#2B3AB0' },
    bpmDesatualizado: { color: '#9AA3C7' },
    bpmUnidade: { fontSize: 24, fontWeight: 'normal' },
    avisoDesatualizado: { color: '#a33', marginTop: 10, textAlign: 'center' },
    stats: { marginTop: 30, marginBottom: 30, alignItems: 'center' },
    textoStats: { fontSize: 16, color: '#9AA3C7', marginBottom: 5 },
    botaoPrimary: { backgroundColor: '#2B3AB0', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center' },
    botaoDisabled: { backgroundColor: '#CBD5E5', borderColor: '#CBD5E5' },
    botaoTextoPrimary: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    erroTexto: { color: '#a33', fontSize: 16, textAlign: 'center' },
    manualContainer: { marginTop: 'auto', paddingVertical: 20 },
    botaoManual: { padding: 15, alignItems: 'center' },
    botaoManualTexto: { color: '#2B3AB0', fontSize: 16, textDecorationLine: 'underline' },
    label: { fontSize: 16, color: '#111111', marginBottom: 10 },
    input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 15, fontSize: 16, marginBottom: 20, backgroundColor: '#FFFFFF' }
});
