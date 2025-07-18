import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';



describe('Error Component', () => {

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test ('Show loading during search', async () => {
        fetchMock.mockResponseOnce(() => new Promise(resolve => 
            setTimeout(() => resolve({
        body: JSON.stringify({ name: 'pikachu' }),
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }), 100)
        ));
        
        render(<App />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'pikachu' } });

        const button = screen.getByRole('button', { name: /search/i });
        fireEvent.click(button);

        expect(screen.getByText("Loading...")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());
    });
})