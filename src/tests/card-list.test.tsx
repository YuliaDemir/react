import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { CardList } from '../components/card-list';

import type { Pokemons } from '../components/types/interfaces';

jest.mock('../components', () => ({
  ...jest.requireActual('../components'),
  Card: ({ name }: { name: string }) => <div>{name}</div>,
}));

describe('CardList Component', () => {
  test('Renders items', () => {
    const pokemons: Pokemons[] = [
      {
        name: 'pokemon1',
        url: 'url/1/',
      },
      {
        name: 'pokemon2',
        url: 'url/2/',
      },
    ];

    render(
      <MemoryRouter>
        <CardList pokemons={pokemons} />
      </MemoryRouter>
    );

    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });
  });
});
