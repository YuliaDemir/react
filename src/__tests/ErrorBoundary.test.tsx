import { render, screen } from '@testing-library/react';
import { Component } from 'react';

import ErrorBoundary from '../components/ErrorBoundary.tsx';

class ProblematicComponent extends Component {
  render() {
    throw new Error('Error!');
    return <>work</>;
  }
}

describe('Error Component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  test('Renders and shows fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong*/i)).toBeInTheDocument();
  });

  test('shows an error button', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
