import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {Pokemon} from '../../../domain/entities/pokemon';
import type {StackParamList} from '../../navigator/StackNavigator';
import FadeInImage from '../ui/FadeInImage';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({pokemon}: PokemonCardProps) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const capitalizeName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <Pressable
      style={styles.pressable}
      onPress={() => navigation.navigate('Pokemon', {id: pokemon.id})}>
      <Card style={[styles.cardContainer, {backgroundColor: pokemon.color}]}>
        <Text style={styles.name} variant="bodyLarge" lineBreakMode="middle">
          {capitalizeName}
          {'\n#' + pokemon.id}
        </Text>

        {/* Pokeball background image */}
        <View style={styles.pokeballContainer}>
          <Image
            source={require('../../../assets/pokeball-light.png')}
            style={styles.pokeball}
          />
        </View>

        {/* Pokemon image */}
        <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />

        {/* Types */}
        <Text style={[styles.name, styles.types]}>
          {pokemon.types.join(', ')}
        </Text>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    flex: 0.5,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    top: 10,
    left: 10,
    textShadowColor: 'black', // Shadow (outline) color
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
  },
  pokeball: {
    width: 100,
    height: 100,
    right: -25,
    top: -25,
    opacity: 0.4,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -15,
    top: -30,
  },

  pokeballContainer: {
    alignItems: 'flex-end',
    width: '100%',
    position: 'absolute',

    overflow: 'hidden',
    opacity: 0.5,
  },

  types: {
    marginTop: 35,
  },
});
