import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// { "name": "IMPORT_FROM_CALENDAR",
// "averagePerDay": { "hours": "05", "minutes": "52", "seconds": "34" },
// "averagePerHour": { "hours": "00", "minutes": "14", "seconds": "41" },
// "averagePerMinute": { "hours": "00", "minutes": "00", "seconds": "14" },
// "totalActions": 1652,
// "totalValue": { "hours": "164", "minutes": "23", "seconds": "04" },
// "totalValueSecs": 591784, "latestDate": 1672528794000, "earliestDate": 1674945728000,
// "percentageToDays": 24.484905255997887
// }

type Props = {
  title: string;
  width: number;
  totalValue: Record<string, string>;
  averagePerDay: Record<string, string>;
  averagePerHour: Record<string, string>;
  averagePerMinute: Record<string, string>;
  totalActions: number;
};

export default function MetricCard({
  title,
  width,
  totalValue,
  averagePerDay,
  averagePerHour,
  averagePerMinute,
  totalActions,
}: Props) {
  const percentage = Math.floor(width);
  const { hours, minutes, seconds } = totalValue;
  const { hours: hoursD, minutes: minutesD, seconds: secondsD } = averagePerDay;
  const {
    hours: hoursH,
    minutes: minutesH,
    seconds: secondsH,
  } = averagePerHour;
  const {
    hours: hoursM,
    minutes: minutesM,
    seconds: secondsM,
  } = averagePerMinute;

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="body1">{title}</Typography>
          <Typography variant="body2">
            {`Total time (HH:MM:SS): ${hours}:${minutes}:${seconds}`}
          </Typography>
          <Typography variant="body2">
            {`Total clicks: ${totalActions}`}
          </Typography>
          <Box>
            <Box
              sx={{
                width: `${width}%`,
                backgroundColor: 'primary.light',
                borderRadius: 1,
                padding: 2,
              }}
            >
              {`${percentage}%`}
            </Box>
          </Box>
          <Typography color="text.secondary">
            {`Average per day: ${hoursD}:${minutesD}:${secondsD}`}
          </Typography>
          <Typography color="text.secondary">
            {`Average per hours: ${hoursH}:${minutesH}:${secondsH}`}
          </Typography>
          <Typography color="text.secondary">
            {`Average per minutes: ${hoursM}:${minutesM}:${secondsM}`}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
