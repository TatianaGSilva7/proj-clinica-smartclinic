import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 24, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  textoErro: {
    color: '#c0392b',
    textAlign: 'center',
    marginBottom: 12,
  },
  botao: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botaoDesabilitado: { opacity: 0.6 },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  botaoSair: {
    marginRight: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#c0392b',
  },
  textoBotaoSair: { color: '#fff', fontWeight: 'bold' },
});
