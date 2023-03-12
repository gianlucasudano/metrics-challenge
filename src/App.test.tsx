import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App, WrappedApp } from './App';

describe('App', () => {
  it('Renders Hello World', () => {
    // ARRANGE
    render(<WrappedApp />);
    // ACT
    // EXPECT
    expect(
      screen.getByRole('heading', { name: /Hello World/i })
    ).toBeInTheDocument();
  });
  it('Renders Not Found if invalid path ', () => {
    // ARRANGE
    render(
      <MemoryRouter initialEntries={['/this-route-do-not-exist']}>
        <App />
      </MemoryRouter>
    );
    // ACT
    // EXPECT
    expect(
      screen.getByRole('heading', { name: /Not Found/i })
    ).toBeInTheDocument();
  });
});
