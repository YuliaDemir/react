import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from '@testing-library/user-event';

jest.mock('../components/loader', () => () => <div data-testid="loader">Loading...</div>);
jest.mock('../components/search', () => (props: { value: string; onSearch: (query: string) => void}) => (
    <button onClick={() => props.onSearch('pikachu')} data-testid="search-button">Search</button>
));
jest.mock('../components/card-list', () => ({ data }: { data: []}) => (
    <div data-testid="card-list">{data.length} cards</div>
));

beforeEach(()=> {
    global.fetch = jest.fn(async (input: RequestInfo): Promise<Response> => {
        await new Promise(resolve => setTimeout(resolve, 100));

        if (typeof input === 'string' && input.includes('pikachu')) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ name: 'pikachu'}),
            } as Response);
        }
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ name: 'pikachu' }),
        } as Response);
    }) as jest.Mock;
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('shows loader while searching', async () => {
    render(<App />);

    const searchButton = screen.getByTestId('search-button');
    await userEvent.click(searchButton);

    expect(await screen.findByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('card-list')).toBeInTheDocument();
})