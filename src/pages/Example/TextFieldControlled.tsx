import { Controller, Control } from 'react-hook-form';
import TextField from '@mui/material/TextField';

type TextFieldProps = {
  useFormControl: Control;
  placeholder: string;
  label: string;
  required: boolean;
  name: string;
};

// https://codesandbox.io/s/react-hook-form-v7-controller-5h1q5?file=/src/index.js
function TextFieldControlled({
  useFormControl,
  placeholder,
  label,
  required,
  name,
}: TextFieldProps) {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          placeholder={placeholder}
          label={label}
          required={required}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...field}
        />
      )}
      name={name}
      control={useFormControl}
    />
  );
}

export default TextFieldControlled;
