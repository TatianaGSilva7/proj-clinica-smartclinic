import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Fingerprint } from 'lucide-react-native';
import { useLoginBiometrico } from '../hooks/useLoginBiometrico';

export function LoginBiometrico({ navigation }) {
  const {
    verificando,
    podeUsarBiometria,
    motivoIndisponivel,
    autenticando,
    erro,
    autenticar,
    irParaLoginComSenha,
  } = useLoginBiometrico(navigation);

  // Sem este spinner o app "pisca" a tela de biometria para quem não tem sessão.
  if (verificando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho da marca */}
      <View style={styles.header}>
        <View style={styles.iconeMarca}>
          <Plus size={32} color="white" />
        </View>
        <View style={styles.headerTextos}>
          <Text style={styles.nomeMarca}>SmartClinic</Text>
          <Text style={styles.slogan}>Sua saúde, organizada em um só lugar.</Text>
        </View>
      </View>

      <View style={styles.corpo}>
        <Text style={styles.titulo}>Bem-vindo de volta</Text>

        {podeUsarBiometria ? (
          <>
            <Text style={styles.descricao}>
              Confirme sua biometria para liberar a sessão salva neste aparelho.
            </Text>
            <TouchableOpacity
              style={[styles.botao, autenticando && styles.botaoDesabilitado]}
              onPress={autenticar}
              disabled={autenticando}
            >
              <Fingerprint size={22} color="white" />
              <Text style={styles.textoBotao}>
                {autenticando ? 'Aguardando...' : 'Entrar com biometria'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.descricao}>{motivoIndisponivel}</Text>
        )}

        {erro && <Text style={styles.textoErro}>{erro}</Text>}

        {/* Sempre visível: biometria é atalho, nunca requisito. */}
        <TouchableOpacity onPress={irParaLoginComSenha} hitSlop={10}>
          <Text style={styles.link}>Entrar com e-mail e senha</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Paleta do SmartClinic (mesma da LoginScreen)
const cores = {
  primaria: '#2563EB',
  primariaClara: '#DBEAFE',
  marca: 'blue',
  erro: '#DC2626',
  textoSuave: '#7e7e7e',
  fundo: '#ffffff',
  branco: '#ffffff',
};

const styles = StyleSheet.create({
  // ---------- Layout base ----------
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: cores.fundo,
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.fundo,
  },

  // ---------- Cabeçalho ----------
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: cores.primariaClara,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
  },
  headerTextos: {
    flex: 1,
  },
  iconeMarca: {
    width: 50,
    height: 50,
    backgroundColor: cores.marca,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nomeMarca: {
    color: cores.marca,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Nunito_700Bold',
  },
  slogan: {
    fontSize: 13,
    fontWeight: '600',
    color: cores.textoSuave,
  },

  // ---------- Corpo ----------
  corpo: {
    padding: 20,
    gap: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Nunito_700Bold',
    color: cores.marca,
  },
  descricao: {
    fontSize: 14,
    color: cores.textoSuave,
  },
  botao: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: cores.primaria,
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  textoBotao: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: '700',
  },
  textoErro: {
    color: cores.erro,
    fontSize: 13,
    fontWeight: '600',
  },
  link: {
    fontSize: 16,
    fontWeight: '700',
    color: cores.primaria,
    textAlign: 'center',
  },
});
