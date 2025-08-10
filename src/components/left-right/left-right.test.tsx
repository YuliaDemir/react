import { render, screen, fireEvent } from '@testing-library/react';

import { LIMIT_NUMBER, MAX } from '@/constants';

import { LeftRight } from './left-right';

describe('LeftRight component', () => {
  const setPageMock = jest.fn();

  beforeEach(() => {
    setPageMock.mockClear();
  });

  test('renders Left and Right buttons', () => {
    render(<LeftRight curPage="0" setPage={setPageMock} />);

    expect(screen.getByRole('button', { name: /left/i })).toBeInTheDocument();
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
});
