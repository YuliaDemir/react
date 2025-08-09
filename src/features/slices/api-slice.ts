import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: () => '/',
    }),
    getData: builder.query({
      query: (data) => `${data}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetDataQuery } = api;
