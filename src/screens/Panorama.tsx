import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { buscarEventos, excluirEventoPorId } from '../storage/storage';
import { EventoEnergia } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@eventos_energia';

export default function PanoramaGeral() {
  const [eventos, setEventos] = useState<EventoEnergia[]>([]);
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  useEffect(() => {
    carregarEventos();
  }, [isFocused]);

  const carregarEventos = async () => {
    const dados = await buscarEventos();
    setEventos(dados);
  };

  const excluirEvento = (id: string) => {
    Alert.alert(
      'Excluir evento',
      'Tem certeza que deseja apagar este evento? 😢',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: () => handleExclusaoConfirmada(id),
        },
      ]
    );
  };

  const handleExclusaoConfirmada = async (id: string) => {
    console.log('[PANORAMA] Exclusão iniciada para ID:', id);
    try {
      // Log antes da exclusão
      const antes = await buscarEventos();
      console.log('[PANORAMA] IDs antes:', antes.map(e => e.id));

      await excluirEventoPorId(id);

      // Log depois da exclusão
      const depois = await buscarEventos();
      console.log('[PANORAMA] IDs depois:', depois.map(e => e.id));

      setEventos(depois);
      console.log('[PANORAMA] Estado atualizado com sucesso!');
    } catch (error) {
      console.error('[PANORAMA] ERRO na exclusão:', error);
      Alert.alert('Erro', 'Não foi possível excluir o evento');
    }
  };

  const renderItem = ({ item }: { item: EventoEnergia }) => (
    <View style={styles.card}>
      <View style={styles.cardTopo}>
        <Text style={styles.titulo}>{item.local}</Text>
        <TouchableOpacity onPress={() => excluirEvento(item.id)}>
          <Text style={styles.excluir}>🗑️</Text>
        </TouchableOpacity>
      </View>
      <Text>⏱️ Tempo sem energia: {item.tempoInterrupcao}</Text>
      <Text>💸 Prejuízos: {item.prejuizos}</Text>
      <Text>💬 Recomendações: {item.recomendacoes}</Text>
      <Text style={styles.data}>🗓️ {formatarData(item.data)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Panorama Geral ⚡</Text>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum evento registrado ainda :3</Text>}
      />
      
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Localizacao')}
      >
        <Text style={styles.botaoTexto}>+ Novo Evento</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: 'red' }]}
        onPress={async () => {
          await AsyncStorage.removeItem(STORAGE_KEY);
          carregarEventos();
          Alert.alert('Storage RESETADO', 'Todos os eventos foram apagados!');
          console.log('[PANORAMA] STORAGE COMPLETAMENTE LIMPO!');
        }}
      >
        <Text style={styles.botaoTexto}>RESETAR TUDO</Text>
      </TouchableOpacity>
    </View>
  );
}

function formatarData(dataISO: string) {
  const data = new Date(dataISO);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}-${mes}-${ano}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fefefe',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ececec',
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
  },
  cardTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
  },
  excluir: {
    fontSize: 20,
    color: '#cc0000',
  },
  data: {
    fontSize: 13,
    color: '#555',
    marginTop: 6,
  },
  vazio: {
    textAlign: 'center',
    color: '#999',
    marginTop: 30,
    fontStyle: 'italic',
  },
  botao: {
    backgroundColor: '#0077cc',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
