import { BASE_URL } from '../../../api/config';

export async function buscarMedicos() {
  const resposta = await fetch(`${BASE_URL}/medicos`);
  if (!resposta.ok) {
    throw new Error(`Erro HTTP ${resposta.status}`);
  }
  return await resposta.json();
}

 const excluirMedico = async (id) => {
    const resposta = await fetch(`${BASE_URL}/medicos/${id}`, {
      method: 'DELETE',
    });

    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status} ao excluir`);
    }
  }
 
 const criarMedico = async (dados) => {
    const resposta = await fetch(`${BASE_URL}/medicos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status} ao cadastrar`);
    }

    return await resposta.json();
  };
