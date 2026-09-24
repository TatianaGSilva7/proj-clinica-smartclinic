<!--
TEMPLATE — cada squad deve copiar este arquivo para a RAIZ do próprio
repositório do projeto (o app da clínica) e ir preenchendo os campos entre
colchetes [ ] ao longo do semestre, conforme cada funcionalidade é
implementada. Não deixe nenhum "[a preencher]" na versão final (Aula 16).

-->

# Smart Clinic— Sistema de Agendamento para Clínica Médica

> Projeto integrador da Unidade Curricular **Aplicações Mobile**, construído ao longo de 16 aulas.

**Squad:** Henrique Linhares Pinheiro Loiola / Kaique dos Santos Silva / Tatiana das Graças Silva / Victor Lemos Barbosa
          
**Curso:** Superior de Tecnologia em Análise e Desenvolvimento de Sistemas — Turma STADS
**Professor:** Prof. Dr. Maurício Falvo

---

## Sobre o desafio

Este projeto é a resposta à Situação de Aprendizagem Desafiadora da unidade curricular:
criar a aplicação mobile de um sistema de agendamento de consultas para uma clínica
médica, atendendo pacientes e médicos com um aplicativo que vai além do CRUD básico.

O aplicativo consome a API RESTful da clínica (cadastro de pacientes, médicos,
especialidades, horários, agendamento e cancelamento de consultas — toda a comunicação
ocorre via HTTPS por lidar com dados sensíveis de pacientes) e integra:

- **Recursos nativos do dispositivo:** câmera, Bluetooth, GPS e biometria.
- **Recursos de plataforma:** notificações locais/push, mapas, SMS e processamento em
  segundo plano (background), com uso de multithread para não travar a interface.
- **Web Services de terceiros:** notificação push, gateway de SMS e provedor de mapas.

## Funcionalidades

Checklist dos entregáveis previstos na Situação de Aprendizagem Desafiadora do Plano de
Ensino. Marque conforme cada item for implementado pela squad — cada aula do curso avança
alguns destes itens.

- [x] Protótipo wireframe das interfaces da aplicação (Figma) 
- [x] Projeto do aplicativo configurado e versionado no Git 
- [ ] Cadastro de foto de perfil (paciente e médico) via câmera do dispositivo 
- [ ] Login com biometria implementado para médico/recepção 
- [ ] Geolocalização (GPS) com cálculo de distância/tempo até a clínica 
- [ ] Importação de sinais vitais de um periférico via Bluetooth antes da consulta
- [ ] Implementação das interfaces de listagem (leitura) para pacientes, médicos,
      especialidades e horários, consumindo a API RESTful
- [ ] Operações de escrita (cadastro/edição/exclusão) para pacientes, médicos,
      especialidades e horários 
