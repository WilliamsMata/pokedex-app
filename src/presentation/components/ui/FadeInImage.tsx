import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  type StyleProp,
  type ImageStyle,
  View,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {useAnimation} from '../../hooks/useAnimation';

interface FadeInImageProps {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export default function FadeInImage({uri, style}: FadeInImageProps) {
  const {animatedOpacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const isDisposed = useRef(false);

  useEffect(() => {
    return () => {
      isDisposed.current = true;
    };
  }, []);

  const onLoadEnd = () => {
    if (!isDisposed.current) {
      fadeIn({});
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator style={styles.indicator} color="grey" size={30} />
      )}

      <Animated.Image
        source={{uri}}
        style={[
          {
            opacity: animatedOpacity,
          },
          style,
        ]}
        onLoadEnd={onLoadEnd}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
  },
});
