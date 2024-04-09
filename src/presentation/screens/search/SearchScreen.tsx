import React, {useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useQuery} from '@tanstack/react-query';
import {globalTheme} from '../../../config/theme/global-theme';
import PokemonCard from '../../components/pokemons/PokemonCard';
import {
  getPokemonNamesWithId,
  getPokemonsByIds,
} from '../../../actions/pokemons';
import FullScreenLoader from '../../components/ui/FullScreenLoader';

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

  const pokemonIds = pokemonNameIdList.map(pokemon => pokemon.id);

  const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemons', 'by', pokemonIds],
    queryFn: () => getPokemonsByIds(pokemonIds),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

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

      {isLoadingPokemons && (
        <ActivityIndicator style={styles.activityIndicator} />
      )}

      <FlatList
        data={pokemons}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        style={[{paddingTop: top}]}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
}

const ListFooterComponent = () => {
  return <View style={styles.listFooterComponent} />;
};

const styles = StyleSheet.create({
  activityIndicator: {
    paddingTop: 20,
  },
  listFooterComponent: {
    height: 120,
  },
});
