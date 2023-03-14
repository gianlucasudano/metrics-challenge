/* eslint-disable react/require-default-props */
import { Controller, Control } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

type TextFieldProps = {
  useFormControl: Control;
  placeholder: string;
  label: string;
  required: boolean;
  name: string;
  type?: string;
  select?: boolean;
  optionsItems?: Record<string, unknown>[];
};

// https://codesandbox.io/s/react-hook-form-v7-controller-5h1q5?file=/src/index.js
function TextFieldControlled({
  useFormControl,
  placeholder,
  label,
  required,
  name,
  type,
  select,
  optionsItems,
}: TextFieldProps) {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          placeholder={placeholder}
          label={label}
          required={required}
          type={type}
          select={select}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...field}
        >
          {optionsItems &&
            optionsItems.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      )}
      name={name}
      control={useFormControl}
    />
  );
}

export default TextFieldControlled;
