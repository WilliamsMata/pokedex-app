import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalTheme} from '../../../config/theme/global-theme';
import type {Pokemon} from '../../../domain/entities/pokemon';
import PokemonCard from '../../components/pokemons/PokemonCard';

export default function SearchScreen() {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10}]}>
      <TextInput
        placeholder="Search Pokemon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        value="Hola mundo!"
        onChangeText={value => console.log(value)}
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
