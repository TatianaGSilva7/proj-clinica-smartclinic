import { get, post, put, remover } from "../../../api/http";

export async function buscarConsultas() {
  return get('/consultas');
}

export async function buscarConsultaPorId(id) {
  return get(`/consultas/${id}`);
}

export async function atualizarConsulta(id, dados) {
  return put(`/consultas/${id}`, dados);
}

export async function excluirConsulta(id) {
  return remover(`/consultas/${id}`);
}

export async function criarConsulta(dados) {
  return post('/consultas', dados);
}

