import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { Card } from '../components/';

describe('Card Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('Renders item name and description', () => {
    fetchMock
      .mockResponseOnce(
        JSON.stringify({
          forms: [{ url: 'some/url/5/' }],
        })
      )
      .mockResponseOnce(
        JSON.stringify({
          sprites: { front_default: 'some/img.png' },
        })
      );

    render(
      <MemoryRouter>
        <Card name="pikachu" description="yellow" mainCard />
      </MemoryRouter>
    );
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });
});
