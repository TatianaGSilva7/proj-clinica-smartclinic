import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../services/authService';

// Encerrar a sessão = apagar o token do cofre E voltar ao Login.
// Só navegar deixaria a sessão viva: quem reabrisse o app entraria sem senha.
// Usado pelo botão Sair e pelas telas que recebem SessaoExpirada (401).
export function useEncerrarSessao() {
  const navigation = useNavigation();

  return async (aviso) => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    if (aviso) {
      Alert.alert(aviso, 'Entre novamente para continuar.');
    }
  };
}
