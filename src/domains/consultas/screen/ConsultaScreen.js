import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export function ConsultaScreen({ navigation, route }) {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Consulta</Text>

            <View style={styles.card}>
                <Text style={styles.info}>Paciente: Tatiana Silva</Text>
                <Text style={styles.info}>Status: Em andamento</Text>

                <Pressable
                    style={styles.botao}
                    onPress={() => navigation.navigate('SinaisVitais', { consultaId: '123' })}
                >
                    <Text style={styles.botaoTexto}>Coletar Sinais Vitais (Bluetooth)</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#FFFFFF' },
    titulo: { fontSize: 24, fontWeight: 'bold', color: '#2B3AB0', marginBottom: 20 },
    card: { backgroundColor: '#F9FAFE', padding: 20, borderRadius: 24, elevation: 0, borderWidth: 1, borderColor: '#E5E7EB' },
    info: { fontSize: 16, marginBottom: 10, color: '#111111' },
    botao: { backgroundColor: '#2B3AB0', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
    botaoTexto: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});
