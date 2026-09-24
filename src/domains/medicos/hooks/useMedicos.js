import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  buscarMedicos as buscarMedicosApi,
  criarMedico,
  atualizarMedico,
  excluirMedico,
} from '../services/medicosService.js';
import { SessaoExpirada } from '../../../api/http';
import { useEncerrarSessao } from '../../login/hooks/useEncerrarSessao';

// Estado inicial do formulário (também usado para "limpar" depois de salvar).
const formVazio = { nome: '', especialidade: '', crm: '' };

export function useMedicos() {
  const [medicos, setMedicos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados do formulário de escrita.
  const [formulario, setFormulario] = useState(formVazio);
  const [editandoId, setEditandoId] = useState(null); // null = cadastrando
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState(null); // feedback de sucesso

  const encerrarSessao = useEncerrarSessao();

  // 401 não é erro genérico: a sessão acabou e o usuário volta ao Login.
  // Sem isso a tela mostraria "não foi possível carregar" para sempre.
  const sessaoExpirou = (e) => {
    if (e instanceof SessaoExpirada) {
      encerrarSessao('Sessão expirada');
      return true;
    }
    return false;
  };

  const buscarMedicos = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await buscarMedicosApi();
      setMedicos(dados);
    } catch (e) {
      if (sessaoExpirou(e)) return;
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarMedicos();
  }, []);

  
  const salvar = async () => {
    // Validação simples: nunca envie para a API um formulário vazio.
    if (!formulario.nome.trim() || !formulario.crm.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha pelo menos nome e CRM.');
      return;
    }

    setSalvando(true); // trava o botão: evita o usuário enviar duas vezes
    setErro(null);
    setMensagem(null);
    try {
      if (editandoId === null) {
        await criarMedico(formulario);
        setMensagem('Médico cadastrado com sucesso!');
      } else {
        await atualizarMedico(editandoId, formulario);
        setMensagem('Dados do médico atualizados!');
      }

      // Depois de escrever, voltamos ao estado inicial do formulário...
      setFormulario(formVazio);
      setEditandoId(null);

      // ...e recarregamos a lista, para a tela refletir o que está no
      // servidor (e não só o que digitamos).
      await buscarMedicos();
    } catch (e) {
      if (sessaoExpirou(e)) return;
      setErro(e.message);
      Alert.alert('Não foi possível salvar', e.message);
    } finally {
      // finally roda com sucesso OU com erro: o botão nunca fica travado.
      setSalvando(false);
    }
  };


  const editar = (medico) => {
    setFormulario(medico);
    setEditandoId(medico.id);
    setMensagem(null);
  };

  const cancelarEdicao = () => {
    setFormulario(formVazio);
    setEditandoId(null);
    setMensagem(null);
  };

  const confirmarExclusao = (id) => {
    Alert.alert('Excluir', 'Tem certeza que deseja excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await excluirMedico(id);
            await buscarMedicos();
          } catch (e) {
            if (sessaoExpirou(e)) return;
            Alert.alert('Erro', e.message);
          }
        },
      },
    ]);
  };

  return {
    medicos,
    carregando,
    erro,
    formulario,
    setFormulario,
    editandoId,
    salvando,
    mensagem,
    buscarMedicos,
    salvar,
    editar,
    cancelarEdicao,
    confirmarExclusao,
  };
}
