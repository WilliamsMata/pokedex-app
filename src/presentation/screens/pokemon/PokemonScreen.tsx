import {View, Text} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParamList} from '../../navigator/StackNavigator';
import {useQuery} from '@tanstack/react-query';
import {getPokemonById} from '../../../actions/pokemons';

interface PokemonScreenProps
  extends StackScreenProps<StackParamList, 'Pokemon'> {}

export default function PokemonScreen({route}: PokemonScreenProps) {
  const {id} = route.params;

  const {isLoading, data: pokemon} = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemonById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <View>
      <Text>{pokemon?.name}</Text>
    </View>
  );
}
