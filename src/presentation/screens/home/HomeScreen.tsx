import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getPokemons} from '../../../actions/pokemons';
import PokeballBackground from '../../components/ui/PokeballBackground';
import {globalTheme} from '../../../config/theme/global-theme';
import PokemonCard from '../../components/pokemons/PokemonCard';

export default function HomeScreen() {
  const {top} = useSafeAreaInsets();

  // this is the traditional way to fetch data
  // const {isLoading, data: pokemons = []} = useQuery({
  //   queryKey: ['pokemons'],
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 5, // 5 minutes
  // });

  const queryClient = useQueryClient();

  const {data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    queryFn: async ({pageParam}) => {
      const pokemons = await getPokemons(pageParam);
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });

      return pokemons;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => allPages.length,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const pokemons = data?.pages.flat() ?? [];

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
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
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
