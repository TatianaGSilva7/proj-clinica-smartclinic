import { Platform } from 'react-native';

// Notificações LOCAIS: lembretes agendados no próprio aparelho, sem servidor.
// Este arquivo só sabe "agendar/cancelar notificação"; a regra de QUANDO
// lembrar de uma consulta fica no domínio de consultas.
//
// Na web o agendamento não existe: todas as funções viram no-op e o módulo
// nativo nem é carregado (mesma ideia do require tardio do bluetooth.js).
const SUPORTADO = Platform.OS !== 'web';
const Notifications = SUPORTADO ? require('expo-notifications') : null;

export const CANAL_LEMBRETES = 'lembretes';

// Android 8+ exige um canal; no Android 13+ ele precisa existir ANTES de pedir
// a permissão, senão o sistema nem mostra o pedido.
async function criarCanal() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(CANAL_LEMBRETES, {
    name: 'Lembretes de consulta',
    importance: Notifications.AndroidImportance.HIGH,
  });
}

// Chamar uma vez na abertura do app. Sem o handler, uma notificação que
// dispara com o app aberto é descartada em silêncio.
export async function configurarNotificacoes() {
  if (!SUPORTADO) return;
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  await criarCanal();
}

// Devolve true/false e nunca lança: negar a permissão não pode quebrar o app,
// ele só deixa de lembrar das consultas.
export async function pedirPermissao() {
  if (!SUPORTADO) return false;
  try {
    await criarCanal();
    const atual = await Notifications.getPermissionsAsync();
    if (atual.granted) return true;
    if (!atual.canAskAgain) return false; // negado de vez: só pelas configurações
    const resposta = await Notifications.requestPermissionsAsync();
    return resposta.granted;
  } catch (erro) {
    console.log('Não foi possível pedir permissão de notificação:', erro.message);
    return false;
  }
}

// Agenda para uma data. O `id` é escolhido por quem chama: reagendar com o
// mesmo id substitui o anterior em vez de duplicar.
// Retorna o id agendado, ou null se a data já passou (ou se for web).
export async function agendar({ id, titulo, corpo, data, dados = {} }) {
  if (!SUPORTADO) return null;
  const quando = new Date(data);
  if (Number.isNaN(quando.getTime()) || quando <= new Date()) return null;

  return Notifications.scheduleNotificationAsync({
    identifier: id,
    content: { title: titulo, body: corpo, data: dados },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: quando,
      channelId: CANAL_LEMBRETES,
    },
  });
}

export async function cancelar(id) {
  if (!SUPORTADO) return;
  await Notifications.cancelScheduledNotificationAsync(id);
}

export async function cancelarTodas() {
  if (!SUPORTADO) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function listarAgendadas() {
  if (!SUPORTADO) return [];
  return Notifications.getAllScheduledNotificationsAsync();
}
