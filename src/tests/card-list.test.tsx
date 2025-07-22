import { render, screen } from '@testing-library/react'
import { CardList } from '../components/card-list';
import type { Pokemons } from '../components/types/interfaces';

describe('Card Component', () => {

    test ('Renders item name and description', () => {
        const pokemons: Pokemons[] = [
            {
                name: "pokemon1",
                url:"url/1/",
            },
            {
                name: "pokemon2",
                url:"url/2/",
            },
        ];

        render(<CardList pokemons={pokemons}/>);

        pokemons.forEach(pokemon => {
            expect(screen.getByText(pokemon.name)).toBeInTheDocument();
            expect(screen.getByText(pokemon.url)).toBeInTheDocument();
        });
    });
})