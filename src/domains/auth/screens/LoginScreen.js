import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { loginStyles as styles } from '../styles/loginStyles';
import { useLogin } from '../hooks/useLogin';

export function LoginScreen({ onLoginSuccess }) {
  const { email, setEmail, senha, setSenha, entrando, erro, entrar } = useLogin(onLoginSuccess);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Entrar</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        autoCapitalize="none"
        secureTextEntry
      />

      {erro && <Text style={styles.textoErro}>{erro}</Text>}

      <Button title={entrando ? 'Entrando...' : 'Entrar'} onPress={entrar} disabled={entrando} />
    </View>
  );
}
