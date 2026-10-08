import { buscarExterno, ServicoExternoIndisponivel } from './httpExterno';

// Geocoding = endereço -> coordenadas, via Nominatim (OpenStreetMap).
// Política de uso: User-Agent identificando o app (o httpExterno já envia),
// no máximo 1 requisição por segundo e atribuição visível ao OpenStreetMap.
// Para vários endereços, espace as chamadas em 1 s: nada de Promise.all.

const SERVICO = 'Mapa (OpenStreetMap)';
const URL_BASE = 'https://nominatim.openstreetmap.org/search';

export async function geocodificar({ logradouro, numero, cidade, uf }) {
    const parametros = {
        street: numero ? `${numero} ${logradouro}` : logradouro,
        city: cidade,
        state: uf,
        country: 'Brasil',
        format: 'json',
        limit: '1',
    };
    const query = Object.entries(parametros)
        .map(([chave, valor]) => `${chave}=${encodeURIComponent(valor)}`)
        .join('&');

    let resultados;
    try {
        resultados = await buscarExterno(SERVICO, `${URL_BASE}?${query}`);
    } catch (e) {
        // 403 aqui não é erro de código: é o app descumprindo a política de uso.
        if (e instanceof ServicoExternoIndisponivel && e.status === 403) {
            throw new ServicoExternoIndisponivel(SERVICO, 'Acesso recusado pelo serviço de mapas.', 403);
        }
        throw e;
    }

    // 200 com lista vazia: o transporte deu certo, mas não há resultado.
    // Sem esta checagem, resultados[0].lat quebraria com "undefined".
    if (!Array.isArray(resultados) || !resultados.length) {
        throw new Error('Endereço não encontrado no mapa.');
    }

    // Traduz para o nosso vocabulário: trocar de fornecedor mexe só neste arquivo.
    const [primeiro] = resultados;
    return {
        latitude: Number(primeiro.lat),
        longitude: Number(primeiro.lon),
        enderecoEncontrado: primeiro.display_name,
    };
}
