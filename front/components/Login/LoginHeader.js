import { View, Text, StyleSheet } from "react-native";
import { Plus } from "lucide-react-native";

const LoginReader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Plus size={32} color="white" />
      </View>
      <View>
        <Text style={styles.title}>SmartClinic</Text>
        <View style={styles.subtitle}>Sua saúde, organizada em um só lugar.</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#DBEAFE",
    padding: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "blue",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "blue",
    fontSize: 20,
    fontWeight: "700",
  fontFamily: 'Nunito_700Bold',
  },
  subtitle: {
    fontSize: 13,
    color: "#7e7e7e",
    fontWeight: "600",
  }
});

export default LoginReader;
