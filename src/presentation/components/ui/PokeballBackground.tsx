import {type StyleProp, type ImageStyle, Image, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../../context/ThemeContext';

interface PokeballBackgroundProps {
  style?: StyleProp<ImageStyle>;
}

export default function PokeballBackground({style}: PokeballBackgroundProps) {
  const {isDark} = useContext(ThemeContext);

  const pokeballImg = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png');

  return <Image source={pokeballImg} style={[styles.image, style]} />;
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    opacity: 0.3,
  },
});
