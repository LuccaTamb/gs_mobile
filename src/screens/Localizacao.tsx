import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Localizacao() {
    const [local, setLocal] = useState('');
    const navigation = useNavigation<any>();

    const irParaTempo = () => {
        if (local.trim() === '') {
            Alert.alert('Campo obrigatório', 'Por favor, informe a localização');
            return;
        }

        navigation.navigate('Tempo', { local });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Localização Atingida 📍</Text>
            <Text style={styles.label}>Bairro, cidade ou CEP:</Text>

            <TextInput
                style={styles.input}
                value={local}
                onChangeText={setLocal}
                placeholder="Ex: Vila Mariana, SP ou 04010-001"
                placeholderTextColor="#999"
            />

            <TouchableOpacity
                style={[
                    styles.botao,
                    local.trim() === '' && styles.botaoDesabilitado
                ]}
                onPress={irParaTempo}
                disabled={local.trim() === ''}
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