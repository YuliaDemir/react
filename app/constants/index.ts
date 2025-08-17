export const OFFSET_KEY = 'offset';
export const LIMIT_KEY = 'limit';
export const LIMIT_NUMBER = 10;
export const LINK = 'https://pokeapi.co/api/v2/pokemon/';
export const MAX = 1302;
export const IMG_LINK =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
export const IMG_FORMAT = '.png';
export const BASE_URL = 'https://pokeapi.co/api/v2/';

export const locales = ['en', 'ru', 'fr'] as const;
export type Locale = (typeof locales)[number];
