import { Box, Typography, List, ListItem } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import { OccupationalHealthCareEntry, Diagnosis } from '../../../types';

type OccupationalHealthcareDetailsTypes = {
  entry: OccupationalHealthCareEntry;
  codes: Diagnosis[];
};

export const OccupationalHealthcareDetails = ({
  entry,
  codes,
}: OccupationalHealthcareDetailsTypes) => {
  return (
    <Box>
      <Typography>
        {entry.date} <WorkIcon /> {entry.employerName}
      </Typography>
      <Typography variant='body1' sx={{ fontStyle: 'italic' }}>
        {entry.description}
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
      {entry.sickLeave && (
        <Typography variant='body1'>
          sick leave: {entry.sickLeave?.startDate} / {entry.sickLeave?.endDate}
        </Typography>
      )}
      <Typography variant='body1'>diagnosed by: {entry.specialist}</Typography>
    </Box>
  );
};
