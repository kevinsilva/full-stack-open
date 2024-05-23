import { HealthCheckRating } from './types';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const parseHealthCheckRating = (
  rating: HealthCheckRating
): JSX.Element => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon sx={{ color: 'red' }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon sx={{ color: 'darkorange' }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon sx={{ color: 'green' }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon sx={{ color: 'blue' }} />;
    default:
      return assertNever(rating);
  }
};
