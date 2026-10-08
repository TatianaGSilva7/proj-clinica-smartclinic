# Relatório de Falhas e Testes BLE (Modo Simulado e Real)

| Cenário | O que acontecia (Observação) | O que corrigi / Como foi tratado |
| :--- | :--- | :--- |
| **20. Escaneamento sem resultado** | Após 8 segundos de busca, a tela parava de carregar e mostrava a lista vazia sem orientação clara. | A tela agora muda para o estado `BUSCA_FINALIZADA` e exibe a mensagem instruindo o usuário a ligar o aparelho ou digitar os valores manualmente. |
| **21. Conectar lançando erro** | O app ficava travado no estado "Conectando..." infinitamente. | Envolvi a chamada `conectar(id)` num `try/catch`. Em caso de erro, exibe um `Alert` com instruções claras e volta para a tela de `BUSCA_FINALIZADA`. Nenhuma informação de saúde é logada. |
| **22. Parar de emitir leituras** | A tela continuava exibindo o último valor recebido como se estivesse atualizado e a conexão ativa. | Implementei um timeout de 5 segundos (`timeoutConexaoPerdidaRef`) reiniciado a cada leitura. Se estourar, o texto fica cinza e o aviso "Sem leituras recentes, a conexão pode ter caído" é exibido. |
| **23. Sair da tela conectado** | O serviço permanecia escaneando e emitindo eventos no fundo, causando vazamento de memória e mantendo a conexão presa. | Adicionei a função de retorno (`cleanup`) no `useEffect`, garantindo a chamada de `pararBusca()`, `desconectar()` e limpeza de timeouts. O `console.log` de desconexão é confirmado ao sair. |
| **24. Permissão negada (real)** | O app travava ou não encontrava aparelhos silenciosamente sem dar satisfação ao usuário. | Antes de procurar, o app checa `MODO_SIMULADO`. Se for false, chama `pedirPermissoes()`. Se negado, exibe a mensagem solicitando a liberação nas configurações e vai para o estado `ERRO`. |

## Observações Gerais e Testes (Modo Real)
1. **Ambiente Físico:** Testar a permissão negada mudando temporariamente `MODO_SIMULADO` para `false` ou gerando uma build nativa e revogando a permissão do aplicativo.
2. **Reconexão:** Para melhor experiência, uma extensão de reconexão automática foi idealizada (ainda não implementada, requerida como extensão futura).
3. **Limpeza de Logs:** Os `console.log` temporários no serviço (`bluetooth.js`) podem ser removidos com segurança após esta validação para evitar vazamento de dados de saúde no modo real.
