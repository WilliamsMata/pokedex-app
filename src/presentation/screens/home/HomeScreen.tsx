import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useQuery} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getPokemons} from '../../../actions/pokemons';
import PokeballBackground from '../../components/ui/PokeballBackground';
import {globalTheme} from '../../../config/theme/global-theme';
import PokemonCard from '../../components/pokemons/PokemonCard';

export default function HomeScreen() {
  const {top} = useSafeAreaInsets();

  const {isLoading, data: pokemons = []} = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(0),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBackground style={styles.imgPosition} />

      <FlatList
        data={pokemons}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        style={[{paddingTop: top}]}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
}

function ListHeaderComponent() {
  return <Text variant="displayMedium">Pokédex</Text>;
}

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
  flatList: {
    paddingHorizontal: 20,
  },
});
