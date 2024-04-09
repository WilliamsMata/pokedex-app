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
import {getTextColor, getTypeColor} from '../../../config/helpers/get-color';

interface PokemonScreenProps
  extends StackScreenProps<StackParamList, 'Pokemon'> {}

export default function PokemonScreen({route}: PokemonScreenProps) {
  const {id} = route.params;

  const {top} = useSafeAreaInsets();
  const {isDark} = useContext(ThemeContext);

  const pokeballImg = isDark
    ? require('../../../assets/pokeball-dark.png')
    : require('../../../assets/pokeball-light.png');

  const {isLoading, data: pokemon} = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemonById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading || !pokemon) {
    return <FullScreenLoader />;
  }

  const backgroundColor = pokemon.color;
  const textColor = getTextColor(backgroundColor);

  return (
    <ScrollView
      style={[styles.container, {backgroundColor}]}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        {/* Nombre del Pokemon */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 5,
            color: textColor,
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
            style={[
              styles.typeChip,
              {
                backgroundColor: getTypeColor(type),
              },
            ]}>
            <Text style={styles.typeChipText}>{type}</Text>
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

      {/* Abilities */}
      <Text style={[styles.subTitle, {color: textColor}]}>Abilities</Text>
      <FlatList
        data={pokemon.abilities}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Chip selectedColor={textColor}>{Formatter.capitalize(item)}</Chip>
        )}
      />

      {/* Stats */}
      <Text style={[styles.subTitle, {color: textColor}]}>Stats</Text>
      <FlatList
        data={pokemon.stats}
        horizontal
        keyExtractor={item => item.name}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.statsContainer}>
            <Text style={[styles.statName, {color: textColor}]}>
              {Formatter.capitalize(item.name)}
            </Text>
            <Text style={[styles.statValue, {color: textColor}]}>
              {item.value}
            </Text>
          </View>
        )}
      />

      {/* Moves */}
      <Text style={[styles.subTitle, {color: textColor}]}>Moves</Text>
      <FlatList
        data={pokemon.moves}
        horizontal
        keyExtractor={item => item.name}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.statsContainer}>
            <Text style={[styles.statName, {color: textColor}]}>
              {Formatter.capitalize(item.name)}
            </Text>
            <Text style={[styles.statValue, {color: textColor}]}>
              lvl {item.level}
            </Text>
          </View>
        )}
      />

      {/* Games */}
      <Text style={[styles.subTitle, {color: textColor}]}>Games</Text>
      <FlatList
        data={pokemon.games}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Chip selectedColor={textColor}>{Formatter.capitalize(item)}</Chip>
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
    marginTop: 20,
  },
  typeChip: {
    borderColor: 'white',
    marginLeft: 10,
  },
  typeChipText: {
    color: 'white',
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
  statName: {
    flex: 1,
    color: 'white',
  },
  statValue: {
    color: 'white',
  },
});
