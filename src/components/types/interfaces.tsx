export  interface CardProps {
    name: string;
    description: string;
};

export interface PropsData {
    data: CardProps[];
}

export  interface ListProps {
    data: Pokemons[];
};

export interface Pokemons {
    name: string;
    url: string;
}