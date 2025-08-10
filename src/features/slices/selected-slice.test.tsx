import type { Pokemons } from '@/types';

import reducer, {
  addPokemon,
  deletePokemon,
  clearSelected,
} from './selected-slice';

jest.mock('@/utils/download-selected-items', () => ({
  downloadSelectedItems: jest.fn(),
}));

describe('selectedSlice reducer', () => {
  const initialState: Pokemons[] = [];

  const samplePokemon: Pokemons = { name: 'pikachu' } as unknown as Pokemons;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual([]);
  });

  test('addPokemon adds item if not exists', () => {
    const nextState = reducer(initialState, addPokemon(samplePokemon));
    expect(nextState).toHaveLength(1);
    expect(nextState[0]).toEqual(samplePokemon);
  });

  test('addPokemon does not add duplicate', () => {
    const state = [samplePokemon];
    const nextState = reducer(state, addPokemon(samplePokemon));
    expect(nextState).toHaveLength(1);
  });

  test('deletePokemon removes item if exists', () => {
    const state = [samplePokemon];
    const nextState = reducer(state, deletePokemon(samplePokemon));
    expect(nextState).toHaveLength(0);
  });

  test('clearSelected empties the array', () => {
    const state = [samplePokemon];
    const nextState = reducer(state, clearSelected());
    expect(nextState).toHaveLength(0);
  });
});
