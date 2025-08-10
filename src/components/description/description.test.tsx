import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { store } from '@/app/store';

import { Description } from '../';

jest.mock('@/features/slices/api-slice', () => {
  const original = jest.requireActual('@/features/slices/api-slice');
  return {
    ...original,
    useGetPokemonsQuery: jest.fn(),
  };
});

import { useGetPokemonsQuery } from '@/features/slices/api-slice';

describe('Description component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Loader when loading', () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Description />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
