import { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { obterToken } from '../../../api/sessao';

// A biometria NÃO autentica na API da clínica: ela só destranca, no próprio
// aparelho, o token que o login com e-mail e senha já guardou no cofre.
// Quem diz "esta pessoa pode entrar" continua sendo o servidor.

// Cancelar é escolha do usuário (ou do sistema), não erro: nada de mensagem.
const CANCELAMENTOS = ['user_cancel', 'system_cancel', 'app_cancel'];

export function useLoginBiometrico(navigation) {
  const [verificando, setVerificando] = useState(true);
  const [podeUsarBiometria, setPodeUsarBiometria] = useState(false);
  const [motivoIndisponivel, setMotivoIndisponivel] = useState(null);
  const [autenticando, setAutenticando] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;

    async function verificar() {
      // Falha ao consultar o sensor é tratada como "sem biometria": o link de
      // e-mail e senha continua na tela e ninguém fica trancado para fora.
      const [temSensor, temBiometria, token] = await Promise.all([
        LocalAuthentication.hasHardwareAsync().catch(() => false),
        LocalAuthentication.isEnrolledAsync().catch(() => false),
        obterToken(),
      ]);
      if (!ativo) return;

      // Sem token não há sessão para destrancar: direto para e-mail e senha.
      if (!token) {
        navigation.replace('Login');
        return;
      }

      if (!temSensor) {
        setMotivoIndisponivel('Este aparelho não tem sensor de biometria.');
      } else if (!temBiometria) {
        setMotivoIndisponivel(
          'Nenhuma biometria cadastrada neste aparelho. Cadastre uma nas configurações do sistema para usar este atalho.'
        );
      }
      setPodeUsarBiometria(temSensor && temBiometria);
      setVerificando(false);
    }

    verificar();
    return () => {
      ativo = false;
    };
  }, []);

  const autenticar = async () => {
    setAutenticando(true);
    setErro(null);
    try {
      const resultado = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Confirme sua biometria para entrar no SmartClinic',
        cancelLabel: 'Usar e-mail e senha',
      });

      if (resultado.success) {
        // reset em vez de navigate: o gesto de voltar não retorna à biometria.
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        return;
      }

      if (CANCELAMENTOS.includes(resultado.error)) return;

      if (resultado.error === 'lockout') {
        setErro('Muitas tentativas. A biometria foi bloqueada temporariamente: entre com e-mail e senha.');
      } else {
        setErro('Não foi possível confirmar a biometria. Tente de novo ou entre com e-mail e senha.');
      }
    } catch (e) {
      setErro('A biometria não está disponível agora. Entre com e-mail e senha.');
    } finally {
      setAutenticando(false);
    }
  };

  const irParaLoginComSenha = () => navigation.navigate('Login');

  return {
    verificando,
    podeUsarBiometria,
    motivoIndisponivel,
    autenticando,
    erro,
    autenticar,
    irParaLoginComSenha,
  };
}
