import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { Description } from '../components';

global.fetch = jest.fn();

describe('Description component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Loader', () => {
    (fetch as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<Description />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
