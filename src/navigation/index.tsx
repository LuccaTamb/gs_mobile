import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Panorama from '../screens/Panorama';
import Localizacao from '../screens/Localizacao';
import Tempo from '../screens/Tempo';
import Prejuizos from '../screens/Prejuizos';
import Recomendacoes from '../screens/Recomendacoes';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Panorama">
        <Stack.Screen name="Panorama" component={Panorama} />
        <Stack.Screen name="Localizacao" component={Localizacao} />
        <Stack.Screen name="Tempo" component={Tempo} />
        <Stack.Screen name="Prejuizos" component={Prejuizos} />
        <Stack.Screen name="Recomendacoes" component={Recomendacoes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
