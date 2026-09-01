import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  Button,
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
