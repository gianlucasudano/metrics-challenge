import { Controller, Control } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

type CheckBoxProps = {
  label: string;
  name: string;
  useFormControl: Control;
};

// https://codesandbox.io/s/react-hook-form-v7-controller-5h1q5?file=/src/index.js
function CheckBoxControlled({ label, name, useFormControl }: CheckBoxProps) {
  return (
    <Controller
      name={name}
      control={useFormControl}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => field.onChange(e.target.checked)}
              checked={field.value}
            />
          }
          label={label}
        />
      )}
    />
  );
}

export default CheckBoxControlled;
