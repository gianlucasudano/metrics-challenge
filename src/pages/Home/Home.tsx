import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ErrorCard from 'components/ErrorCard';
import useGetMetrics, { MetricsResponse } from 'queries/useGetMetrics';
import getGroupedMetrics from 'queries/normalizers';

function Home() {
  const { data, error }: MetricsResponse = useGetMetrics();

  const normalizedData = data && getGroupedMetrics(data);
  const isHappyPathAvailable =
    normalizedData &&
    normalizedData.IMPORT_FROM_CALENDAR &&
    normalizedData.MODAL_SUBMIT;
  const isHalfHappyPathAvailable =
    normalizedData &&
    normalizedData.IMPORT_FROM_CALENDAR &&
    normalizedData.MODAL_EDIT &&
    normalizedData.MODAL_SUBMIT;
  const isUnhappyPathAvailable =
    normalizedData &&
    normalizedData.IMPORT_FROM_CALENDAR &&
    normalizedData.MODAL_SKIP_SURVEY;
  const isUnhappyPathSurveyAvailable =
    normalizedData &&
    normalizedData.IMPORT_FROM_CALENDAR &&
    normalizedData.MODAL_SURVEY &&
    normalizedData.MODAL_SUBMIT_SURVEY;

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Autofill Timesheet: metrics visualization
        </Typography>

        <Stack spacing={2} mt={2} mb={2}>
          <Paper elevation={1}>
            <Stack spacing={2} p={2}>
              {isHappyPathAvailable && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Happy path: [ IMPORT_FROM_CALENDAR, MODAL_SUBMIT ]
                  </Typography>
                  <Box>
                    {JSON.stringify(
                      normalizedData.IMPORT_FROM_CALENDAR,
                      null,
                      2
                    )}
                  </Box>
                  <Box>
                    {JSON.stringify(normalizedData.MODAL_SUBMIT, null, 2)}
                  </Box>
                </>
              )}
              {isHalfHappyPathAvailable && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Half happy path: [ IMPORT_FROM_CALENDAR, MODAL_EDIT,
                    MODAL_SUBMIT ]
                  </Typography>
                  <Box>
                    {JSON.stringify(
                      normalizedData.IMPORT_FROM_CALENDAR,
                      null,
                      2
                    )}
                  </Box>
                  <Box>
                    {JSON.stringify(normalizedData.MODAL_EDIT, null, 2)}
                  </Box>
                  <Box>
                    {JSON.stringify(normalizedData.MODAL_SUBMIT, null, 2)}
                  </Box>
                </>
              )}
              {isUnhappyPathAvailable && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Unhappy path: [ IMPORT_FROM_CALENDAR, MODAL_SKIP_SURVEY ]
                  </Typography>
                  <Box>
                    {JSON.stringify(
                      normalizedData.IMPORT_FROM_CALENDAR,
                      null,
                      2
                    )}
                  </Box>
                  <Box>
                    {JSON.stringify(normalizedData.MODAL_SKIP_SURVEY, null, 2)}
                  </Box>
                </>
              )}
              {isUnhappyPathSurveyAvailable && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Unhappy path with survey data: [ IMPORT_FROM_CALENDAR,
                    MODAL_SURVEY, MODAL_SUBMIT_SURVEY ]
                  </Typography>
                  <Box>
                    {JSON.stringify(
                      normalizedData.IMPORT_FROM_CALENDAR,
                      null,
                      2
                    )}
                  </Box>
                  <Box>
                    {JSON.stringify(normalizedData.MODAL_SURVEY, null, 2)}
                  </Box>
                  <Box>
                    {JSON.stringify(
                      normalizedData.MODAL_SUBMIT_SURVEY,
                      null,
                      2
                    )}
                  </Box>
                </>
              )}
            </Stack>
          </Paper>
          <Paper elevation={1}>
            {error && <ErrorCard message={error.message} />}
          </Paper>
        </Stack>
      </Container>
    </>
  );
}

export default Home;
