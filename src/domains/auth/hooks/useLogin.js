import { useState } from 'react';
import { Alert } from 'react-native';
import { login } from '../services/authService';
import { salvarToken } from '../../../api/token';

export function useLogin(onLoginSuccess) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [entrando, setEntrando] = useState(false);
  const [erro, setErro] = useState(null);

  const entrar = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha e-mail e senha.');
      return;
    }

    setEntrando(true);
    setErro(null);
    try {
      const { token } = await login(email.trim(), senha);
      await salvarToken(token);
      setSenha('');
      onLoginSuccess?.();
    } catch (e) {
      if (e.status === 401) {
        setErro('E-mail ou senha inválidos');
      } else {
        setErro(e.message);
      }
    } finally {
      setEntrando(false);
    }
  };

  return { email, setEmail, senha, setSenha, entrando, erro, entrar };
}