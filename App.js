import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { medicosStyles as styles } from './src/domains/medicos/styles/medicosStyles';
import { MedicosScreen } from './src/domains/medicos/screens/MedicosScreen';
import { LoginScreen } from './src/domains/auth/screens/LoginScreen';
import { TOKEN_KEY } from './src/domains/auth/hooks/useLogin';

export default function App() {
  const [verificandoSessao, setVerificandoSessao] = useState(true);
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync(TOKEN_KEY).then((token) => {
      setAutenticado(!!token);
      setVerificandoSessao(false);
    });
  }, []);

  if (verificandoSessao) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!autenticado) {
    return <LoginScreen onLoginSuccess={() => setAutenticado(true)} />;
  }

  return <MedicosScreen />;
}
