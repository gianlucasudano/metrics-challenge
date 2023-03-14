import { useState } from 'react';
import { AxiosError } from 'axios';
import { useForm, Control, SubmitHandler } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import Alert, { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { type MetricPost } from 'api/metricsApi';
import { Names } from 'queries/normalizers';
import { metricsQueryKey } from 'queries/useGetMetrics';
import useCreateMetric from 'queries/useCreateMetric';

import TextFieldControlled from 'components/TextFieldControlled';
import DatePickerControlled from 'components/DatePickerControlled';

type ResponseMessage = {
  message: string;
  severity: AlertColor;
} | null;

const defaultValues = {
  addedAt: 1673906122000,
  value: 60,
  name: '',
};

const valueProps = {
  label: 'Value',
  name: 'value',
  placeholder: 'Seconds',
  required: true,
  type: 'number',
};

const addedAtProps = {
  label: 'Date',
  name: 'addedAt',
  placeholder: 'Date',
  required: true,
  type: 'number',
};

const namesItems = [
  { value: Names.Import, label: 'import from calendar' },
  { value: Names.Edit, label: 'modal edit' },
  { value: Names.Submit, label: 'modal submit' },
  { value: Names.Skip, label: 'modal skip survey' },
  { value: Names.Survey, label: 'modal survey' },
  { value: Names.SurveySubmit, label: 'modal survey submit' },
];

const nameProps = {
  label: 'Name',
  name: 'name',
  placeholder: 'Name',
  required: true,
  optionsItems: namesItems,
  select: true,
};

function AddMetricForm() {
  const [resultMessage, setResultMessage] = useState<ResponseMessage>(null);

  const isAlertVisible = resultMessage !== undefined && resultMessage !== null;
  const { handleSubmit, control, reset } = useForm({ defaultValues });
  const { mutate } = useCreateMetric();

  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<MetricPost> = (formData) => {
    const dataToPost = {
      ...formData,
      addedAt: Math.floor(new Date(formData.addedAt).getTime()),
    };
    mutate(
      { metricPost: dataToPost },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: [metricsQueryKey] });
          // TODO: verify why data.data
          const message =
            data && `The ${data.data.name} metric has been successfully added`;
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
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
          >
            <TextFieldControlled
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...nameProps}
              useFormControl={control as unknown as Control}
            />
            <TextFieldControlled
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...valueProps}
              useFormControl={control as unknown as Control}
            />

            <DatePickerControlled
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...addedAtProps}
              useFormControl={control as unknown as Control}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <Button variant="outlined" type="submit">
                Add a metric
              </Button>
            </Box>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
}

export default AddMetricForm;
