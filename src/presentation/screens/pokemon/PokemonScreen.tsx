import {View, ScrollView, FlatList, StyleSheet, Image} from 'react-native';
import React, {useContext} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParamList} from '../../navigator/StackNavigator';
import {useQuery} from '@tanstack/react-query';
import {getPokemonById} from '../../../actions/pokemons';
import FullScreenLoader from '../../components/ui/FullScreenLoader';
import {Chip, Text} from 'react-native-paper';
import FadeInImage from '../../components/ui/FadeInImage';
import {Formatter} from '../../../config/helpers/formatter';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContext} from '../../context/ThemeContext';

interface PokemonScreenProps
  extends StackScreenProps<StackParamList, 'Pokemon'> {}

export default function PokemonScreen({route}: PokemonScreenProps) {
  const {id} = route.params;

  const {top} = useSafeAreaInsets();
  const {isDark} = useContext(ThemeContext);

  const pokeballImg = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png');

  const {isLoading, data: pokemon} = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemonById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading || !pokemon) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: pokemon.color}]}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        {/* Nombre del Pokemon */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 5,
          }}>
          {Formatter.capitalize(pokemon.name) + '\n'}#{pokemon.id}
        </Text>

        {/* Pokeball */}
        <Image source={pokeballImg} style={styles.pokeball} />

        <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
      </View>

      {/* Types */}
      <View style={styles.types}>
        {pokemon.types.map(type => (
          <Chip
            key={type}
            mode="outlined"
            selectedColor="white"
            style={styles.typeChip}>
            {type}
          </Chip>
        ))}
      </View>

      {/* Sprites */}
      <FlatList
        data={pokemon.sprites}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        style={styles.flatList}
        renderItem={({item}) => (
          <FadeInImage uri={item} style={styles.flatListImage} />
        )}
      />

      <View style={styles.lastSeparator} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  types: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  typeChip: {
    marginLeft: 10,
  },
  flatList: {
    marginTop: 20,
    height: 100,
  },
  flatListImage: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
  },
  lastSeparator: {
    height: 100,
  },
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'center',
  },
});
