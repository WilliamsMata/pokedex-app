import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {useQuery} from '@tanstack/react-query';
import {getPokemons} from '../../../actions/pokemons';
import PokeballBackground from '../../components/ui/PokeballBackground';

export default function HomeScreen() {
  const {isLoading, data = []} = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(0),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <View>
      <PokeballBackground style={styles.imgPosition} />
    </View>
  );
}

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
