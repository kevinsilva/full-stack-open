import { Typography, Box, List, ListItem } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { parseHealthCheckRating } from '../../../utils';
import { HealthCheckEntry, Diagnosis } from '../../../types';

type HealthCheckDetailsTypes = {
  entry: HealthCheckEntry;
  codes: Diagnosis[];
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
