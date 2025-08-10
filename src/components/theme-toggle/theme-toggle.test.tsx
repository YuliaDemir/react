import { render, screen, fireEvent } from '@testing-library/react';

import { useTheme } from '@/features/theme-context/theme-context';

import { ThemeToggle } from './theme-toggle';

jest.mock('@/features/theme-context/theme-context', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeToggle', () => {
  const toggleThemeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with light theme styles', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: toggleThemeMock,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-gray-300');

    const toggleCircle = button.firstChild;
    expect(toggleCircle).toHaveClass('translate-x-0');
  });

  test('renders with dark theme styles', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: toggleThemeMock,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-gray-700');

    const toggleCircle = button.firstChild;
    expect(toggleCircle).toHaveClass('translate-x-6');
  });

  test('calls toggleTheme on click', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: toggleThemeMock,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
