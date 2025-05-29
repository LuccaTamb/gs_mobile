# Aplicativo Mobile

Este é um aplicativo mobile desenvolvido com React Native, Expo e TypeScript, projetado para registrar e consultar acidentes e desastres. As informações são armazenadas localmente no dispositivo utilizando `AsyncStorage`.


## Funcionalidades

O aplicativo é composto por cinco telas principais:

- **Panorama Geral**: Exibe um resumo dos episódios registrados.
- **Localização Atingida**: Permite registrar o local onde ocorreu.
- **Tempo de Interrupção**: Armazena o tempo total do episódio.
- **Prejuízos Causados**: Registra os prejuízos decorrentes.
- **Recomendações**: Lista orientações e boas práticas para situações similares futuras.

Todos os dados são persistidos localmente com `AsyncStorage`.


## Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)


## Passo-a-passo para Utilização do Projeto
```bash
git clone https://github.com/LuccaTamb/gs_mobile.git
```
```bash
cd gs_mobile/
```
```bash
npm install
```
```bash
npx expo start
```
| aperte W