import React from "react";
import { useState, useMemo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { HeartPulse, Brain, ShieldPlus } from "lucide-react-native";
import { MedicosListagem } from "../../medicos/components/MedicosListagem";
import { useMedicos } from "../../medicos/hooks/useMedicos";



function Stomach({ size = 24, color = "#111111", strokeWidth = 2 }) {

    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Path d="M8 2.5h3.5V7c0 1.7 1 2.5 2.7 2.5H16c3 0 5 2.2 5 5.3 0 3.7-3 6.7-7.3 6.7C8.5 21.5 4.5 18 4.5 13.5c0-2 1-3.2 2.2-4.2C7.600 8.600 8 7.800 8 6.500V2.500Z" />
            <Path d="M11.500 4.500H14" />
        </Svg>
    );
}

const ESPECIALIDADES = [
    { key: "cardio", label: "Cardiologia", valor: "Cardiologista", Icon: HeartPulse },
    { key: "neuro", label: "Neurologia", valor: "Neurologista", Icon: Brain },
    { key: "gastro", label: "Gastro.", valor: "Gastroenterologista", Icon: Stomach },
    { key: "clinico", label: "Clínico\nGeral", valor: "Clínico Geral", Icon: ShieldPlus },
];

const normalizar = (texto = "") =>
    texto.normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();

export function Especialidades({ onVerTodas, onSelecionar }) {
    const { medicos } = useMedicos();
    const [especialidade, setEspecialidade] = useState(null);
    const medicosFiltrados = useMemo(() => {
        if (!especialidade) return medicos;
        const alvo = normalizar(especialidade);
        return medicos.filter((med) => normalizar(med.especialidade) === alvo);
    }, [medicos, especialidade]);

    const selecionar = (valor) => {
        // clicar de novo no mesmo ícone desmarca o filtro
        const novo = especialidade === valor ? null : valor;
        setEspecialidade(novo);
        onSelecionar?.(novo);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agendar Consultas</Text>
            <View style={styles.row}>
                {ESPECIALIDADES.map(({ key, label, valor, Icon }) => {
                    const ativo = especialidade === valor;
                    return (
                        <Pressable
                            key={key}
                            onPress={() => selecionar(valor)}
                            accessibilityRole="button"
                            accessibilityState={{ selected: ativo }}
                            accessibilityLabel={label.replace("\n", " ")}
                            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
                        >
                            <Icon size={40} color={ativo ? "#2F6BFF" : "#111111"} strokeWidth={1.5} />
                            <Text style={[styles.label, ativo && { color: "#2F6BFF" }]}>{label}</Text>
                        </Pressable>
                    );
                })}
            </View>
            <MedicosListagem
                visivel={especialidade !== null}
                onFechar={() => setEspecialidade(null)}
                medicos={medicosFiltrados}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#FFFFFF",
        gap: 20
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111111",
    },
    link: {
        fontSize: 14,
        color: "#2F6BFF",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    item: {
        flex: 1,
        alignItems: "center",
        gap: 10,
    },
    pressed: {
        opacity: 0.6,
    },
    label: {
        fontSize: 13,
        lineHeight: 17,
        textAlign: "center",
        color: "#111111",
    },
});