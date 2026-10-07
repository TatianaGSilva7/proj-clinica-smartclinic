

import { useState, useEffect, useMemo, useCallback } from "react";
import { SessaoExpirada } from "../../../api/http";
import { buscarConsultas as buscarConsultasApi  } from "../services/consultasService";

export function useConsultas() {
    const [consultas, setConsultas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const buscarConsultas = useCallback(async () => {
        setCarregando(true);
        setErro(null);
        try {
            const dados = await buscarConsultasApi();
            console.log(dados)
            setConsultas(dados);
        } catch (e) {
                console.log("ERRO consultas:", e.name, e.message);

            if (e instanceof SessaoExpirada) return;
            setErro(e.message);
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        buscarConsultas();
        console.log(consultas)
    }, [buscarConsultas]);

    const { proxima, recentes } = useMemo(() => {
        const agora = new Date();
        const ordenadas = [...consultas].sort(
            (a, b) => new Date(a.dataHora) - new Date(b.dataHora)
        );

        const futuras = ordenadas.filter((c) => new Date(c.dataHora) >= agora);
        const passadas = ordenadas.filter((c) => new Date(c.dataHora) < agora);

        return {
            proxima: futuras[0] ?? null,          
            recentes: passadas.reverse(),  
        };
    }, [consultas]);

    return { consultas, proxima, recentes, carregando, erro };
}