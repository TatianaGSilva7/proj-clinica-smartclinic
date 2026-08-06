import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { Heart, Star, Plus } from "lucide-react-native";

const LoginForm = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Bem vindo(A)!</Text>
        <Text style={styles.subtitle}>Faça o login para continuar</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputBox}>
          <Text style={styles.inputSubtitle}>Digite seu email</Text>
          <TextInput
            style={styles.input}
            placeholder="seuemail@exemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputSubtitle}>Digite sua senha</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
          />
        </View>
        <Button title="Enviar" onPress={() => {}} style={styles.buttom} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    gap: 6,
    height: 400,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 15,
    color: "#7e7e7e",
    fontWeight: "500",
  },
  form: {
    gap: 14,
    marginTop: 8,
  },
  inputBox: {
    gap: 5,
  },
  inputSubtitle: {
    fontSize: 13,
    color: "#000000",
    marginTop: 4,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 12,
    borderColor: "#d4d4d4",
    fontSize: 14,
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#000000",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default LoginForm;
