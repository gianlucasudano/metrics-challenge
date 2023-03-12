import { useState } from 'react';
import { AxiosError } from 'axios';
import { useForm, Control, SubmitHandler } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import Alert, { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { exampleQueryKey } from 'queries/useGetExample';
import useCreateExample from 'queries/useCreateExample';

import CheckBoxControlled from './CheckBoxControlled';
import TextFieldControlled from './TextFieldControlled';

type FormData = {
  description: string;
  inStock: boolean;
  name: string;
  prevState?: null;
};

type ResponseMessage = {
  message: string;
  severity: AlertColor;
} | null;

const defaultValues = {
  description: '',
  inStock: true,
  name: '',
};

const productNameProps = {
  label: 'Name',
  name: 'name',
  placeholder: 'Product Name',
  required: true,
};

const productDescriptionsProps = {
  label: 'Description',
  name: 'description',
  placeholder: 'Product description',
  required: true,
};

const productInStockProps = {
  label: 'In Stock',
  name: 'inStock',
};

function AddDataForm() {
  const [resultMessage, setResultMessage] = useState<ResponseMessage>(null);

  const isAlertVisible = resultMessage !== undefined && resultMessage !== null;
  const { handleSubmit, control, reset } = useForm({ defaultValues });
  const { mutate } = useCreateExample();

  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<FormData> = (formData) => {
    mutate(
      { example: formData },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: [exampleQueryKey] });
          // TODO: verify why data.data
          const message =
            data && `The ${data.data.name} product has been successfully added`;
          setResultMessage({ message, severity: 'success' });
        },
        onError: (error) => {
          const { message: errorMessage } = error as AxiosError;
          const message = `An ${errorMessage} occurred`;
          setResultMessage({ message, severity: 'error' });
        },
        onSettled: () => {
          reset(defaultValues);
        },
      }
    );
  };

  return (
    <Paper elevation={1}>
      <Stack spacing={2} mt={2} mb={2}>
        {isAlertVisible && (
          <Box ml={2} mr={2}>
            <Alert severity={resultMessage.severity}>
              {resultMessage.message}
            </Alert>
          </Box>
        )}
        <Typography variant="h4" gutterBottom padding={2}>
          Add example data: useCreatetExample mutation
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <Stack
            padding={2}
            direction="row"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
          >
            <TextFieldControlled
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...productNameProps}
              useFormControl={control as unknown as Control}
            />
            <TextFieldControlled
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...productDescriptionsProps}
              useFormControl={control as unknown as Control}
            />
            <FormGroup sx={{ justifyContent: 'flex-end' }}>
              <CheckBoxControlled
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...productInStockProps}
                useFormControl={control as unknown as Control}
              />
            </FormGroup>
            <Box
              padding={2}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <Button variant="outlined" type="submit">
                Add product
              </Button>
            </Box>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
}

export default AddDataForm;
