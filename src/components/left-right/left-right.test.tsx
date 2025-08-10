import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { LIMIT_NUMBER, MAX } from '@/constants';
import { api } from '@/features/slices/api-slice';

import { LeftRight } from './left-right';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  useStore: jest.fn(),
}));

describe('LeftRight component', () => {
  const setPageMock = jest.fn();
  const dispatchMock = jest.fn();

  beforeEach(() => {
    setPageMock.mockClear();
    dispatchMock.mockClear();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (useSelector as unknown as jest.Mock).mockImplementation(() => ({}));
    (useStore as unknown as jest.Mock).mockImplementation(() => ({}));
  });

  test('renders Left, Refetch, and Right buttons', () => {
    render(<LeftRight curPage="0" setPage={setPageMock} />);

    expect(screen.getByRole('button', { name: /left/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /refetch/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /right/i })).toBeInTheDocument();
  });

  test('Left button disabled if curPage <= 0', () => {
    render(<LeftRight curPage="0" setPage={setPageMock} />);
    expect(screen.getByRole('button', { name: /left/i })).toBeDisabled();
  });

  test('Right button disabled if curPage > MAX - LIMIT_NUMBER', () => {
    render(
      <LeftRight
        curPage={(MAX - LIMIT_NUMBER + 1).toString()}
        setPage={setPageMock}
      />
    );
    expect(screen.getByRole('button', { name: /right/i })).toBeDisabled();
  });

  test('Click on Left button calls setPage with curPage - LIMIT_NUMBER', () => {
    render(<LeftRight curPage="20" setPage={setPageMock} />);
    fireEvent.click(screen.getByRole('button', { name: /left/i }));
    expect(setPageMock).toHaveBeenCalledWith(20 - LIMIT_NUMBER);
  });

  test('Click on Right button calls setPage with curPage + LIMIT_NUMBER', () => {
    render(<LeftRight curPage="20" setPage={setPageMock} />);
    fireEvent.click(screen.getByRole('button', { name: /right/i }));
    expect(setPageMock).toHaveBeenCalledWith(20 + LIMIT_NUMBER);
  });

  test('Click on Refetch button dispatches invalidateTags', () => {
    render(<LeftRight curPage="0" setPage={setPageMock} />);
    fireEvent.click(screen.getByRole('button', { name: /refetch/i }));
    expect(dispatchMock).toHaveBeenCalledWith(
      api.util.invalidateTags(['Pokemon', 'Ability'])
    );
  });
});
