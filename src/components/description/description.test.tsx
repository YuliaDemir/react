import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router';

import { Loader } from '@/components';
import { useGetPokemonsQuery } from '@/features/slices/api-slice';
import { usePagination } from '@/hooks';

import { Description } from './description';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
  Link: ({
    to,
    children,
    ...props
  }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('@/hooks', () => ({
  usePagination: jest.fn(),
}));

jest.mock('@/features/slices/api-slice', () => ({
  useGetPokemonsQuery: jest.fn(),
}));

jest.mock('@/components', () => ({
  Loader: jest.fn(() => <div>Loading...</div>),
  AbilityItem: jest.fn(({ id }) => <div>Ability {id}</div>),
}));

describe('Description', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ name: 'pikachu' });
    (usePagination as jest.Mock).mockReturnValue([null, 'page=1']);
  });

  it('renders loader when loading', () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    render(<Description />);

    expect(Loader).toHaveBeenCalled();
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it('renders error message on error', () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: { message: 'something went wrong' },
      isLoading: false,
    });

    render(<Description />);

    expect(
      screen.getByText(/Error loading description for pikachu/)
    ).toBeInTheDocument();
  });

  it('links back to pagination query', () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: { abilities: [] },
      error: undefined,
      isLoading: false,
    });

    render(<Description />);

    const link = screen.getByRole('link', { name: /close/i });
    expect(link).toHaveAttribute('href', '/page=1');
  });
});
