import { View, Text, StyleSheet } from "react-native";
import { Fingerprint, ShieldCheck } from "lucide-react-native";

const LoginOptions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.upperBox}>
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Ou entre com</Text>
          <View style={styles.dividerLine} />
        </View>
        <View style={styles.buttonBox}>
          <Fingerprint size={20} color="black" />
          <Text>Biometria</Text>
        </View>
      </View>
      <View style={styles.card}>
        <ShieldCheck size={40} color="green" />
        <View style={styles.textBox}>
          <Text style={styles.title}>Seus dados estão protegidos</Text>
          <Text style={styles.subtitle}>
            Utilizamos criptografia e autenticação para garantir a sua
            privacidade.
          </Text>
        </View>
      </View>
      <View style={styles.registerBox}>
        <Text>Ainda não tem uma conta?</Text>
        <Text style={styles.register}>Cadastre-se</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    gap: 20,
  },
  upperBox: {
    alignItems: "center",
    gap: 12,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#d4d4d4",
  },
  dividerText: {
    fontSize: 12,
    color: "#7e7e7e",
  },
  buttonBox: {
    flexDirection: "row",
    padding: 10,
    gap: 5,
    backgroundColor: "#dddbdb",
    borderRadius: 10,
    alignItems: "center",
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: "green",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 10,
  },
  textBox: {
    flex: 1,        
  },
  title: {
    fontSize: 16,     
    fontWeight: "600",
    color: "green",
  },
  subtitle: {
    fontSize: 13,
    color: "#7e7e7e",
    fontWeight: "500",
  },
  registerBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5
  },
  register: {
     fontSize: 16,     
    fontWeight: "700",
    color: "#2563EB",
  }
});

export default LoginOptions;