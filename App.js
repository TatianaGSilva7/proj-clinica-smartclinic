import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { estaLogado } from './src/api/sessao';
import { medicosStyles as styles } from './src/domains/medicos/styles/medicosStyles';
import { MedicosScreen } from './src/domains/medicos/screens/MedicosScreen';
import { LoginScreen } from './src/domains/login/screens/LoginScreen';
import { BotaoSair } from './src/domains/login/components/BotaoSair';

const Stack = createStackNavigator();

export default function App() {
  // null = ainda verificando o cofre; true/false = resultado de estaLogado().
  const [logado, setLogado] = useState(null);

  useEffect(() => {
    estaLogado().then(setLogado);
  }, []);

  // Sem este spinner o app "pisca" a tela de Login para quem já estava autenticado.
  if (logado === null) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={logado ? 'Medicos' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Medicos"
          component={MedicosScreen}
          options={{ title: 'Médicos', headerRight: () => <BotaoSair /> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
