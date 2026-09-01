import { StyleSheet } from 'react-native';

export const medicosStyles = StyleSheet.create({
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
