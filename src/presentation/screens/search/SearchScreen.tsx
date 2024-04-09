import React, {useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useQuery} from '@tanstack/react-query';
import {globalTheme} from '../../../config/theme/global-theme';
import type {Pokemon} from '../../../domain/entities/pokemon';
import PokemonCard from '../../components/pokemons/PokemonCard';
import {getPokemonNamesWithId} from '../../../actions/pokemons';

export default function SearchScreen() {
  const {top} = useSafeAreaInsets();

  const [term, setTerm] = useState<string>('');

  const {isLoading, data: pokemonNameList = []} = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: getPokemonNamesWithId,
  });

  const pokemonNameIdList = useMemo(() => {
    if (!isNaN(Number(term))) {
      return pokemonNameList.filter(pokemon => pokemon.id === Number(term));
    }

    if (term.length < 3) {
      return [];
    }

    return pokemonNameList.filter(pokemon =>
      pokemon.name.includes(term.toLowerCase()),
    );
  }, [term, pokemonNameList]);

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10}]}>
      <TextInput
        placeholder="Search Pokemon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        value={term}
        onChangeText={setTerm}
      />

      <ActivityIndicator style={styles.activityIndicator} />

      <FlatList
        data={[] as Pokemon[]}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        style={[{paddingTop: top}]}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    paddingTop: 20,
  },
});
