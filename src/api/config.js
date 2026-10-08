// Os endereços vêm do .env (cada integrante tem o seu, fora do Git; modelo em .env.example).
// Em dispositivo físico (Expo Go), 'localhost' é o próprio celular: use o IP da
// máquina que está rodando o servidor, na mesma rede Wi-Fi.
// Sem .env, cai em localhost, que funciona no emulador.
// Escreva process.env.EXPO_PUBLIC_... por extenso: o Expo substitui o texto no build.
export const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

// API de autenticação (servidor/auth-api.js), porta 3001.
export const AUTH_BASE_URL = process.env.EXPO_PUBLIC_AUTH_URL ?? 'http://localhost:3001';
