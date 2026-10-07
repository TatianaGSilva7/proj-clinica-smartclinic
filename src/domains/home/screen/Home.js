import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Especialidades } from "../components/Especialidades";
import { AcoesRapias } from "../components/AcoesRapidas";
import { ProximaConsulta } from "../components/ProximaConsulta";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useConsultas } from "../../consultas/hooks/useConsultas";


export function Home() {

    const { consultas } = useConsultas()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top", "left", "right"]}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            >
                <ProximaConsulta />
                <AcoesRapias />
                <Especialidades />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        mar: 50,
        backgroundColor: "#FFFFFF"
    },
});