/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import { Controller, Control } from 'react-hook-form';
import Box from '@mui/material/Box';

type DatePickerProps = {
  useFormControl: Control;
  label: string;
  name: string;
};

function DatePickerControlled({
  useFormControl,
  label,
  name,
}: DatePickerProps) {
  return (
    <Controller
      render={({ field }) => (
        <Box>
          <label htmlFor={name}>{label}</label>
          <input
            {...field}
            type="datetime-local"
            min="2023-01-01"
            max="2023-03-15"
          />
        </Box>
      )}
      name={name}
      control={useFormControl}
    />
  );
}

export default DatePickerControlled;
