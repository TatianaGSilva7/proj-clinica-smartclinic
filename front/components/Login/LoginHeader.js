import { View, Text, Button, StyleSheet  } from "react-native";
import { Heart, Star, Plus } from "lucide-react-native";

const LoginReader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Plus size={32} color="white" />
      </View>
        <Text style={styles.title}>SmartClinic</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DBEAFE',
    padding: 16,
  },
  iconContainer: {
    width: 50,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,        
    alignItems: 'center',      
    justifyContent: 'center',
  },
  title: {
    color: 'blue',
    fontSize: 20
  }
});

export default LoginReader;
