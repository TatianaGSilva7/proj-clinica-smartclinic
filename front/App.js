// App.js — Demo da Aula 3: consumo e escrita em API REST
//
// Exemplo usado no Momento 2 (Prática guiada / live coding), conduzido pelo
// roteiro A03_02_Roteiro_Pratica_Guiada.docx. É um app de uma tela só, fora
// do projeto do desafio: aqui o objetivo é ver o ciclo completo de uma
// requisição — LER (GET), CRIAR (POST), ATUALIZAR (PUT) e EXCLUIR (DELETE) —
// antes de os squads aplicarem o mesmo padrão dentro do app_clinica, no
// Momento 3.
//
// Antes de rodar o app, suba o mock da API em outro terminal, nesta mesma
// pasta:
//   npm run mock-api
// (isso executa: npx json-server --watch mockup/db.json --port 3000)
//
// Se estiver testando em um dispositivo físico (Expo Go), troque
// "localhost" pelo IP da sua máquina na mesma rede Wi-Fi.
//
// Dica para o live coding: abra o arquivo mockup/db.json ao lado do
// emulador. Cada POST/PUT/DELETE altera o arquivo na hora — os alunos veem
// o efeito da requisição no "banco de dados".

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';

// Em emulador/navegador na própria máquina, 'localhost' funciona.
// Em dispositivo físico (Expo Go), 'localhost' é o próprio celular: troque
// pelo IP da máquina que está rodando o json-server, na mesma rede Wi-Fi.
const BASE_URL = 'http://192.168.15.80:3000';

// Estado inicial do formulário (também usado para "limpar" depois de salvar).
const formVazio = { nome: '', especialidade: '', crm: '' };

