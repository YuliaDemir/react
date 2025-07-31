import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { downloadSelectedItems } from '../helpers/download-selected-items';

import type { Pokemons } from '../types/interfaces';

const selectedSlice = createSlice({
  name: 'selectedItems',
  initialState: [] as Pokemons[],
  reducers: {
    addPokemon(state, action: PayloadAction<Pokemons>) {
      if (state.findIndex((el) => el.name === action.payload.name) < 0) {
        state.push(action.payload);
      }
    },

    deletePokemon(state, action: PayloadAction<Pokemons>) {
      const id = state.findIndex((el) => el.name === action.payload.name);
      if (id > -1) {
        state.splice(id, 1);
      }
    },

    clearSelected(state) {
      state.length = 0;
    },

    downloadSelected(state) {
      downloadSelectedItems(state);
      state.length = 0;
    },
  },
});

export const { addPokemon, deletePokemon, clearSelected, downloadSelected } =
  selectedSlice.actions;
export default selectedSlice.reducer;
