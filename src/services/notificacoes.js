import { Platform } from 'react-native';


const SUPORTADO = Platform.OS !== 'web';
const Notifications = SUPORTADO ? require('expo-notifications') : null;

export const CANAL_LEMBRETES = 'lembretes';

async function criarCanal() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(CANAL_LEMBRETES, {
    name: 'Lembretes de consulta',
    importance: Notifications.AndroidImportance.HIGH,
  });
}

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
