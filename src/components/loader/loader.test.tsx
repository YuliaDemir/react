import { render, screen } from '@testing-library/react';

import { Loader } from '../';

describe('Loader Component', () => {
  test('Renders ', () => {
    render(<Loader />);
    expect(screen.getByText(/load*/i)).toBeInTheDocument();
  });
});
