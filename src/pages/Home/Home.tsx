import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ErrorCard from 'components/ErrorCard';
import useGetMetrics, { MetricsResponse } from 'queries/useGetMetrics';
import getGroupedMetrics, { getJourneys } from 'queries/normalizers';

import JourneyWrapper from './elements/JourneyWrapper';
import MetricCard from './elements/MetricCard';

function Home() {
  const { data, error }: MetricsResponse = useGetMetrics();

  const normalizedData = data && getGroupedMetrics(data);
  const totalsValues = normalizedData && getJourneys(normalizedData);
  const isHappyPathAvailable = totalsValues && totalsValues.happyPath;
  const isHalfHappyPathAvailable = totalsValues && totalsValues.halfHappyPath;
  const isUnhappyPathAvailable = totalsValues && totalsValues.unhappyPath;
  const isUnhappyPathSurveyAvailable =
    totalsValues && totalsValues.unhappyPathSurvey;

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Autofill Timesheet: metrics visualization
        </Typography>
        <Stack spacing={2} mt={2} mb={2}>
          {isHappyPathAvailable && (
            <JourneyWrapper
              title="Happy path: the user in two steps is able to autofill the timesheet"
              width={totalsValues.happyPath.percentage}
              totalTime={totalsValues.happyPath.totalHumanReadable}
              startDate={totalsValues.happyPath.startDate}
              endDate={totalsValues.happyPath.endDate}
            >
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <MetricCard
                  title="Click on auto fill from calendar"
                  width={normalizedData.IMPORT_FROM_CALENDAR.percentageToDays}
                  totalValue={normalizedData.IMPORT_FROM_CALENDAR.totalValue}
                  averagePerDay={
                    normalizedData.IMPORT_FROM_CALENDAR.averagePerDay
                  }
                  averagePerHour={
                    normalizedData.IMPORT_FROM_CALENDAR.averagePerHour
                  }
                  averagePerMinute={
                    normalizedData.IMPORT_FROM_CALENDAR.averagePerMinute
                  }
                  totalActions={
                    normalizedData.IMPORT_FROM_CALENDAR.totalActions
                  }
                />

                <MetricCard
                  title="Click on submit"
                  width={normalizedData.MODAL_SUBMIT.percentageToDays}
                  totalValue={normalizedData.MODAL_SUBMIT.totalValue}
                  averagePerDay={normalizedData.MODAL_SUBMIT.averagePerDay}
                  averagePerHour={normalizedData.MODAL_SUBMIT.averagePerHour}
                  averagePerMinute={
                    normalizedData.MODAL_SUBMIT.averagePerMinute
                  }
                  totalActions={normalizedData.MODAL_SUBMIT.totalActions}
                />
              </Stack>
            </JourneyWrapper>
          )}
          {isHalfHappyPathAvailable && (
            <JourneyWrapper
              title="Half happy path with edit: the user in three steps is able to autofill the timesheet."
              width={totalsValues.halfHappyPath.percentage}
              totalTime={totalsValues.halfHappyPath.totalHumanReadable}
              startDate={totalsValues.halfHappyPath.startDate}
              endDate={totalsValues.halfHappyPath.endDate}
            >
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <MetricCard
                  title="Click on auto fill from calendar"
                  width={normalizedData.IMPORT_FROM_CALENDAR.percentageToDays}
                  totalValue={normalizedData.IMPORT_FROM_CALENDAR.totalValue}
                  averagePerDay={
                    normalizedData.IMPORT_FROM_CALENDAR.averagePerDay
                  }
                  averagePerHour={
                    normalizedData.IMPORT_FROM_CALENDAR.averagePerHour
                  }
                  averagePerMinute={
                    normalizedData.IMPORT_FROM_CALENDAR.averagePerMinute
                  }
                  totalActions={
                    normalizedData.IMPORT_FROM_CALENDAR.totalActions
                  }
                />
                <MetricCard
                  title="Click on edit"
                  width={normalizedData.MODAL_EDIT.percentageToDays}
                  totalValue={normalizedData.MODAL_EDIT.totalValue}
                  averagePerDay={normalizedData.MODAL_EDIT.averagePerDay}
                  averagePerHour={normalizedData.MODAL_EDIT.averagePerHour}
                  averagePerMinute={normalizedData.MODAL_EDIT.averagePerMinute}
                  totalActions={normalizedData.MODAL_SUBMIT.totalActions}
                />
                <MetricCard
                  title="Click on submit"
                  width={normalizedData.MODAL_SUBMIT.percentageToDays}
                  totalValue={normalizedData.MODAL_SUBMIT.totalValue}
                  averagePerDay={normalizedData.MODAL_SUBMIT.averagePerDay}
                  averagePerHour={normalizedData.MODAL_SUBMIT.averagePerHour}
                  averagePerMinute={
                    normalizedData.MODAL_SUBMIT.averagePerMinute
                  }
                  totalActions={normalizedData.MODAL_SUBMIT.totalActions}
                />
              </Stack>
            </JourneyWrapper>
          )}
          {isUnhappyPathAvailable && (
            <JourneyWrapper
              title="Unhappy path: the user is not able to use the feature."
              width={totalsValues.unhappyPath.percentage}
              totalTime={totalsValues.unhappyPath.totalHumanReadable}
              startDate={totalsValues.unhappyPath.startDate}
              endDate={totalsValues.unhappyPath.endDate}
            >
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <MetricCard
                  title="Click on auto fill from calendar"
                  width={normalizedData.IMPORT_FROM_CALENDAR.percentageToDays}
                  totalValue={normalizedData.IMPORT_FROM_CALENDAR.totalValue}
                  averagePerDay={
                    normalizedData.IMPORT_FROM_CALENDAR.averagePerDay
                  }
                  averagePerHour={
                    normalizedData.IMPORT_FROM_CALENDAR.averagePerHour
                  }
                  averagePerMinute={
                    normalizedData.IMPORT_FROM_CALENDAR.averagePerMinute
                  }
                  totalActions={
                    normalizedData.IMPORT_FROM_CALENDAR.totalActions
                  }
                />
                <MetricCard
                  title="Click on skip survey"
                  width={normalizedData.MODAL_SKIP_SURVEY.percentageToDays}
                  totalValue={normalizedData.MODAL_SKIP_SURVEY.totalValue}
                  averagePerDay={normalizedData.MODAL_SKIP_SURVEY.averagePerDay}
                  averagePerHour={
                    normalizedData.MODAL_SKIP_SURVEY.averagePerHour
                  }
                  averagePerMinute={
                    normalizedData.MODAL_SKIP_SURVEY.averagePerMinute
                  }
                  totalActions={normalizedData.MODAL_SKIP_SURVEY.totalActions}
                />
              </Stack>
            </JourneyWrapper>
          )}
          {isUnhappyPathSurveyAvailable && (
            <JourneyWrapper
              title="Unhappy path with survey data: the user is not able to use the feature and explain us why can't use the feature."
              width={totalsValues.unhappyPathSurvey.percentage}
              totalTime={totalsValues.unhappyPathSurvey.totalHumanReadable}
              startDate={totalsValues.unhappyPathSurvey.startDate}
              endDate={totalsValues.unhappyPathSurvey.endDate}
            >
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <MetricCard
                  title="Click on auto fill from calendar"
                  width={normalizedData.IMPORT_FROM_CALENDAR.percentageToDays}
                  totalValue={normalizedData.IMPORT_FROM_CALENDAR.totalValue}
                  averagePerDay={
                    normalizedData.IMPORT_FROM_CALENDAR.averagePerDay
                  }
                  averagePerHour={
                    normalizedData.IMPORT_FROM_CALENDAR.averagePerHour
                  }
                  averagePerMinute={
                    normalizedData.IMPORT_FROM_CALENDAR.averagePerMinute
                  }
                  totalActions={
                    normalizedData.IMPORT_FROM_CALENDAR.totalActions
                  }
                />
                <MetricCard
                  title="Fill the survey"
                  width={normalizedData.MODAL_SURVEY.percentageToDays}
                  totalValue={normalizedData.MODAL_SURVEY.totalValue}
                  averagePerDay={normalizedData.MODAL_SURVEY.averagePerDay}
                  averagePerHour={normalizedData.MODAL_SURVEY.averagePerHour}
                  averagePerMinute={
                    normalizedData.MODAL_SURVEY.averagePerMinute
                  }
                  totalActions={normalizedData.MODAL_SURVEY.totalActions}
                />
                <MetricCard
                  title="Click on auto submit survey"
                  width={normalizedData.MODAL_SUBMIT_SURVEY.percentageToDays}
                  totalValue={normalizedData.MODAL_SUBMIT_SURVEY.totalValue}
                  averagePerDay={
                    normalizedData.MODAL_SUBMIT_SURVEY.averagePerDay
                  }
                  averagePerHour={
                    normalizedData.MODAL_SUBMIT_SURVEY.averagePerHour
                  }
                  averagePerMinute={
                    normalizedData.MODAL_SUBMIT_SURVEY.averagePerMinute
                  }
                  totalActions={normalizedData.MODAL_SUBMIT_SURVEY.totalActions}
                />
              </Stack>
            </JourneyWrapper>
          )}
          {error && <ErrorCard message={error.message} />}
        </Stack>
      </Container>
    </>
  );
}

export default Home;
