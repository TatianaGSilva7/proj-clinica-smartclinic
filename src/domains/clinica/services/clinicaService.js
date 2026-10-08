import * as SecureStore from 'expo-secure-store';
import { geocodificar } from '../../../api/geocoding';

// Endereço da clínica. Ainda não existe na API, então fica aqui até existir.
export const CLINICA = {
    nome: 'Smart Clinic - Unidade Centro',
    logradouro: 'Rua Cândido Padim',
    numero: '25',
    bairro: 'Vila Prado',
    cidade: 'São Carlos',
    uf: 'SP',
};

export const ENDERECO_CLINICA =
    `${CLINICA.logradouro}, ${CLINICA.numero} - ${CLINICA.bairro}, ${CLINICA.cidade}/${CLINICA.uf}`;

// Link universal do Google Maps: abre o app de mapas se instalado, senão o navegador.
// Com coordenadas, o pino cai no ponto geocodificado; sem elas (geocoding falhou),
// buscamos pelo endereço em texto, e o usuário consegue chegar à clínica mesmo assim.
export function urlMapaClinica(localizacao) {
    const busca = localizacao
        ? `${localizacao.latitude},${localizacao.longitude}`
        : ENDERECO_CLINICA;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(busca)}`;
}

const CHAVE_CACHE = 'clinica.localizacao';

// O endereço da clínica não muda: geocodificar uma vez e reaproveitar
// economiza cota do Nominatim e deixa a tela instantânea nas próximas aberturas.
// Guardamos o endereço junto: se ele mudar aqui no código, o cache antigo é ignorado.
async function lerCache() {
    try {
        const salvo = JSON.parse(await SecureStore.getItemAsync(CHAVE_CACHE));
        return salvo?.endereco === ENDERECO_CLINICA ? salvo : null;
    } catch (erro) {
        return null; // cache é otimização: se falhar, só buscamos de novo
    }
}

export async function obterLocalizacaoClinica() {
    const emCache = await lerCache();
    if (emCache) return emCache;

    const { latitude, longitude } = await geocodificar(CLINICA);
    const localizacao = { endereco: ENDERECO_CLINICA, latitude, longitude };

    try {
        await SecureStore.setItemAsync(CHAVE_CACHE, JSON.stringify(localizacao));
    } catch (erro) {
        // Não conseguir salvar o cache não impede de mostrar a localização.
    }
    return localizacao;
}
