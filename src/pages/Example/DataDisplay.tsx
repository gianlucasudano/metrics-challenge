import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import isArray from 'lodash/isArray';

import useGetExample, { GetExampleResponse } from 'queries/useGetExample';
import { ExampleItem } from 'api/exampleApi';

import ErrorCard from './ErrorCard';

type DataGridRow = Omit<ExampleItem, 'inStock'> & { inStock: string };

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 90 },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: false,
  },
  {
    field: 'inStock',
    headerName: 'In Stock',
    width: 150,
    editable: false,
  },
];

export default function DataDisplay() {
  const theme = useTheme();
  const dataGridCss = { height: theme.spacing(50), width: '100%' };

  const { isLoading, data, error }: GetExampleResponse = useGetExample();

  const rowsProps =
    data && isArray(data)
      ? data.map(({ name, description, inStock, id }) => {
          return { name, description, inStock: inStock ? 'Yes' : 'No', id };
        })
      : ([] as DataGridRow[]);

  return (
    <Stack spacing={2} mt={2} mb={2}>
      <Paper elevation={1}>
        <Typography variant="h4" gutterBottom padding={2}>
          Displays example data: useGetExample query
        </Typography>
        {rowsProps && (
          <Box sx={dataGridCss} padding={2}>
            <DataGrid
              columns={columns}
              disableColumnFilter
              disableColumnMenu
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: false }}
              loading={isLoading}
              rows={rowsProps}
            />
          </Box>
        )}
        {error && <ErrorCard message={error.message} />}
      </Paper>
    </Stack>
  );
}
