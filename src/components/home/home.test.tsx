import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { Home } from './home';

import type { Pokemons } from '../../types';

global.fetch = jest.fn();

jest.mock('../components/helpers', () => ({
  useLocalStorage: () => ['', jest.fn()],
  usePagination: () => [0, '', jest.fn()],
}));

jest.mock('../components', () => ({
  Header: ({ handleSearch }: { handleSearch: (query: string) => void }) => (
    <button onClick={() => handleSearch('pikachu')}>Search Button</button>
  ),
  CardList: ({ pokemons }: { pokemons: Pokemons[] }) => (
    <div>
      {pokemons.map((p) => (
        <div key={p.name}>{p.name}</div>
      ))}
    </div>
  ),
  Loader: () => <div>Loading...</div>,
  Selected: () => <div>Selected...</div>,
  Flyout: () => <div>Flyout...</div>,
}));

describe('Home component', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [{ name: 'pikachu', url: 'url' }],
      }),
    });
  });

  test('renders loading while loading', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [{ name: 'pikachu', url: 'itissupposedtobeurl' }],
      }),
    });

    render(<Home />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText('Search Button'));

    expect(await screen.findByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
    );
  });
});
