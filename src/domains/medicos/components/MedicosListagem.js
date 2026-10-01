import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export function MedicosListagem({ medicos = [] }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Médicos cadastrados</Text>
            <FlatList
                data={medicos}
                keyExtractor={(item) => String(item.id)}
                ItemSeparatorComponent={() => <View style={styles.separador} />}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarTexto}>
                                {item.nome?.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text style={styles.especialidade}>{item.especialidade}</Text>
                            <Text style={styles.crm}>CRM: {item.crm}</Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.vazio}>Nenhum médico encontrado.</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111111",
        marginBottom: 14,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        padding: 14,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#DCE6FF",
        borderLeftWidth: 4,
        borderLeftColor: "#2F6BFF",
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#EAF0FF",
        alignItems: "center",
        justifyContent: "center",
    },
    avatarTexto: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2F6BFF",
    },
    info: {
        flex: 1,
    },
    nome: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111111",
    },
    especialidade: {
        fontSize: 14,
        color: "#2F6BFF",
        marginTop: 2,
    },
    crm: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
    },
    separador: {
        height: 10,
    },
    vazio: {
        fontSize: 14,
        color: "#6B7280",
        textAlign: "center",
        paddingVertical: 20,
    },
});