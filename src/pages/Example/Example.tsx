import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import DataDisplay from './DataDisplay';
import AddDataForm from './AddDataForm';

function Example() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Stack spacing={2}>
          <AddDataForm />
          <DataDisplay />
        </Stack>
      </Container>
    </>
  );
}

export default Example;
