import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { estaLogado } from './src/domains/auth/services/sessao';
import { medicosStyles as styles } from './src/domains/medicos/styles/medicosStyles';
import { MedicosScreen } from './src/domains/medicos/screens/MedicosScreen';
import { LoginScreen } from './src/domains/auth/screens/LoginScreen';

export default function App() {
  const [verificandoSessao, setVerificandoSessao] = useState(true);
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    estaLogado().then((logado) => {
      setAutenticado(logado);
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
