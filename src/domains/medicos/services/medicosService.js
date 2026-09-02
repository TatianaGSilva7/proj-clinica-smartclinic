import { BASE_URL } from '../../../api/config';

export async function buscarMedicos() {
  const resposta = await fetch(`${BASE_URL}/medicos`);
  if (!resposta.ok) {
    throw new Error(`Erro HTTP ${resposta.status}`);
  }
  return await resposta.json();
}
