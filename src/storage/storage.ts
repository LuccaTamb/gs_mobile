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
