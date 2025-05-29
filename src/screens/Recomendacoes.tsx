import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { salvarEvento } from '../storage/storage';
import { EventoEnergia } from '../types';
import { v4 as uuidv4 } from 'uuid';

export default function Recomendacoes() {
    const [recomendacoes, setRecomendacoes] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { local, tempoInterrupcao, prejuizos } = route.params || {};

    // Verificar se os parâmetros foram recebidos
    if (!local || !tempoInterrupcao || prejuizos === undefined) {
        Alert.alert('Erro', 'Dados incompletos');
        navigation.goBack();
        return null;
    }

    const salvarEIrParaPanorama = async () => {
        if (recomendacoes.trim() === '') {
            Alert.alert('Campo obrigatório', 'Por favor, escreva suas recomendações');
            return;
        }

        setLoading(true);

        const novoEvento: EventoEnergia = {
            id: uuidv4(),
            local,
            tempoInterrupcao,
            prejuizos: prejuizos || '0',
            recomendacoes: recomendacoes.trim(),
            data: new Date().toISOString(),
        };

        try {
            console.log('Salvando evento:', novoEvento);
            await salvarEvento(novoEvento);

            // Resetar a navegação para evitar voltar para o fluxo de cadastro
            navigation.reset({
                index: 0,
                routes: [{ name: 'Panorama' }],
            });
        } catch (error) {
            console.error('Erro ao salvar:', error);
            Alert.alert('Erro', 'Não foi possível salvar o evento, tente novamente :(');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Recomendações :pencil:</Text>
            <Text style={styles.label}>O que pode ser feito para evitar ou minimizar esses problemas?</Text>

            <TextInput
                style={[styles.input, styles.textArea]}
                value={recomendacoes}
                onChangeText={setRecomendacoes}
                placeholder="Ex: Manutenção preventiva, avisos antecipados, geradores emergenciais..."
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
                autoFocus
            />

            <TouchableOpacity
                style={[
                    styles.botao,
                    (recomendacoes.trim() === '' || loading) && styles.botaoDesabilitado
                ]}
                onPress={salvarEIrParaPanorama}
                disabled={recomendacoes.trim() === '' || loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.botaoTexto}>Salvar e ver panorama ➜</Text>
                )}
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