import * as SecureStore from 'expo-secure-store';

export const TOKEN_KEY = 'authToken';

export async function salvarToken(token) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function obterToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function limparToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}