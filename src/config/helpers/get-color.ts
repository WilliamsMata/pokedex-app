import ImageColors from 'react-native-image-colors';

// Get the dominant color from an image
export const getColorFromImage = async (image: string) => {
  const fallbackColor = 'grey';

  const colors = await ImageColors.getColors(image, {
    fallback: fallbackColor,
  });

  switch (colors.platform) {
    case 'android':
      return colors.dominant ?? fallbackColor;
    case 'ios':
      return colors.background ?? fallbackColor;
    default:
      return fallbackColor;
  }
};

export const getLuminance = (color: string) => {
  const rgb = parseInt(color.replace('#', ''), 16);
  const r = Math.floor(rgb / Math.pow(256, 2));
  const g = Math.floor((rgb - r * Math.pow(256, 2)) / 256);
  const b = rgb - r * Math.pow(256, 2) - g * 256;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// Función para determinar el color del texto basado en la luminosidad del fondo
export const getTextColor = (backgroundColor: string) => {
  const luminance = getLuminance(backgroundColor);
  return luminance > 128 ? 'black' : 'white';
};

const colorMap: {[key: string]: string} = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};
export const getTypeColor = (type: string) => {
  return colorMap[type] || '#000';
};
