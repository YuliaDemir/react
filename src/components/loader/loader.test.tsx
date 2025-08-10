import { render, screen } from '@testing-library/react';

import { Loader } from './loader';

describe('Loader Component', () => {
  test('renders loader element with role status', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
