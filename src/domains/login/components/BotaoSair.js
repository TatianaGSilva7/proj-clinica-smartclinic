import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { loginStyles as styles } from '../styles/loginStyles';
import { useEncerrarSessao } from '../hooks/useEncerrarSessao';

export function BotaoSair() {
  const encerrarSessao = useEncerrarSessao();

  return (
    <TouchableOpacity style={styles.botaoSair} onPress={() => encerrarSessao()}>
      <Text style={styles.textoBotaoSair}>Sair</Text>
    </TouchableOpacity>
  );
}
