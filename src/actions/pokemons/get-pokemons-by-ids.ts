import type {Pokemon} from '../../domain/entities/pokemon';
import {getPokemonById} from './get-pokemon-by-id';

export const getPokemonsByIds = async (ids: number[]): Promise<Pokemon[]> => {
  try {
    const pokemonPromises = ids.map(id => getPokemonById(id));
    const pokemons = await Promise.all(pokemonPromises);
    return pokemons;
  } catch (error) {
    throw new Error(`Error fetching pokemons by ids: ${ids}`);
  }
};
