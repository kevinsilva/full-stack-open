import { Box, Typography } from '@mui/material';
import { PatientDetailsTypes } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

export const PatientDetails = ({ patientData }: PatientDetailsTypes) => {
  if (!patientData) return <div>No patient data</div>;

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant='h4' component='h2' gutterBottom>
        {patientData.name}{' '}
        {patientData.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </Typography>
      <Typography variant='body1'>ssn: {patientData.ssn}</Typography>
      <Typography variant='body1'>
        occupation: {patientData.occupation}
      </Typography>
    </Box>
  );
};
