import * as ReactDOM from 'react-dom/client';

jest.mock('react-dom/client', () => {
  return {
    createRoot: jest.fn(() => ({
      render: jest.fn(),
      unmount: jest.fn(),
    })),
  };
});

describe('main.tsx', () => {
  it('calls createRoot and renders app', async () => {
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    await import('../main');

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(rootElement);

    const mockRender = (ReactDOM.createRoot as jest.Mock).mock.results[0].value
      .render;
    expect(mockRender).toHaveBeenCalledTimes(1);
  });
});
