import { AUTH_BASE_URL } from '../../../api/config';

// =======================================================================
// LOGIN — POST /login
// =======================================================================
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

  return dados; // { token, usuario }
}
