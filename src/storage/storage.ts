import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventoEnergia } from '../types';

const STORAGE_KEY = '@eventos_energia';

export async function salvarEvento(evento: EventoEnergia) {
    try {
        console.log('[STORAGE] Salvando evento ID:', evento.id);
        const eventos = await buscarEventos();
        eventos.push(evento);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(eventos));
        console.log(`[STORAGE] Evento salvo com sucesso! ID: ${evento.id}`);
        return true;
    } catch (error) {
        console.error('[STORAGE] ERRO ao salvar evento:', error);
        throw error;
    }
}

export async function buscarEventos(): Promise<EventoEnergia[]> {
    try {
        const eventosJSON = await AsyncStorage.getItem(STORAGE_KEY);
        const eventos = eventosJSON ? JSON.parse(eventosJSON) : [];
        console.log(`[STORAGE] Buscando eventos. Encontrados: ${eventos.length}`);
        return eventos;
    } catch (error) {
        console.error('[STORAGE] ERRO ao buscar eventos:', error);
        return [];
    }
}

export async function excluirEventoPorId(id: string): Promise<void> {
  try {
    console.log(`[STORAGE] Iniciando exclusão do ID: ${id}`);
    const eventos = await buscarEventos();
    
    console.log(`[STORAGE] IDs antes da exclusão: ${eventos.map(e => e.id).join(', ')}`);
    
    const novosEventos = eventos.filter(evento => String(evento.id) !== String(id));
    
    console.log(`[STORAGE] IDs após filtro: ${novosEventos.map(e => e.id).join(', ')}`);
    console.log(`[STORAGE] Total antes: ${eventos.length}, depois: ${novosEventos.length}`);

    if (eventos.length === novosEventos.length) {
        console.warn(`[STORAGE] AVISO: ID ${id} não foi encontrado!`);
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novosEventos));
    console.log(`[STORAGE] Evento ${id} excluído com sucesso!`);
  } catch (error) {
    console.error('[STORAGE] ERRO na exclusão:', error);
    throw error;
  }
}

