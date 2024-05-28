import { Typography, Box, List, ListItem } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { HealthCheckEntry, Diagnosis, HealthCheckRating } from '../../../types';
import { assertNever } from '../../../utils';
import FavoriteIcon from '@mui/icons-material/Favorite';

type HealthCheckDetailsTypes = {
  entry: HealthCheckEntry;
  codes: Diagnosis[];
};

const parseHealthCheckRating = (rating: HealthCheckRating): JSX.Element => {
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

export const HealthCheckDetails = ({
  entry,
  codes,
}: HealthCheckDetailsTypes) => {
  return (
    <Box>
      <Typography>
        {entry.date} <MedicalServicesIcon />
      </Typography>
      <Typography variant='body1' sx={{ fontStyle: 'italic' }}>
        {entry.description}
      </Typography>
      <Typography variant='body1'>
        health check rating: {parseHealthCheckRating(entry.healthCheckRating)}
      </Typography>
      <List sx={{ listStyleType: 'disc' }}>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((code, index) => (
            <ListItem
              key={`${code}-${index}`}
              sx={{ display: 'list-item', ml: 4 }}
            >
              {code} {codes.find((c) => c.code === code)?.name}
            </ListItem>
          ))}
      </List>
      <Typography variant='body1'>diagnosed by: {entry.specialist}</Typography>
    </Box>
  );
};
