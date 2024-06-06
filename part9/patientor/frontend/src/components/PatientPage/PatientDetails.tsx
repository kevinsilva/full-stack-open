import { Box, Typography, Button } from '@mui/material';
import { PatientDetailsTypes } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useState } from 'react';
import { EntryDetails } from './EntryDetails';
import { EntryForm } from './EntryForm';

export const PatientDetails = ({
  patientData,
  setPatientData,
  patientDiagnosis,
  setPatientDiagnosis,
}: PatientDetailsTypes) => {
  const [showForm, setShowForm] = useState<boolean>(false);
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
      <Button
        onClick={() => setShowForm(!showForm)}
        variant='text'
        color='primary'
        sx={{ mt: 2 }}
      >
        {showForm ? 'Hide Entry Form' : 'Add New Entry'}
      </Button>

      {showForm && (
        <EntryForm
          patientData={patientData}
          setPatientData={setPatientData}
          setPatientDiagnosis={setPatientDiagnosis}
        />
      )}

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
              <EntryDetails entry={entry} codes={patientDiagnosis} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
