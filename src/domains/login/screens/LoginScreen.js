import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Plus, Fingerprint, ShieldCheck } from 'lucide-react-native';
import { useLogin } from '../hooks/useLogin';

export function LoginScreen({ navigation }) {
  // reset em vez de navigate: o Login sai da pilha e o gesto de voltar não retorna a ele.
  const irParaHome = () => navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  const { email, setEmail, senha, setSenha, entrando, erro, entrar } = useLogin(irParaHome);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
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

        {/* Formulário */}
        <View style={styles.formulario}>
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

        {/* Outras opções de acesso (somente visual, sem ação ligada) */}
        <View style={styles.opcoes}>
          <View style={styles.blocoSuperior}>
            <View style={styles.divisor}>
              <View style={styles.divisorLinha} />
              <Text style={styles.divisorTexto}>Ou entre com</Text>
              <View style={styles.divisorLinha} />
            </View>
            <View style={styles.botaoBiometria}>
              <Fingerprint size={20} color="black" />
              <Text>Biometria</Text>
            </View>
          </View>

          <View style={styles.cardSeguranca}>
            <ShieldCheck size={40} color="green" />
            <View style={styles.cardTextos}>
              <Text style={styles.cardTitulo}>Seus dados estão protegidos</Text>
              <Text style={styles.cardDescricao}>
                Utilizamos criptografia e autenticação para garantir a sua privacidade.
              </Text>
            </View>
          </View>

          <View style={styles.cadastro}>
            <Text>Ainda não tem uma conta?</Text>
            <Text style={styles.cadastroLink}>Cadastre-se</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Paleta do SmartClinic (mesma das telas separadas)
const cores = {
  primaria: '#2563EB',
  primariaClara: '#DBEAFE',
  marca: 'blue',
  sucesso: 'green',
  erro: '#DC2626',
  textoSuave: '#7e7e7e',
  borda: '#d4d4d4',
  cinzaBotao: '#dddbdb',
  fundo: '#ffffff',
  branco: '#ffffff',
};

const styles = StyleSheet.create({
  // ---------- Layout base ----------
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },

  // Centraliza verticalmente todo o conteúdo (cabeçalho, formulário e opções)
  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
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
    flex: 1, // permite o slogan quebrar linha em vez de estourar a tela
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

  // ---------- Formulário ----------
  formulario: {
    padding: 20,
    gap: 12,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Nunito_700Bold',
    color: cores.marca,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: cores.fundo,
  },
  textoErro: {
    color: cores.erro,
    fontSize: 13,
    fontWeight: '600',
  },
  botao: {
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

  // ---------- Opções de acesso ----------
  opcoes: {
    padding: 16,
    gap: 20,
  },
  blocoSuperior: {
    alignItems: 'center',
    gap: 12,
  },
  divisor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  divisorLinha: {
    flex: 1,
    height: 1,
    backgroundColor: cores.borda,
  },
  divisorTexto: {
    fontSize: 12,
    color: cores.textoSuave,
  },
  botaoBiometria: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 10,
    backgroundColor: cores.cinzaBotao,
    borderRadius: 10,
  },
  cardSeguranca: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: cores.sucesso,
  },
  cardTextos: {
    flex: 1,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: cores.sucesso,
  },
  cardDescricao: {
    fontSize: 13,
    fontWeight: '500',
    color: cores.textoSuave,
  },
  cadastro: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  cadastroLink: {
    fontSize: 16,
    fontWeight: '700',
    color: cores.primaria,
  },
});