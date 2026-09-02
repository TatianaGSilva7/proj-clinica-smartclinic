import { BASE_URL } from "../../../api/config";

export async function buscarMedicos() {
  const resposta = await fetch(`${BASE_URL}/medicos`);
  if (!resposta.ok) {
    throw new Error(`Erro HTTP ${resposta.status}`);
  }
  return await resposta.json();
}

export async function atualizarMedico(id, dados) {
  const resposta = await fetch(`${BASE_URL}/medicos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    throw new Error(`Erro HTTP ${resposta.status} ao atualizar`);
  }

  return await resposta.json();
}
