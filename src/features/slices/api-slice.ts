import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL, LIMIT_KEY, LIMIT_NUMBER, OFFSET_KEY } from '@/constants';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: ({ name, page }: { name: string; page: number }) =>
        name
          ? `pokemon/${name}`
          : `pokemon?${LIMIT_KEY}=${LIMIT_NUMBER}&${OFFSET_KEY}=${page.toString()}`,
    }),

    getPokemonAbility: builder.query({
      query: ({ id }: { id: number }) => `ability/${id.toString()}/`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonAbilityQuery } = api;
