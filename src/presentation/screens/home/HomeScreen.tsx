import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {FAB, Text, useTheme} from 'react-native-paper';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getPokemons} from '../../../actions/pokemons';
import PokeballBackground from '../../components/ui/PokeballBackground';
import {globalTheme} from '../../../config/theme/global-theme';
import PokemonCard from '../../components/pokemons/PokemonCard';
import type {StackScreenProps} from '@react-navigation/stack';
import type {StackParamList} from '../../navigator/StackNavigator';

interface HomeScreenProps extends StackScreenProps<StackParamList, 'Home'> {}

export default function HomeScreen({navigation}: HomeScreenProps) {
  const {top} = useSafeAreaInsets();

  const theme = useTheme();

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

      <FAB
        label="Search"
        style={[globalTheme.fab, {backgroundColor: theme.colors.primary}]}
        mode="elevated"
        color={theme.dark ? 'black' : 'white'}
        onPress={() => navigation.push('Search')}
      />
    </View>
  );
}

function ListHeaderComponent() {
  const theme = useTheme();

  const getHeaderColor = () => ({
    color: theme.dark ? 'white' : 'black',
  });

  return (
    <Text
      variant="displayMedium"
      style={[getHeaderColor(), styles.listHeaderText]}>
      Pokédex
    </Text>
  );
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
  listHeaderText: {
    marginVertical: 10,
  },
});
