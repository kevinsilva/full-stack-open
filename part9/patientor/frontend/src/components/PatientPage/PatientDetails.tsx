import { Box, Typography } from '@mui/material';
import { PatientDetailsTypes } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { EntryDetails } from './EntryDetails';

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
            <Box
              key={entry.id}
              sx={{ p: 1, border: '1px solid grey', borderRadius: 1, mb: 2 }}
            >
              <EntryDetails entry={entry} codes={patientDiagnoses} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
