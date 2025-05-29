import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Tempo() {
    const [tempo, setTempo] = useState('');
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { local } = route.params || {};

    // Verificar se recebemos a localização
    if (!local) {
        Alert.alert('Erro', 'Localização não encontrada');
        navigation.goBack();
        return null;
    }

    const irParaPrejuizos = () => {
        if (tempo.trim() === '') {
            Alert.alert('Campo obrigatório', 'Por favor, informe o tempo de interrupção');
            return;
        }

        navigation.navigate('Prejuizos', {
            local,
            tempoInterrupcao: tempo,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Tempo de Interrupção ⏱️</Text>
            <Text style={styles.label}>Quanto tempo a região ficou sem energia?</Text>

            <TextInput
                style={styles.input}
                value={tempo}
                onChangeText={setTempo}
                placeholder="Ex: 2 horas, 1 dia, 45 minutos..."
                placeholderTextColor="#999"
                keyboardType="numbers-and-punctuation" // Permite números e símbolos
            />

            <TouchableOpacity
                style={[
                    styles.botao,
                    tempo.trim() === '' && styles.botaoDesabilitado
                ]}
                onPress={irParaPrejuizos}
                disabled={tempo.trim() === ''}
            >
                <Text style={styles.botaoTexto}>Avançar ➜</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    label: {
        fontSize: 16,
        marginBottom: 6,
        color: '#444',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        fontSize: 16,
        color: '#333',
    },
    botao: {
        backgroundColor: '#0077cc',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    botaoDesabilitado: {
        backgroundColor: '#aaccff',
        opacity: 0.7,
    },
    botaoTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});