import { agendar, cancelar, listarAgendadas } from '../../../services/notificacoes';

const PREFIXO = 'consulta-';
const UMA_HORA = 60 * 60 * 1000;

const STATUS_COM_LEMBRETE = ['Confirmada'];

const ANTECEDENCIAS = [
  { sufixo: '24h', antes: 24 * UMA_HORA, corpo: (hora) => `Você tem uma consulta amanhã às ${hora}.` },
  { sufixo: '1h', antes: UMA_HORA, corpo: (hora) => `Sua consulta começa em 1 hora, às ${hora}.` },
];


function idLembrete(consultaId, sufixo) {
  return `${PREFIXO}${consultaId}-${sufixo}`;
}

function formatarHora(data) {
  const hh = String(data.getHours()).padStart(2, '0');
  const mm = String(data.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

function deveLembrar(consulta) {
  const data = new Date(consulta.dataHora);
  return (
    STATUS_COM_LEMBRETE.includes(consulta.status) &&
    !Number.isNaN(data.getTime()) &&
    data > new Date()
  );
}

export async function agendarLembretesConsulta(consulta) {
  if (!deveLembrar(consulta)) return 0;

  const dataConsulta = new Date(consulta.dataHora);
  const hora = formatarHora(dataConsulta);

  const ids = await Promise.all(
    ANTECEDENCIAS.map(({ sufixo, antes, corpo }) =>
      agendar({
        id: idLembrete(consulta.id, sufixo),
        titulo: 'Lembrete de consulta',
        corpo: corpo(hora),
        data: dataConsulta.getTime() - antes,
        dados: { consultaId: consulta.id },
      })
    )
  );
  return ids.filter(Boolean).length;
}

export async function cancelarLembretesConsulta(consultaId) {
  await Promise.all(ANTECEDENCIAS.map(({ sufixo }) => cancelar(idLembrete(consultaId, sufixo))));
}

export async function sincronizarLembretes(consultas) {
  const agendadas = await listarAgendadas();
  await Promise.all(
    agendadas
      .filter((n) => n.identifier.startsWith(PREFIXO))
      .map((n) => cancelar(n.identifier))
  );

  const totais = await Promise.all(consultas.map(agendarLembretesConsulta));
  return totais.reduce((soma, n) => soma + n, 0);
}
