import { View, Text, Button, StyleSheet } from "react-native";
import { FingerprintPattern } from "lucide-react-native";
const LoginOptions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
        <FingerprintPattern size={20} color="black" />
        <Text>Biometria</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  buttonBox: {
    width: 'fit-content',
    flexDirection: "row",
    padding: 10,
    gap: 5,
    backgroundColor: "#dddbdb",
    borderRadius: 10,
    alignItems: 'center'
  },
});

export default LoginOptions;
