import { AxiosError } from 'axios';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function ErrorCard({ message }: { message: AxiosError['message'] }) {
  const theme = useTheme();
  const errorCardPreCss = {
    background: theme.palette.secondary.light,
    color: theme.palette.error.contrastText,
    padding: theme.spacing(2),
  };
  const errorCardCss = {
    backgroundColor: theme.palette.error.light,
    minHeight: theme.spacing(25),
    color: theme.palette.error.contrastText,
    margin: theme.spacing(2),
  };

  return (
    <Card sx={errorCardCss} elevation={3}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          UH-OH
        </Typography>
        <Typography component="div" gutterBottom>
          A {message} occurred.
          <br />
          Probably the server is disconnetted.
        </Typography>
        <Typography>Try to run this command into your terminal:</Typography>
        <Typography component="div" sx={errorCardPreCss}>
          <pre>
            <code>npm run backend</code>
          </pre>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ErrorCard;
