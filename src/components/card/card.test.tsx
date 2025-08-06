import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { Card } from './card';
import { store } from '../../app/store';

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
      <Provider store={store}>
        <MemoryRouter>
          <Card name="pikachu" description="yellow" mainCard />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });
});
