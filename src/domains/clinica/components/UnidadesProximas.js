import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Pressable,
    ActivityIndicator,
    Linking,
    Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MapPin, Navigation } from "lucide-react-native";
import { CLINICA, ENDERECO_CLINICA, urlMapaClinica } from "../services/clinicaService";
import { useLocalizacaoClinica } from "../hooks/useLocalizacaoClinica";

export function UnidadesProximas({ visivel, onFechar }) {
    const { localizacao, carregando, erro, buscarLocalizacao } = useLocalizacaoClinica(visivel);

    const abrirMapa = () => {
        Linking.openURL(urlMapaClinica(localizacao)).catch(() =>
            Alert.alert('Não foi possível abrir o mapa', 'Nenhum aplicativo de mapas ou navegador disponível.')
        );
    };

    return (
        <Modal
            visible={visivel}
            animationType="slide"
            presentationStyle="fullScreen"
            onRequestClose={onFechar} // botão voltar do Android
        >
            {/* O Modal abre numa janela nativa separada: sem um Provider aqui dentro,
                o SafeAreaView recebe margens 0 e o conteúdo vai para trás da barra de status. */}
            <SafeAreaProvider>
                <SafeAreaView style={styles.tela} edges={["top", "left", "right", "bottom"]}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Unidades próximas</Text>
                        <Pressable
                            onPress={onFechar}
                            hitSlop={10}
                            accessibilityRole="button"
                            accessibilityLabel="Fechar"
                            style={({ pressed }) => pressed && styles.pressed}
                        >
                            <Text style={styles.fechar}>Fechar</Text>
                        </Pressable>
                    </View>

                    <View style={styles.conteudo}>
                        {/* Funciona mesmo sem coordenadas: aí o mapa busca pelo endereço em texto. */}
                        <Pressable
                            onPress={abrirMapa}
                            accessibilityRole="button"
                            accessibilityLabel={`Abrir ${CLINICA.nome} no mapa`}
                            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
                        >
                            <MapPin size={32} color="#2F6BFF" strokeWidth={1.5} />
                            <View style={styles.info}>
                                <Text style={styles.nome}>{CLINICA.nome}</Text>
                                <Text style={styles.endereco}>{ENDERECO_CLINICA}</Text>
                                <View style={styles.abrirMapa}>
                                    <Navigation size={14} color="#2F6BFF" strokeWidth={2} />
                                    <Text style={styles.fechar}>Abrir no mapa</Text>
                                </View>
                            </View>
                        </Pressable>

                        {carregando && (
                            <View style={styles.status}>
                                <ActivityIndicator />
                                <Text style={styles.texto}>Localizando a clínica...</Text>
                            </View>
                        )}

                        {/* Falha é aviso, não erro fatal: o endereço continua visível acima. */}
                        {!carregando && erro && (
                            <View style={styles.status}>
                                <Text style={styles.aviso}>{erro}</Text>
                                <Pressable
                                    onPress={buscarLocalizacao}
                                    accessibilityRole="button"
                                    style={({ pressed }) => pressed && styles.pressed}
                                >
                                    <Text style={styles.fechar}>Tentar novamente</Text>
                                </Pressable>
                            </View>
                        )}

                        {!carregando && localizacao && (
                            <View style={styles.coordenadas}>
                                <Text style={styles.texto}>Latitude: {localizacao.latitude.toFixed(6)}</Text>
                                <Text style={styles.texto}>Longitude: {localizacao.longitude.toFixed(6)}</Text>
                            </View>
                        )}
                    </View>

                    {/* Atribuição visível ao OpenStreetMap: exigência da política de uso do Nominatim. */}
                    <Pressable
                        onPress={() => Linking.openURL("https://www.openstreetmap.org/copyright")}
                        accessibilityRole="link"
                        style={({ pressed }) => [styles.rodape, pressed && styles.pressed]}
                    >
                        <Text style={styles.credito}>Dados de localização © colaboradores do OpenStreetMap</Text>
                    </Pressable>
                </SafeAreaView>
            </SafeAreaProvider>
        </Modal>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#DCE6FF",
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111111",
    },
    fechar: {
        fontSize: 14,
        color: "#2F6BFF",
        fontWeight: "600",
    },
    pressed: { opacity: 0.6 },
    conteudo: {
        flex: 1,
        padding: 16,
        gap: 16,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        padding: 14,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#DCE6FF",
        borderLeftWidth: 4,
        borderLeftColor: "#2F6BFF",
    },
    info: { flex: 1 },
    nome: { fontSize: 16, fontWeight: "600", color: "#111111" },
    endereco: { fontSize: 14, color: "#6B7280", marginTop: 2 },
    abrirMapa: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 8,
    },
    status: {
        alignItems: "center",
        gap: 10,
        paddingVertical: 10,
    },
    coordenadas: {
        gap: 4,
        paddingHorizontal: 4,
    },
    texto: { fontSize: 14, color: "#111111" },
    aviso: { fontSize: 14, color: "#B45309", textAlign: "center" },
    rodape: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: "#DCE6FF",
    },
    credito: {
        fontSize: 12,
        color: "#6B7280",
        textAlign: "center",
    },
});
