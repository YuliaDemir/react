import { render, screen } from '@testing-library/react';

import { useGetPokemonAbilityQuery } from '@/features/slices/api-slice';
import { findAbilityDescriptionEn } from '@/utils/find-ability-description';

import { AbilityItem } from './ability-item';

jest.mock('@/features/slices/api-slice');
jest.mock('@/utils/find-ability-description');
jest.mock('@/components', () => ({
  Loader: () => <div>Loading...</div>,
}));

describe('AbilityItem', () => {
  const mockUseGetPokemonAbilityQuery = useGetPokemonAbilityQuery as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Loader while fetching data', () => {
    mockUseGetPokemonAbilityQuery.mockReturnValue({
      data: null,
      isFetching: true,
      error: null,
    });

    render(<AbilityItem id={1} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display error message when error occurs', () => {
    mockUseGetPokemonAbilityQuery.mockReturnValue({
      data: null,
      isFetching: false,
      error: true,
    });

    render(<AbilityItem id={1} />);

    expect(screen.getByText('Error loading ability')).toBeInTheDocument();
  });

  it('should render ability name and description when data is available', () => {
    const abilityData = {
      name: 'Overgrow',
      effect_entries: [{ effect: 'test effect', language: { name: 'en' } }],
    };

    mockUseGetPokemonAbilityQuery.mockReturnValue({
      data: abilityData,
      isFetching: false,
      error: null,
    });

    (findAbilityDescriptionEn as jest.Mock).mockReturnValue('Test description');

    render(<AbilityItem id={1} />);

    expect(screen.getByText('Overgrow')).toBeInTheDocument();
    expect(screen.getByText(/Test description/i)).toBeInTheDocument();
  });

  it('should show "No description" if no description is found', () => {
    const abilityData = {
      name: 'Chlorophyll',
      effect_entries: [],
    };

    mockUseGetPokemonAbilityQuery.mockReturnValue({
      data: abilityData,
      isFetching: false,
      error: null,
    });

    (findAbilityDescriptionEn as jest.Mock).mockReturnValue(null);

    render(<AbilityItem id={1} />);

    expect(screen.getByText('Chlorophyll')).toBeInTheDocument();
    expect(screen.getByText(/No description/i)).toBeInTheDocument();
  });
});
