import { useState, useEffect, useCallback } from 'react';
import { ServicoExternoIndisponivel } from '../../../api/httpExterno';
import { obterLocalizacaoClinica } from '../services/clinicaService';

// Só busca quando `ativo` (modal aberto): abrir a Home não gasta cota do serviço externo.
export function useLocalizacaoClinica(ativo) {
    const [localizacao, setLocalizacao] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    const buscarLocalizacao = useCallback(async () => {
        setCarregando(true);
        setErro(null);
        try {
            setLocalizacao(await obterLocalizacaoClinica());
        } catch (e) {
            // Serviço externo fora: dizemos QUAL falhou. Sem SessaoExpirada aqui,
            // porque o token da clínica não vai para terceiros.
            setErro(e instanceof ServicoExternoIndisponivel ? `${e.servico}: ${e.message}` : e.message);
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        if (ativo && !localizacao) buscarLocalizacao();
    }, [ativo, localizacao, buscarLocalizacao]);

    return { localizacao, carregando, erro, buscarLocalizacao };
}
