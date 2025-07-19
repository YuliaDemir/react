import { render, screen } from '@testing-library/react';
import * as ReactDOM from 'react-dom/client';
import ErrorBoundary from '../ErrorBoundary';
import { StrictMode } from 'react';
import App from '../App';

jest.mock('react-dom/client', () => {
    return {
        createRoot: jest.fn(() => ({
            render: jest.fn(),
            unmount: jest.fn(),
        })),
    };
});

describe('main.tsx', () => {

    beforeEach(() => {
        window.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                results: [{
                    name: 'pikachu',
                    url: '',
                }],
            }),
        })) as jest.Mock;
    });

    it('calls createRoot and renders app', async () => {
        const rootElement = document.createElement('div');
        rootElement.id = 'root';
        document.body.appendChild(rootElement);

        await import('../main');

        expect(ReactDOM.createRoot).toHaveBeenCalledWith(rootElement);

        const mockRender = (ReactDOM.createRoot as jest.Mock).mock.results[0].value.render;
        expect(mockRender).toHaveBeenCalledTimes(1);
    });

});