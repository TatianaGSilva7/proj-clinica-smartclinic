import * as SecureStore from 'expo-secure-store';


const CHAVE_TOKEN = 'clinica.token';

export async function salvarToken(token) {
  await SecureStore.setItemAsync(CHAVE_TOKEN, token);
}

export async function obterToken() {
  try {
    const token = await SecureStore.getItemAsync(CHAVE_TOKEN);
    return token;
  } catch (erro) {
    // Cofre indisponível: tratado como "não há sessão"
    console.log('Não foi possível acessar o cofre:', erro.message);
    return null;
  }
}

export async function limparToken() {
  await SecureStore.deleteItemAsync(CHAVE_TOKEN);
}

export async function estaLogado() {
  const token = await obterToken();
  return token !== null;
}