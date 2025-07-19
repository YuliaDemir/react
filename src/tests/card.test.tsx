import Card from "../components/card";
import { render, screen } from '@testing-library/react'

describe('Card Component', () => {

    test ('Renders item name and description', () => {
        render(<Card name="pikachu" description="yellow" />);
        expect(screen.getByText('pikachu')).toBeInTheDocument();
        expect(screen.getByText('yellow')).toBeInTheDocument();
    });
})