import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  buscarMedicos as buscarMedicosApi,
  criarMedico,
  atualizarMedico,
  excluirMedico,
} from '../api/medicosApi';

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

  
  const buscarMedicos = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await buscarMedicosApi();
      setMedicos(dados);
    } catch (e) {
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
      setErro(e.message);
      Alert.alert('Não foi possível salvar', e.message);
    } finally {
      // finally roda com sucesso OU com erro: o botão nunca fica travado.
      setSalvando(false);
    }
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
