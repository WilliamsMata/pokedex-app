import {pokeApi} from '../../config/api/pokeApi';
import {PokeAPIPaginationResponse} from '../../infrastructure/interfaces/pokeapi.interfaces';

export const getPokemonNamesWithId = async () => {
  const url = '/pokemon?limit=1000';
  try {
    const {data} = await pokeApi.get<PokeAPIPaginationResponse>(url);

    return data.results.map(info => ({
      id: Number(info.url.split('/')[6]),
      name: info.name,
    }));
  } catch (error) {
    throw new Error('Error fetching pokemons');
  }
};
