import { Box, Typography, List, ListItem } from '@mui/material';
import { PatientDetailsTypes } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

export const PatientDetails = ({
  patientData,
  patientDiagnoses,
}: PatientDetailsTypes) => {
  if (!patientData) return <div>No patient data</div>;

  return (
    <Box sx={{ mb: 2, mt: 4 }}>
      <Typography variant='h4' component='h2' gutterBottom>
        {patientData.name}{' '}
        {patientData.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </Typography>
      <Typography variant='body1'>ssn: {patientData.ssn}</Typography>
      <Typography variant='body1'>
        occupation: {patientData.occupation}
      </Typography>

      {patientData.entries.length > 0 && (
        <Box>
          <Typography
            variant='h6'
            component='h3'
            sx={{ fontWeight: 'bold', my: 2 }}
          >
            entries
          </Typography>
          {patientData.entries.map((entry) => (
            <Box key={entry.id}>
              <Typography variant='body1'>
                {entry.date}{' '}
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ fontStyle: 'italic' }}
                >
                  {entry.description}
                </Typography>
              </Typography>
              <List sx={{ listStyleType: 'disc' }}>
                {entry.diagnosisCodes?.map((code, index) => (
                  <ListItem
                    key={`${code}-${index}`}
                    sx={{ display: 'list-item', ml: 4 }}
                  >
                    {code} {patientDiagnoses.find((d) => d.code === code)?.name}
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
