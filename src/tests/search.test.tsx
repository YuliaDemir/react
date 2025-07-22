import Search from "../components/search";
import { render, screen, fireEvent } from '@testing-library/react'

describe('Search Component', () => {
    beforeEach(() => localStorage.clear());

    test ('Renders search input and search button', () => {
        render(<Search value="ignore" onSearch={() => {}} />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    test ('Displays previously saved search term from localStorage on mount', () => {
        localStorage.setItem("query", "react-control");
        render(<Search value="ignore" onSearch={() => {}} />);
        expect(screen.getByDisplayValue('react-control')).toBeInTheDocument();
    });

    test ('Shows empty input when no saved term exists', () => {
        render(<Search value="ignore" onSearch={() => {}} />);
        expect(screen.getByRole('textbox')).toHaveValue("");
    });

    test ('calls the passed function with the required value', () => {
        const onSearchMock = jest.fn();

        render(<Search value="ignore" onSearch={onSearchMock} />);

        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button', { name: /search/i });
        
        fireEvent.change(input, { target: { value: 'new-value' } });

        fireEvent.click(button);

        expect(onSearchMock).toHaveBeenCalledWith("new-value");
    })
})