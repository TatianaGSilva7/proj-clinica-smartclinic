import { AUTH_BASE_URL } from '../../../api/config';
import { salvarToken, limparToken } from '../../../api/sessao';

// =======================================================================
// LOGIN — POST /login e guarda o token no cofre
// =======================================================================
// O login não passa pelo api/http.js: ele fala com outra API (porta 3001)
// e, aqui, um 401 significa credencial inválida, e não sessão expirada.
export async function login(email, senha) {
  const resposta = await fetch(`${AUTH_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  const dados = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    // Guardamos o status no erro para o hook decidir a mensagem certa
    // (401 = credencial inválida; o resto é falha de servidor/rede).
    const erro = new Error(dados?.erro || `Erro HTTP ${resposta.status}`);
    erro.status = resposta.status;
    throw erro;
  }

  await salvarToken(dados.token);
  return dados.usuario; // { id, nome, perfil }
}

// =======================================================================
// LOGOUT — apaga o token do cofre (a navegação fica por conta da tela)
// =======================================================================
export async function logout() {
  await limparToken();
}
