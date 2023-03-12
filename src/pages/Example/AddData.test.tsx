import { renderWithClient } from 'src/queries/utils';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { QueryClient } from '@tanstack/react-query';

import { server, postExampleFailedResponseHandler } from 'mocks/index';
import AddDataForm from './AddDataForm';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('AddDataForm', () => {
  it('displays alert success when a new product has been created', async () => {
    // ARRANGE
    renderWithClient(queryClient, <AddDataForm />);
    const user = userEvent.setup();
    const inputName = screen.getByRole('textbox', { name: 'Name' });
    const inputDescription = screen.getByRole('textbox', {
      name: 'Description',
    });
    const submitButton = screen.getByRole('button', {
      name: /add product/i,
    });

    // ACT
    await user.type(inputName, 'screen');
    // Next commented line expect not in scope: just to double-check
    // expect(inputName).toHaveValue('screen');
    await user.type(inputDescription, 'screen description');
    // Next commented line expect not in scope: just to double-check
    // expect(inputDescription).toHaveValue('screen description');
    fireEvent.submit(submitButton);

    // EXPECT
    await waitFor(() => {
      expect(inputName).toHaveValue('');
      expect(inputDescription).toHaveValue('');
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(
        screen.getByText('The screen product has been successfully added')
      ).toBeInTheDocument();
    });
  });

  it('displays alert failure when a network error occurred', async () => {
    // ARRANGE
    server.use(postExampleFailedResponseHandler);
    renderWithClient(queryClient, <AddDataForm />);
    const user = userEvent.setup();
    const inputName = screen.getByRole('textbox', { name: 'Name' });
    const inputDescription = screen.getByRole('textbox', {
      name: 'Description',
    });
    const submitButton = screen.getByRole('button', {
      name: /add product/i,
    });

    // ACT
    await user.type(inputName, 'screen');
    // Next commented line expect not in scope: just to double-check
    expect(inputName).toHaveValue('screen');
    await user.type(inputDescription, 'screen description');
    // Next commented line expect not in scope: just to double-check
    expect(inputDescription).toHaveValue('screen description');
    fireEvent.submit(submitButton);

    // EXPECT
    await waitFor(() => {
      expect(inputName).toHaveValue('');
      expect(inputDescription).toHaveValue('');
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(
        screen.getByText('An Request failed with status code 500 occurred')
      ).toBeInTheDocument();
    });
  });
});
