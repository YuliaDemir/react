import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { store } from '@/app/store';
import { useGetPokemonsQuery } from '@/features/slices/api-slice';

import { Card } from './card';

jest.mock('@/features/slices/api-slice', () => {
  const originalModule = jest.requireActual('@/features/slices/api-slice');
  return {
    ...originalModule,
    useGetPokemonsQuery: jest.fn(),
  };
});

describe('Card Component', () => {
  test('renders item name when data is loaded', () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: { sprites: { front_default: 'some/img.png' } },
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card name="pikachu" url="yellow" mainCard />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pikachu/i })).toHaveAttribute(
      'src',
      'some/img.png'
    );
  });
});
