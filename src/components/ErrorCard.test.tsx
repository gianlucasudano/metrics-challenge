import { render, screen } from '@testing-library/react';
import ErrorCard from './ErrorCard';

describe('ErrorCard', () => {
  it('renders the card with an error message', () => {
    render(<ErrorCard message="Network Error" />);

    expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
  });
});
