import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

type Props = {
  title: string;
  width: number;
  totalTime: Record<string, string>;
  children: JSX.Element;
  endDate: number;
  startDate: number;
};

function JourneyWrapper({
  title,
  width,
  totalTime,
  children,
  endDate,
  startDate,
}: Props) {
  const { hours, minutes, seconds } = totalTime;
  const from = new Date(startDate).toLocaleDateString('es-ES');
  const to = new Date(endDate).toLocaleDateString('es-ES');

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography variant="subtitle2">
          Metrics collected from {from} to {to}
        </Typography>
        <Box>
          <Box
            sx={{
              width: `${width}%`,
              backgroundColor: 'secondary.light',
              borderRadius: 1,
              padding: 2,
            }}
          >
            {`Total time (HH:MM:SS): ${hours}:${minutes}:${seconds}`}
          </Box>
        </Box>
        {children}
      </Stack>
    </Paper>
  );
}

export default JourneyWrapper;
