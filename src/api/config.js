import { obterToken, limparToken } from "./authStorage";

// Em emulador/navegador na própria máquina, 'localhost' funciona.
// Em dispositivo físico (Expo Go), 'localhost' é o próprio celular: troque
// pelo IP da máquina que está rodando o servidor, na mesma rede Wi-Fi.
export const BASE_URL = 'http://10.110.12.70:3000';

// API de autenticação (servidor/auth-api.js), porta 3001.
export const AUTH_BASE_URL = 'http://10.110.12.70:3001';
// api/config.js

const BASE_URL = "http://localhost:3001"; // decisão do squad: API nova (porta 3001) — ver README

export class SessaoExpirada extends Error {
    constructor(mensagem = "Sessão expirada") {
        super(mensagem);
        this.name = "SessaoExpirada";
    }
}

export async function requisicao(caminho, opcoes = {}) {
    const token = obterToken();
    const temCorpo = opcoes.body !== undefined;

    const headers = {
        ...(temCorpo && { 'Content-Type': 'application/json' }),
        ...opcoes.headers,
        ...(token && { Authorization: `Bearer ${token}` })
    };

    const response = await fetch(`${BASE_URL}${caminho}`, {
        ...opcoes,
        headers
    });

    //Trataentoss
    if (response.status === 401) {
        limparToken();
        throw new SessaoExpirada();
    }

    if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}


// Funções auxiliares para facilitar o uso das requisições
export const get = (caminho, opcoes = {}) =>
    requisicao(caminho, { ...opcoes, method: 'GET' });

export const post = (caminho, dados, opcoes = {}) =>
    requisicao(caminho, { ...opcoes, method: 'POST', body: JSON.stringify(dados) });

export const put = (caminho, dados, opcoes = {}) =>
    requisicao(caminho, { ...opcoes, method: 'PUT', body: JSON.stringify(dados) });

export const remover = (caminho, opcoes = {}) =>
    requisicao(caminho, { ...opcoes, method: 'DELETE' });