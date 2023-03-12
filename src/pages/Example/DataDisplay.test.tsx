import { renderWithClient } from 'src/queries/utils';
import { screen, waitFor } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';

// TODO: resolve the index export
import {
  server,
  exampleGetResponseMocked,
  getExampleFailedResponseHandler,
  getExampleEmptyResponseHandler,
} from 'mocks/index';
import DataDisplay from './DataDisplay';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('DataDisplay', () => {
  it('renders a list of products', async () => {
    // ARRANGE
    renderWithClient(queryClient, <DataDisplay />);

    // EXPECT
    await waitFor(() => {
      for (let i = 0; i < exampleGetResponseMocked.length; i += 1) {
        expect(
          screen.getByText(exampleGetResponseMocked[i].name)
        ).toBeInTheDocument();
      }
    });
  });

  it('renders an error message', async () => {
    // ARRANGE
    server.use(getExampleFailedResponseHandler);
    renderWithClient(queryClient, <DataDisplay />);

    // EXPECT
    await waitFor(() => {
      expect(screen.getByText(/UH-OH/i)).toBeInTheDocument();
    });
  });

  it('renders an no rows message', async () => {
    // ARRANGE
    server.use(getExampleEmptyResponseHandler);
    renderWithClient(queryClient, <DataDisplay />);

    // EXPECT
    await waitFor(() => {
      expect(screen.getByText(/no rows/i)).toBeInTheDocument();
    });
  });
});
