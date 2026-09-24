import { BASE_URL } from './config';
import { obterToken, limparToken } from './sessao';

// Único ponto do app que fala com a rede: monta os headers (com o token),
// chama o fetch e trata as respostas de forma padronizada.

export class SessaoExpirada extends Error {
    constructor(mensagem = "Sessão expirada") {
        super(mensagem);
        this.name = "SessaoExpirada";
    }
}

export async function requisicao(caminho, opcoes = {}) {
    const token = await obterToken();
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

    //Tratamentos
    if (response.status === 401) {
        await limparToken();
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
