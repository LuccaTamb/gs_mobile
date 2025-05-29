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

export default function Prejuizos() {
    const [descricao, setDescricao] = useState('');
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { local, tempoInterrupcao } = route.params || {};

    // Verificar se recebemos os parâmetros necessários
    if (!local || !tempoInterrupcao) {
        Alert.alert('Erro', 'Dados incompletos');
        navigation.goBack();
        return null;
    }

    const irParaRecomendacoes = () => {
        if (descricao.trim() === '') {
            Alert.alert('Campo obrigatório', 'Por favor, descreva os prejuízos');
            return;
        }

        navigation.navigate('Recomendacoes', {
            local,
            tempoInterrupcao,
            prejuizos: descricao,
            titulo: route.params.titulo
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Prejuízos Causados 💸</Text>
            <Text style={styles.label}>Descreva os impactos observados:</Text>

            <TextInput
                style={[styles.input, styles.textArea]}
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Ex: 3 casas sem luz, supermercado perdeu alimentos, moradores sem internet..."
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
                autoFocus={true}
            />

            <TouchableOpacity
                style={[
                    styles.botao,
                    descricao.trim() === '' && styles.botaoDesabilitado
                ]}
                onPress={irParaRecomendacoes}
                disabled={descricao.trim() === ''}
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
    textArea: {
        minHeight: 150,
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