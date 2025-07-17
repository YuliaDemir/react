import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';
import { Component } from 'react';

class ProblematicComponent extends Component{
    render() {
    throw new Error('Error!');
    return (
        <></>
    );
    }
}

describe('Error Component', () => {

    test ('Renders and show error button', () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        render(
            <ErrorBoundary>
                <ProblematicComponent />
            </ErrorBoundary>
        );
        expect(screen.getByText(/something went wrong./i)).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
        (console.error as jest.Mock).mockRestore();
    });
})