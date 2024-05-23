import { Typography, Box, List, ListItem } from '@mui/material';
import { HospitalEntry, Diagnosis } from '../../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

type HospitalDetailsTypes = {
  entry: HospitalEntry;
  codes: Diagnosis[];
};

export const HospitalDetails = ({ entry, codes }: HospitalDetailsTypes) => {
  return (
    <Box>
      <Typography>
        {entry.date} <LocalHospitalIcon />
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
      <Typography variant='body1'>
        Discharged: [{entry.discharge?.date}] {entry.discharge?.criteria}
      </Typography>
    </Box>
  );
};
