import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { medicosStyles as styles } from '../styles/medicosStyles';
import { useMedicos } from '../hooks/useMedicos';

export function MedicosScreen() {
  const {
    medicos,
    carregando,
    erro,
    formulario,
    setFormulario,
    editandoId,
    salvando,
    mensagem,
    buscarMedicos,
    salvar,
    editar,
    cancelarEdicao,
    confirmarExclusao,
  } = useMedicos();

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
        <TouchableOpacity
          style={[styles.botao, styles.botaoTentarNovamente]}
          onPress={buscarMedicos}
        >
          <Text style={styles.textoBotao}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {editandoId === null ? 'Novo médico' : 'Editar médico'}
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
        <TouchableOpacity
          style={[styles.botao, salvando && styles.botaoDesabilitado]}
          onPress={salvar}
          disabled={salvando}
        >
          <Text style={styles.textoBotao}>{salvando ? 'Salvando...' : 'Salvar'}</Text>
        </TouchableOpacity>
        {editandoId !== null && (
          <TouchableOpacity
            style={[styles.botao, styles.botaoSecundario]}
            onPress={cancelarEdicao}
          >
            <Text style={styles.textoBotao}>Cancelar</Text>
          </TouchableOpacity>
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
              <TouchableOpacity onPress={() => confirmarExclusao(item.id)}>
                <Text style={[styles.acao, styles.acaoExcluir]}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
