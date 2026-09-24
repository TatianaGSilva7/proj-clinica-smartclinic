import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { loginStyles as styles } from '../styles/loginStyles';
import { useLogin } from '../hooks/useLogin';

export function LoginScreen({ navigation }) {
  // reset em vez de navigate: o Login sai da pilha e o gesto de voltar não retorna a ele.
  const irParaHome = () => navigation.reset({ index: 0, routes: [{ name: 'Medicos' }] });
  const { email, setEmail, senha, setSenha, entrando, erro, entrar } = useLogin(irParaHome);

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

      <TouchableOpacity
        style={[styles.botao, entrando && styles.botaoDesabilitado]}
        onPress={entrar}
        disabled={entrando}
      >
        <Text style={styles.textoBotao}>{entrando ? 'Entrando...' : 'Entrar'}</Text>
      </TouchableOpacity>
    </View>
  );
}
