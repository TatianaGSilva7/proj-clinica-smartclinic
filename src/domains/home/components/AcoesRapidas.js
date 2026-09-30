import React from "react";

import { View, Text, Pressable, StyleSheet } from "react-native";
import {
    CalendarDays,
    FileCheck,
    MapPin,
    MessagesSquare,
} from "lucide-react-native";

export function AcoesRapias({
    onSchedule,
    onExams,
    onUnits,
    onChat,
}) {

    const actions = [
        { key: "schedule", label: "Agendar\nconsulta", Icon: CalendarDays, onPress: onSchedule },
        { key: "exams", label: "Meus\nexames", Icon: FileCheck, onPress: onExams },
        { key: "units", label: "Unidades\npróximas", Icon: MapPin, onPress: onUnits },
        { key: "chat", label: "Falar com a\nclínica", Icon: MessagesSquare, onPress: onChat },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ações rápidas</Text>
            <View style={styles.row}>
                {actions.map(({ key, label, Icon, onPress }) => (
                    <Pressable
                        key={key}
                        onPress={onPress}
                        accessibilityRole="button"
                        accessibilityLabel={label.replace("\n", " ")}
                        style={({ pressed }) => [styles.item, pressed && styles.pressed]}
                    >
                        <Icon size={40} color="#2563EB" strokeWidth={1.5} />
                        <Text style={styles.label}>{label}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#FFFFFF",
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111111",
        marginBottom: 20,
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
        // fontFamily: "Inter_400Regular",
    },
});