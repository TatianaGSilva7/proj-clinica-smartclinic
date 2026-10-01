import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { User } from "lucide-react-native";

const PLACEHOLDER_CONSULTA = {
  data: "12 de agosto, 10:30",
  medico: "Dr. Rafael A. Costa",
  especialidade: "Cardiologia",
  local: "Clínica Vita - Unidade Centro",
  foto: null, 
};

export  function ProximaConsulta({
  nome = "Tatiana",
  avatar = null, 
  consulta = PLACEHOLDER_CONSULTA,
  onDetalhes,
  onReagendar,
}) {
  const { data, medico, especialidade, local, foto } = consulta;

  return (
    <View style={styles.container}>
      <View style={styles.saudacao}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar} />
        )}
        <View style={styles.saudacaoTextos}>
          <Text style={styles.ola}>Olá, {nome}! 👋</Text>
          <Text style={styles.subtitulo}>Como está se sentindo hoje?</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.cardTopo}>
          <View style={styles.infos}>
            <Text style={styles.proxima}>Próxima consulta</Text>
            <Text style={styles.data}>{data}</Text>
            <Text style={styles.medico}>{medico}</Text>
            <Text style={styles.especialidade}>{especialidade}</Text>
          </View>

          {foto ? (
            <Image source={{ uri: foto }} style={styles.foto} />
          ) : (
            <View style={[styles.foto, styles.fotoPlaceholder]}>
              <User size={48} color="#9AA3C7" strokeWidth={1.5} />
            </View>
          )}
        </View>
        <View style={styles.localRow}>
          <View style={styles.ponto} />
          <Text style={styles.local}>{local}</Text>
        </View>
        <View style={styles.botoes}>
          <Pressable
            onPress={onDetalhes}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.botao,
              styles.botaoDetalhes,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.textoDetalhes}>Detalhes</Text>
          </Pressable>
          <Pressable
            onPress={onReagendar}
            accessibilityRole="button"
            style={({ pressed }) => [styles.botao, pressed && styles.pressed]}
          >
            <Text style={styles.textoReagendar}>Reagendar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    gap: 16,
  },

  saudacao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#5B9CFF",
  },
  saudacaoTextos: {
    flex: 1,
  },
  ola: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2B3AB0",
  },
  subtitulo: {
    fontSize: 14,
    color: "#111111",
    marginTop: 2,
  },

  card: {
    backgroundColor: "#2B3AB0",
    borderRadius: 24,
    padding: 16,
    gap: 16,
  },
  cardTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  infos: {
    flex: 1,
    paddingTop: 8,
  },
  proxima: {
    fontSize: 13,
    color: "#D6DBF5",
    marginBottom: 6,
  },
  data: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  medico: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  especialidade: {
    fontSize: 14,
    color: "#D6DBF5",
    marginTop: 4,
  },
  foto: {
    width: 100,
    height: 120,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
  },
  fotoPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },

  localRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ponto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
  },
  local: {
    fontSize: 14,
    color: "#FFFFFF",
  },

  botoes: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 0,
    overflow: "hidden",
  },
  botao: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoDetalhes: {
    backgroundColor: "#CBD5E5",
    borderRadius: 6,
    margin: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  textoDetalhes: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2B3AB0",
  },
  textoReagendar: {
    fontSize: 14,
    color: "#2B3AB0",
  },
});