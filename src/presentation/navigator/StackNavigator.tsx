import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import PokemonScreen from '../screens/pokemon/PokemonScreen';
import SearchScreen from '../screens/search/SearchScreen';

export type StackParamList = {
  Home: undefined;
  Pokemon: {id: number};
  Search: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Pokemon" component={PokemonScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
