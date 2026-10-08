// Primo do http.js, mas para servidores que NÃO são nossos (ViaCEP, Nominatim...).
// Não dá para reiniciar, corrigir nem pedir campo novo para eles, então aqui
// entram timeout, User-Agent e mensagens que digam QUAL serviço falhou.
// NUNCA envie o token da clínica por aqui: seria vazar a credencial para terceiros.

const TIMEOUT_MS = 8000;

// Alguns serviços (Nominatim) exigem que o app se identifique: sem isso, 403.
const USER_AGENT = 'SmartClinic/1.0 (projeto academico - app de clinica)';

export class ServicoExternoIndisponivel extends Error {
    constructor(servico, mensagem, status = null) {
        super(mensagem);
        this.name = "ServicoExternoIndisponivel";
        this.servico = servico; // a tela usa para dizer qual serviço falhou
        this.status = status;   // o service de cada fornecedor pode tratar códigos específicos (ex.: 403)
    }
}

export async function buscarExterno(servico, url, opcoes = {}) {
    // AbortController é a forma padrão de cancelar um fetch.
    // Sem ele, um serviço que não responde deixa a tela em "Carregando..." para sempre.
    const controle = new AbortController();
    const timer = setTimeout(() => controle.abort(), TIMEOUT_MS);

    try {
        let resposta;
        try {
            resposta = await fetch(url, {
                ...opcoes,
                headers: {
                    Accept: 'application/json',
                    'User-Agent': USER_AGENT,
                    ...opcoes.headers,
                },
                signal: controle.signal,
            });
        } catch (e) {
            // Mensagem técnica vai para o console; a amigável vai para a tela.
            // A URL não é logada: ela pode conter CEP/endereço do paciente.
            console.log(`[${servico}] falha na requisição:`, e.name);
            if (e.name === 'AbortError') {
                throw new ServicoExternoIndisponivel(servico, 'O serviço demorou demais para responder.');
            }
            throw new ServicoExternoIndisponivel(servico, 'Sem conexão com o serviço.');
        }

        //Tratamentos
        if (resposta.status === 429) {
            // Insistir depois de um 429 costuma render um bloqueio maior.
            throw new ServicoExternoIndisponivel(servico, 'Limite de consultas atingido. Tente mais tarde.', 429);
        }

        // Conferir o status ANTES do .json(): o corpo de erro pode ser HTML,
        // e o erro viraria um "Unexpected token <" que não explica nada.
        if (!resposta.ok) {
            console.log(`[${servico}] respondeu status ${resposta.status}`);
            throw new ServicoExternoIndisponivel(servico, 'O serviço respondeu com erro.', resposta.status);
        }

        try {
            return await resposta.json();
        } catch (e) {
            throw new ServicoExternoIndisponivel(servico, 'O serviço devolveu uma resposta inválida.', resposta.status);
        }
    } finally {
        // Roda com sucesso OU com erro: o timer nunca fica pendurado.
        clearTimeout(timer);
    }
}
