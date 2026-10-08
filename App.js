import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MedicosScreen } from './src/domains/medicos/screens/MedicosScreen';
import { LoginScreen } from './src/domains/login/screens/LoginScreen';
import { LoginBiometrico } from './src/domains/login/screens/LoginBiometrico';
import { BotaoSair } from './src/domains/login/components/BotaoSair';
import { Home } from './src/domains/home/screen/Home';
import { ConsultaScreen } from './src/domains/consultas/screen/ConsultaScreen';
import { SinaisVitaisScreen } from './src/domains/consultas/screen/SinaisVitais';

const Stack = createStackNavigator();

export default function App() {
  // Todas as rotas ficam sempre registradas: assim qualquer navigation.reset
  // (login, logout, sessão expirada) aponta para uma rota que existe.
  // Quem decide entre biometria e e-mail/senha é a LoginBiometrico, que
  // confere o cofre ao abrir e manda para o Login se não houver sessão.
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginBiometrico" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginBiometrico" component={LoginBiometrico} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Medicos"
          component={MedicosScreen}
          options={{ headerShown: true, title: 'Médicos', headerRight: () => <BotaoSair /> }}
        />
        <Stack.Screen name="Consulta" component={ConsultaScreen} />
        <Stack.Screen name="SinaisVitais" component={SinaisVitaisScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
