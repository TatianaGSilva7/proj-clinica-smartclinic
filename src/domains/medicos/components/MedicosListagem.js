import React from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Modal,
    Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function MedicosListagem({ visivel, onFechar, medicos = [], titulo = "Médicos" }) {
    return (
        <Modal
            visible={visivel}
            animationType="slide"
            presentationStyle="fullScreen"
            onRequestClose={onFechar} // botão voltar do Android
        >
            <SafeAreaView style={styles.tela} edges={["top", "left", "right", "bottom"]}>
                <View style={styles.header}>
                    <Text style={styles.title}>{titulo}</Text>
                    <Pressable
                        onPress={onFechar}
                        hitSlop={10}
                        accessibilityRole="button"
                        accessibilityLabel="Fechar"
                        style={({ pressed }) => pressed && styles.pressed}
                    >
                        <Text style={styles.fechar}>Fechar</Text>
                    </Pressable>
                </View>

                <FlatList
                    data={medicos}
                    keyExtractor={(item) => String(item.id)}
                    contentContainerStyle={styles.lista}
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
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#DCE6FF",
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111111",
    },
    fechar: {
        fontSize: 14,
        color: "#2F6BFF",
        fontWeight: "600",
    },
    pressed: { opacity: 0.6 },
    lista: {
        padding: 16,
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
    avatarTexto: { fontSize: 18, fontWeight: "700", color: "#2F6BFF" },
    info: { flex: 1 },
    nome: { fontSize: 16, fontWeight: "600", color: "#111111" },
    especialidade: { fontSize: 14, color: "#2F6BFF", marginTop: 2 },
    crm: { fontSize: 12, color: "#6B7280", marginTop: 2 },
    separador: { height: 10 },
    vazio: {
        fontSize: 14,
        color: "#6B7280",
        textAlign: "center",
        paddingVertical: 20,
    },
});