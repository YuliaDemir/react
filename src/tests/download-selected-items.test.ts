import { downloadSelectedItems } from '../components/helpers';

import type { Pokemons } from '../types';

describe('downloadSelectedItems', () => {
  const clickMock = jest.fn();
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;

  beforeEach(() => {
    URL.createObjectURL = jest.fn(() => 'blob:mock-url');
    URL.revokeObjectURL = jest.fn();

    document.createElement = jest.fn(() => ({
      click: clickMock,
      set href(value: string) {
        expect(value).toBe('blob:mock-url');
      },
      set download(value: string) {
        expect(value).toBe('2_items.csv');
      },
    })) as unknown as typeof document.createElement;
  });

  afterEach(() => {
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    jest.restoreAllMocks();
  });

  it('should do nothing if data is empty or undefined', () => {
    expect(downloadSelectedItems([])).toBeUndefined();
    expect(
      downloadSelectedItems(undefined as unknown as Pokemons[])
    ).toBeUndefined();
  });

  it('should create CSV and trigger download', () => {
    const data: Pokemons[] = [
      { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'Squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
    ];

    const clickMock = jest.fn();

    document.createElement = jest.fn(() => ({
      click: clickMock,
      set href(value: string) {
        expect(value).toBe('blob:mock-url');
      },
      set download(value: string) {
        expect(value).toBe('2_items.csv');
      },
    })) as unknown as typeof document.createElement;

    downloadSelectedItems(data);

    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });
});
