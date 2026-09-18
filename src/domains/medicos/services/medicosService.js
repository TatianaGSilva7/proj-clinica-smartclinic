import { get, post, put, remover } from "../../../api/config";

export async function buscarMedicos() {
  return get('/medicos');
}

export async function buscarMedicoPorId(id) {
  return get(`/medicos/${id}`);
}

export async function atualizarMedico(id, dados) {
  return put(`/medicos/${id}`, dados);
}

export async function excluirMedico(id) {
  return remover(`/medicos/${id}`);
}

export async function criarMedico(dados) {
  return post('/medicos', dados);
}