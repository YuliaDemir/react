import { render, screen, fireEvent } from '@testing-library/react';

import { ThemeProvider, useTheme } from '../components/theme-context';

describe('ThemeProvider', () => {
  const TestComponent = () => {
    const { theme, toggleTheme } = useTheme();
    return (
      <div>
        <span data-testid="theme">{theme}</span>
        <button onClick={toggleTheme}>Toggle</button>
      </div>
    );
  };

  const renderWithProvider = () =>
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  test('uses light theme by default', () => {
    renderWithProvider();
    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('toggles to dark theme', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('Toggle'));

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  test('restores theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark');
    renderWithProvider();

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