export default function App() {
  const [medicos, setMedicos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados do formulário de escrita.
  const [formulario, setFormulario] = useState(formVazio);
  const [editandoId, setEditandoId] = useState(null); // null = cadastrando
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState(null); // feedback de sucesso

  // =======================================================================
  // LEITURA (revisão da Aula 2) — GET /medicos
  // =======================================================================
  const buscarMedicos = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await fetch(`${BASE_URL}/medicos`);
      if (!resposta.ok) {
        throw new Error(`Erro HTTP ${resposta.status}`);
      }
      const dados = await resposta.json();
      setMedicos(dados);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarMedicos();
  }, []);

  // =======================================================================
  // ESCRITA 1 — CRIAR: POST /medicos
  // =======================================================================
  // Diferenças em relação ao GET:
  //   - method: 'POST'
  //   - headers: avisamos ao servidor que o corpo é JSON
  //   - body: o objeto convertido em texto com JSON.stringify
  const criarMedico = async (dados) => {
    const resposta = await fetch(`${BASE_URL}/medicos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    // 201 Created é o status esperado aqui.
    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status} ao cadastrar`);
    }

    // A resposta traz o registro já com o id gerado pelo servidor.
    return await resposta.json();
  };

  // =======================================================================
  // ESCRITA 2 — ATUALIZAR: PUT /medicos/:id
  // =======================================================================
  // O id vai na URL (qual registro alterar) e os dados novos vão no corpo.
  const atualizarMedico = async (id, dados) => {
    const resposta = await fetch(`${BASE_URL}/medicos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status} ao atualizar`);
    }

    return await resposta.json();
  };

  // =======================================================================
  // ESCRITA 3 — EXCLUIR: DELETE /medicos/:id
  // =======================================================================
  // Não tem corpo: só a URL do registro que deve sumir.
  const excluirMedico = async (id) => {
    const resposta = await fetch(`${BASE_URL}/medicos/${id}`, {
      method: 'DELETE',
    });

    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status} ao excluir`);
    }
  };

  // =======================================================================
  // O QUE ACONTECE QUANDO O USUÁRIO TOCA EM "SALVAR"
  // =======================================================================
  const salvar = async () => {
    // Validação simples: nunca envie para a API um formulário vazio.
    if (!formulario.nome.trim() || !formulario.crm.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha pelo menos nome e CRM.');
      return;
    }

    setSalvando(true); // trava o botão: evita o usuário enviar duas vezes
    setErro(null);
    setMensagem(null);
    try {
      if (editandoId === null) {
        await criarMedico(formulario);
        setMensagem('Médico cadastrado com sucesso!');
      } else {
        await atualizarMedico(editandoId, formulario);
        setMensagem('Dados do médico atualizados!');
      }

      // Depois de escrever, voltamos ao estado inicial do formulário...
      setFormulario(formVazio);
      setEditandoId(null);

      // ...e recarregamos a lista, para a tela refletir o que está no
      // servidor (e não só o que digitamos).
      await buscarMedicos();
    } catch (e) {
      setErro(e.message);
      Alert.alert('Não foi possível salvar', e.message);
    } finally {
      // finally roda com sucesso OU com erro: o botão nunca fica travado.
      setSalvando(false);
    }
  };

  // Carrega os dados do médico escolhido no formulário (modo edição).
  const editar = (medico) => {
    setFormulario({
      nome: medico.nome,
      especialidade: medico.especialidade || '',
      crm: medico.crm || '',
    });
    setEditandoId(medico.id);
    setMensagem(null);
  };

  const cancelarEdicao = () => {
    setFormulario(formVazio);
    setEditandoId(null);
  };

  // Exclusão sempre com confirmação: é uma ação destrutiva e irreversível.
  const confirmarExclusao = (medico) => {
    Alert.alert(
      'Excluir médico',
      `Deseja realmente excluir ${medico.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await excluirMedico(medico.id);
              setMensagem('Médico excluído.');
              await buscarMedicos();
            } catch (e) {
              Alert.alert('Não foi possível excluir', e.message);
            }
          },
        },
      ]
    );
  };

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />
        <Text style={styles.texto}>Carregando médicos...</Text>
      </View>
    );
  }

  if (erro && medicos.length === 0) {
    return (
      <View style={styles.centro}>
        <Text style={styles.textoErro}>Não foi possível carregar os médicos.</Text>
        <Text style={styles.texto}>{erro}</Text>
        <Button title="Tentar novamente" onPress={buscarMedicos} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {editandoId === null ? 'Novo médico (POST)' : `Editando médico #${editandoId} (PUT)`}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={formulario.nome}
        onChangeText={(t) => setFormulario({ ...formulario, nome: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Especialidade"
        value={formulario.especialidade}
        onChangeText={(t) => setFormulario({ ...formulario, especialidade: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="CRM"
        value={formulario.crm}
        onChangeText={(t) => setFormulario({ ...formulario, crm: t })}
      />

      <View style={styles.linhaBotoes}>
        <View style={styles.botao}>
          <Button
            title={salvando ? 'Salvando...' : 'Salvar'}
            onPress={salvar}
            disabled={salvando}
          />
        </View>
        {editandoId !== null && (
          <View style={styles.botao}>
            <Button title="Cancelar" color="#6c757d" onPress={cancelarEdicao} />
          </View>
        )}
      </View>

      {/* Feedback visual de sucesso, logo abaixo do formulário. */}
      {mensagem && <Text style={styles.textoSucesso}>{mensagem}</Text>}

      <Text style={styles.subtitulo}>Médicos cadastrados</Text>
      <FlatList
        data={medicos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.detalhe}>
              {item.especialidade} — CRM: {item.crm}
            </Text>
            <View style={styles.linhaBotoes}>
              <TouchableOpacity onPress={() => editar(item)}>
                <Text style={styles.acao}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmarExclusao(item)}>
                <Text style={[styles.acao, styles.acaoExcluir]}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16, backgroundColor: '#fff' },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  subtitulo: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 8 },
  texto: { marginTop: 8, color: '#444', textAlign: 'center' },
  textoErro: { fontSize: 16, fontWeight: 'bold', color: '#c0392b', textAlign: 'center' },
  textoSucesso: { marginTop: 10, color: '#1e7e34', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  linhaBotoes: { flexDirection: 'row', gap: 12, marginTop: 8 },
  botao: { flex: 1 },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  nome: { fontSize: 16, fontWeight: 'bold', color: '#007AFF' },
  detalhe: { fontSize: 13, color: '#555', marginTop: 2 },
  acao: { color: '#007AFF', fontWeight: 'bold' },
  acaoExcluir: { color: '#c0392b' },
});
