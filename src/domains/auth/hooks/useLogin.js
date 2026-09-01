import { useState } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { login } from '../services/authService';

export const TOKEN_KEY = 'authToken';

export function useLogin(onLoginSuccess) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [entrando, setEntrando] = useState(false);
  const [erro, setErro] = useState(null);

  const entrar = async () => {
    // Campo vazio não merece requisição — e a senha não sai pela rede à toa.
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha e-mail e senha.');
      return;
    }

    setEntrando(true);
    setErro(null);
    try {
      const { token } = await login(email.trim(), senha);
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      setSenha('');
      onLoginSuccess?.();
    } catch (e) {
      if (e.status === 401) {
        // 401 é credencial inválida: não dizemos qual dos dois campos errou.
        setErro('E-mail ou senha inválidos');
      } else {
        setErro(e.message);
      }
    } finally {
      // finally roda com sucesso OU com erro: o botão nunca fica travado.
      setEntrando(false);
    }
  };

  return { email, setEmail, senha, setSenha, entrando, erro, entrar };
}
