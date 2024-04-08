import {pokeApi} from '../../config/api/pokeApi';
import type {Pokemon} from '../../domain/entities/pokemon';
import type {
  PokeAPIPaginationResponse,
  PokeAPIPokemon,
} from '../../infrastructure/interfaces/pokeapi.interfaces';
import {PokemonMapper} from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemons = async (
  page: number,
  limit: number = 20,
): Promise<Pokemon[]> => {
  try {
    const url = '/pokemon';

    const {data} = await pokeApi.get<PokeAPIPaginationResponse>(url, {
      params: {
        offset: page * limit,
        limit,
      },
    });

    const pokemonPromises = data.results.map(result => {
      return pokeApi.get<PokeAPIPokemon>(result.url);
    });

    const pokeApiPokemons = await Promise.all(pokemonPromises);

    const pokemonsPromises = pokeApiPokemons.map(item =>
      PokemonMapper.pokeApiPokemonToEntity(item.data),
    );

    const pokemons = await Promise.all(pokemonsPromises);

    return pokemons;
  } catch (error) {
    throw new Error('Error fetching pokemons');
  }
};
