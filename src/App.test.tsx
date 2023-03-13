import { renderWithClient } from 'src/queries/utils';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { App, WrappedApp } from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('App', () => {
  it('Autofill Timesheet: metrics visualization', () => {
    // ARRANGE
    renderWithClient(queryClient, <WrappedApp />);
    // ACT
    // EXPECT
    expect(
      screen.getByRole('heading', {
        name: /Autofill Timesheet: metrics visualization/i,
      })
    ).toBeInTheDocument();
  });
  it('Renders Not Found if invalid path ', () => {
    // ARRANGE
    renderWithClient(
      queryClient,
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
