import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {useQuery} from '@tanstack/react-query';
import {getPokemons} from '../../../actions/pokemons';

export default function HomeScreen() {
  const {isLoading, data} = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <View>
      <Text variant="displaySmall">HomeScreen</Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
      )}
    </View>
  );
}
