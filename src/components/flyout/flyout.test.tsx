import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import {
  clearSelected,
  downloadSelected,
} from '@/features/slices/selected-slice';

import { Flyout } from './flyout';

jest.mock('@/features/selected-slice', () => ({
  clearSelected: jest.fn(() => ({ type: 'CLEAR_SELECTED' })),
  downloadSelected: jest.fn(() => ({ type: 'DOWNLOAD_SELECTED' })),
}));

const mockStore = configureStore([]);

describe('Flyout component', () => {
  test(' items are not selected', () => {
    const store = mockStore({ selected: [] });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryByText(/items selected/i)).not.toBeInTheDocument();
  });

  test('renders with selected items and button works correctly', () => {
    const store = mockStore({
      selected: [{ name: 'pikachu', url: 'some-url' }],
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText(/1 items selected/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Unselect All/i));
    expect(store.dispatch).toHaveBeenCalledWith(clearSelected());

    fireEvent.click(screen.getByText(/Download/i));
    expect(store.dispatch).toHaveBeenCalledWith(downloadSelected());
  });
});
