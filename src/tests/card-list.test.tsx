import { render, screen } from '@testing-library/react'
import CardList from '../components/card-list';
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

        render(<CardList data={pokemons}/>);

        expect(screen.getByText('pokemon1')).toBeInTheDocument();
        expect(screen.getByText('url/1/')).toBeInTheDocument();
        expect(screen.getByText('pokemon2')).toBeInTheDocument();
        expect(screen.getByText('url/2/')).toBeInTheDocument();
    });
})