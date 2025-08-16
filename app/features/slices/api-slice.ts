import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL, LIMIT_KEY, LIMIT_NUMBER, OFFSET_KEY } from '@/constants';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Pokemon', 'Ability'],
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: ({ name, page }: { name: string; page: number }) =>
        name
          ? `pokemon/${name}`
          : `pokemon?${LIMIT_KEY}=${LIMIT_NUMBER}&${OFFSET_KEY}=${page.toString()}`,
      providesTags: (result, _error, arg) =>
        result
          ? [{ type: 'Pokemon', id: arg.name || 'LIST' }]
          : [{ type: 'Pokemon', id: 'LIST' }],
    }),

    getPokemonAbility: builder.query({
      query: ({ id }: { id: number }) => `ability/${id.toString()}/`,
      providesTags: (_result, _error, arg) => [{ type: 'Ability', id: arg.id }],
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonAbilityQuery } = api;