- [x] Integração inicial com os endpoints de usuários e login, via HTTPS
      (mock local em HTTP — ver [Segurança da comunicação](#segurança-da-comunicação-http--https))
- [ ] Identificação dos recursos que dependem de Web Services de terceiros
- [ ] Notificação local/push como lembrete de consulta agendada
- [ ] Processamento multithread para tarefas pesadas não travarem a interface
- [ ] Sincronização da agenda em segundo plano (tarefa/serviço background)
- [ ] Mapa exibindo a localização da clínica dentro do aplicativo
- [ ] Confirmação/cancelamento de consulta enviado por SMS
- [ ] Funcionalidade de agendamento de consultas (paciente)
- [ ] Funcionalidade de listagem das consultas agendadas
- [ ] Funcionalidade de cancelamento de consulta
- [ ] Funcionalidade de visualização de agenda para o médico
- [ ] Aplicação com testes end-to-end rodando com sucesso 
- [ ] Documentação do sistema — guia do usuário e técnica 
- [ ] Build de produção gerado e documentação dos passos de publicação nas lojas (App
      Store/Google Play)
- [ ] Versão final do aplicativo pronta para apresentação 

## Telas principais

<!-- Documentem cada tela conforme forem construindo, descrevendo função e navegação. -->

| Tela | Funcionalidade | Navega para |
|---|---|---|
| Login | E-mail e senha; envia `POST /login` e guarda o token no armazenamento seguro. Tela inicial quando não há sessão. | Médicos |
| Médicos | Listagem de médicos e formulário de cadastro/edição/exclusão (CRUD). Botão **Sair** no cabeçalho. Tela inicial quando já há sessão. | Login (ao sair ou quando a sessão expira) |
| Splash *(planejada)* | [a preencher] | Menu |
| Menu *(planejada)* | [a preencher] | Médicos, Pacientes, Consultas |
| [adicionar novas telas conforme implementadas] | | |

## Tecnologias

- [React Native](https://reactnative.dev/) com [Expo](https://expo.dev/)
- React Navigation (`@react-navigation/native`, `@react-navigation/stack`), com
  `react-native-screens`, `react-native-safe-area-context` e `react-native-gesture-handler`
- `expo-secure-store` — armazenamento seguro do token de sessão (Keychain no iOS,
  Keystore no Android)
- [a preencher: bibliotecas adicionadas a cada aula — expo-camera/expo-image-picker,
  expo-local-authentication, expo-location, expo-notifications, expo-task-manager,
  react-native-maps, etc.]
- API RESTful da clínica (mock local via `json-server` durante o desenvolvimento) e API
  de autenticação mock (`servidor/auth-api.js`, Node puro, sem dependências)

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- npm
- [Expo Go](https://expo.dev/go) instalado no celular físico, **ou** um emulador
  Android/iOS configurado
- Conta Expo (gratuita, em [expo.dev/signup](https://expo.dev/signup)) — o Expo Go exige
  login no computador e no celular com a mesma conta
- Celular e computador na **mesma rede**. Redes que isolam os aparelhos (comum em
  faculdades e empresas) impedem a conexão; nesse caso, use o roteamento de internet do
  celular
- Git

## Instalação e configuração

```bash
git clone [url-do-repositorio-da-squad]
cd [nome-da-pasta-do-projeto]
npm install
```

### Variáveis de configuração

Os endereços das APIs são definidos em `src/api/config.js`:

```js
export const BASE_URL = 'http://SEU_IP_AQUI:3000';      // json-server (CRUD)
export const AUTH_BASE_URL = 'http://SEU_IP_AQUI:3001'; // auth-api (login)
```

Foi decidido pela squad que o json-server roda na porta **3000** e a API de autenticação
na porta **3001**, para os dois poderem ficar no ar ao mesmo tempo. O login usa o
`AUTH_BASE_URL`; as demais requisições (via `src/api/http.js`) usam o `BASE_URL`.

> Em dispositivo físico (Expo Go), `localhost` não funciona — use o IP da máquina que
> está rodando a API/mock, na mesma rede Wi-Fi (`ipconfig` no Windows). Cada integrante
> deve ajustar o IP para a própria máquina.

### Subindo as APIs (durante o desenvolvimento)

Cada comando em um terminal separado, mantidos abertos enquanto o app estiver em uso:

```bash
npm run mock-api   # json-server com mockup/db.json, porta 3000
npm run auth-api   # API de autenticação (servidor/auth-api.js), porta 3001
```

Usuários de teste da API de autenticação: `recepcao@clinica.com` / `clinica123` e
`joao@clinica.com` / `medico123`. Os tokens ficam em memória: reiniciar o `auth-api`
encerra todas as sessões.

## Como executar

Com as duas APIs no ar, em um terceiro terminal:

```bash
npx expo start
```

Escaneie o QR Code com o app Expo Go, ou pressione `a`/`i` no terminal para abrir em um
emulador Android/iOS.

> O Expo Go exige login: rode `npx expo login` no computador e entre com a **mesma conta**
> no app Expo Go do celular.
>
> Não use o navegador (`w`): o `expo-secure-store`, que guarda o token, não funciona na web.

## Autenticação e sessão

O app só mostra dados para quem fez login. A senha é enviada **uma única vez**; em troca,
a API devolve um **token**, e é ele que acompanha as requisições seguintes.

### Onde fica cada peça

```
src/api/                          ← infraestrutura compartilhada (não conhece nenhum domínio)
├── config.js    → BASE_URL (3000) e AUTH_BASE_URL (3001)
├── sessao.js    → único acesso ao cofre: salvarToken, obterToken, limparToken, estaLogado
└── http.js      → único ponto que fala com a rede: requisicao(), get/post/put/remover,
                   SessaoExpirada

src/domains/login/                ← regra de negócio da autenticação
├── services/authService.js       → login() (POST /login + salva o token) e logout()
├── hooks/useLogin.js             → estado da tela de login
├── hooks/useEncerrarSessao.js    → apaga o token e volta ao Login (com aviso opcional)
├── components/BotaoSair.js       → botão Sair do cabeçalho
└── screens/LoginScreen.js
```

Os domínios dependem de `src/api/`, nunca o contrário.

### Fluxo

1. **Abertura do app:** `App.js` consulta `estaLogado()`. Enquanto verifica, mostra um
   carregando; depois abre em **Médicos** (há token) ou em **Login** (não há).
2. **Login:** `login()` envia e-mail e senha, recebe o token e o grava no cofre
   (`expo-secure-store`). A senha é apagada do estado. Credencial errada (401) mostra
   "E-mail ou senha inválidos", sem dizer qual campo errou.
3. **Requisições:** `http.js` lê o token e envia `Authorization: Bearer <token>` em todas
   as chamadas.
4. **Sessão expirada:** se a API responder 401, `http.js` apaga o token e lança
   `SessaoExpirada`; a tela chama `useEncerrarSessao` e o usuário volta ao Login com o
   aviso "Sessão expirada".
5. **Sair:** apaga o token do cofre **e** volta ao Login. Só navegar deixaria a sessão
   viva no aparelho.

A navegação para o Login usa `navigation.reset`, para o gesto de voltar não retornar à
tela anterior.

### Ao criar um novo domínio (pacientes, consultas...)

- Faça as chamadas com `get`/`post`/`put`/`remover` de `src/api/http.js` — nada de
  `fetch` direto nem `BASE_URL` nas telas.
- Nos `catch`, trate `SessaoExpirada` com `useEncerrarSessao('Sessão expirada')` antes
  de tratar como erro genérico (veja `src/domains/medicos/hooks/useMedicos.js`).
- Nunca use `console.log` com token, senha ou dados de paciente.

## Segurança da comunicação (HTTP × HTTPS)

Durante o desenvolvimento, o json-server e o auth-api rodam em **HTTP** porque o tráfego
não sai da rede local — é uma decisão consciente de laboratório, não descuido. Em HTTP,
tudo o que o app envia (e-mail, senha, token) trafega em texto puro e pode ser lido por
qualquer um no caminho da rede.

A API real da clínica **exigirá HTTPS**, por lidar com credenciais e dados de pacientes.
No app, basta trocar `http://` por `https://` em `src/api/config.js`; o restante é
responsabilidade do servidor (certificado válido, domínio e renovação). iOS e Android já
bloqueiam HTTP puro em apps de produção, e essa liberação não deve ir para as lojas.

## Permissões necessárias

O aplicativo solicita acesso aos seguintes recursos do dispositivo. Documentem, para cada
um, quando a permissão é pedida e o que acontece se o usuário negar:

| Recurso | Quando é solicitado | Comportamento se negado |
|---|---|---|
| Câmera | [a preencher — Aula 1] | [a preencher] |
| Biometria | [a preencher — Aula 6] | [a preencher] |
| Localização (GPS) | [a preencher — Aula 6] | [a preencher] |
| Bluetooth | [a preencher — Aula 7] | [a preencher] |
| Notificações | [a preencher — Aulas 8-9] | [a preencher] |

## Testes

<!-- Preencher na Aula 14 -->

```bash
[comando para rodar os testes end-to-end]
```

## Build de produção e publicação

<!-- Preencher na Aula 16 -->

[a preencher: passos de geração do build com EAS Build e submissão às lojas]

## Equipe e colaboração

Consulte o combinado de colaboração da squad definido na Aula 1 (branches, padrão de
commit, revisão em pares) para saber como contribuir com este repositório.

## Licença

[a definir pela squad, se aplicável]
