import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { HeartPulse, Brain, ShieldPlus } from "lucide-react-native";

// O lucide não tem ícone de estômago, então este segue o mesmo padrão
// (24x24, traço arredondado) e aceita as mesmas props: size, color, strokeWidth.
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
  { key: "cardio", label: "Cardiologia", Icon: HeartPulse },
  { key: "neuro", label: "Neurologia", Icon: Brain },
  { key: "gastro", label: "Gastro.", Icon: Stomach },
  { key: "clinico", label: "Clínico\nGeral", Icon: ShieldPlus },
];

export function Especialidades({ onVerTodas, onSelecionar }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Especialidades</Text>
        <Pressable
          onPress={onVerTodas}
          accessibilityRole="link"
          hitSlop={8}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Text style={styles.link}>Ver todas</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        {ESPECIALIDADES.map(({ key, label, Icon }) => (
          <Pressable
            key={key}
            onPress={() => onSelecionar?.(key)}
            accessibilityRole="button"
            accessibilityLabel={label.replace("\n", " ")}
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
          >
            <Icon size={40} color="#111111" strokeWidth={1.5} />
            <Text style={styles.label}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
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