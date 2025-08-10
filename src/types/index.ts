export interface Pokemons {
  name: string;
  url: string;
}

export interface PokemonsExtended extends Pokemons {
  abilityIds: number[];
}

export interface CardType {
  name: string;
  url: string;
  mainCard: boolean;
}

export interface EffectDescription {
  effect: string;
  language: { name: string };
}

export interface AbilityItemType {
  ability: {
    url: string;
  };
}

export interface AbilityDescription {
  name: string;
  description: string;
}
