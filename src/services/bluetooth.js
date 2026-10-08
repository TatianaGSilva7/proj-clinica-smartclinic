import { Platform } from 'react-native';
import { Buffer } from 'buffer';

export const MODO_SIMULADO = true;

const SERVICO_FREQ_CARDIACA = '0000180d-0000-1000-8000-00805f9b34fb';
const CARACTERISTICA_MEDICAO = '00002a37-0000-1000-8000-00805f9b34fb';

export async function pedirPermissoes() {
  if (Platform.OS !== 'android') return true;

  const { PermissionsAndroid } = require('react-native');

  if (Platform.Version >= 31) {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]);
    return (
      granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED
    );
  } else {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
}

export function decodificarFrequencia(valorBase64) {
  if (!valorBase64) return null;
  
  const bytes = Buffer.from(valorBase64, 'base64');
  if (bytes.length < 2) return null;

  const eh16Bits = (bytes[0] & 1) !== 0;
  
  if (eh16Bits) {
    if (bytes.length < 3) return null;
    return bytes.readUInt16LE(1);
  } else {
    return bytes[1];
  }
}

function criarServicoBleSimulado() {
  let timeouts = [];
  let intervaloMonitoramento = null;

  return {
    procurar: (aoEncontrar) => {
      const t1 = setTimeout(() => {
        aoEncontrar(null, { id: 'SIM-01', name: 'Monitor Cardíaco (simulado)' });
      }, 700);
      
      const t2 = setTimeout(() => {
        aoEncontrar(null, { id: 'SIM-02', name: 'Oxímetro (simulado)' });
      }, 1600);
      
      timeouts.push(t1, t2);
    },
    
    pararBusca: () => {
      timeouts.forEach(clearTimeout);
      timeouts = [];
    },
    
    conectar: async (id) => {
      return new Promise((resolve) => setTimeout(resolve, 1200));
    },
    
    monitorarFrequencia: (aoReceber) => {
      intervaloMonitoramento = setInterval(() => {
        const bpm = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
        aoReceber(bpm);
      }, 1500);
    },
    
    desconectar: () => {
      if (intervaloMonitoramento) {
        clearInterval(intervaloMonitoramento);
        intervaloMonitoramento = null;
      }
      console.log('[BLE simulado] desconectado'); // TODO remover
    }
  };
}

function criarServicoBleReal() {
  const { BleManager } = require('react-native-ble-plx');
  const manager = new BleManager();
  let subscricaoMonitoramento = null;
  let dispositivoConectadoId = null;

  return {
    procurar: (aoEncontrar) => {
      manager.startDeviceScan([SERVICO_FREQ_CARDIACA], null, (erro, dispositivo) => {
        if (erro) {
          aoEncontrar(erro, null);
          return;
        }
        aoEncontrar(null, {
          id: dispositivo.id,
          name: dispositivo.name || 'Sem nome'
        });
      });
    },
    
    pararBusca: () => {
      manager.stopDeviceScan();
    },
    
    conectar: async (id) => {
      const dispositivo = await manager.connectToDevice(id);
      dispositivoConectadoId = id;
      await dispositivo.discoverAllServicesAndCharacteristics();
    },
    
    monitorarFrequencia: (aoReceber) => {
      if (!dispositivoConectadoId) return;
      
      subscricaoMonitoramento = manager.monitorCharacteristicForDevice(
        dispositivoConectadoId,
        SERVICO_FREQ_CARDIACA,
        CARACTERISTICA_MEDICAO,
        (erro, caracteristica) => {
          if (erro) return;
          if (!caracteristica || !caracteristica.value) return;
          
          const bpm = decodificarFrequencia(caracteristica.value);
          if (bpm !== null) {
            aoReceber(bpm);
          }
        }
      );
    },
    
    desconectar: async () => {
      if (subscricaoMonitoramento) {
        subscricaoMonitoramento.remove();
        subscricaoMonitoramento = null;
      }
      if (dispositivoConectadoId) {
        await manager.cancelDeviceConnection(dispositivoConectadoId).catch(() => {});
        dispositivoConectadoId = null;
      }
    }
  };
}

export function criarServicoBle() {
  if (MODO_SIMULADO) {
    return criarServicoBleSimulado();
  } else {
    return criarServicoBleReal();
  }
}


