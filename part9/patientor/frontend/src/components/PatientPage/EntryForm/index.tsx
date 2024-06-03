import { useState } from 'react';
import {
  InputLabel,
  Typography,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { Diagnosis, DischargeTypes, SickLeaveTypes } from '../../../types';
import { HospitalForm } from './HospitalForm';
import { OccupationalHealthcareForm } from './OccupationalHealthcareForm';
import { HealthCheckForm } from './HealthCheckForm';

const typeOptions = [
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
  { value: 'Hospital', label: 'Hospital' },
];

export const EntryForm = () => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [type, setType] = useState<string>(typeOptions[0].value);

  // Specific fields
  const [diagnosis, setDiagnosis] = useState<Diagnosis['code'][]>(['M24.2']);
  const [discharge, setDischarge] = useState<DischargeTypes>({
    date: '',
    criteria: '',
  });
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeave, setSickLeave] = useState<SickLeaveTypes>({
    startDate: '',
    endDate: '',
  });
  const [healthCheckRating, setHealthCheckRating] = useState<string>('');

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    if (typeof event.target.value === 'string') setType(event.target.value);
  };

  return (
    <div>
      <form>
        <Typography variant='h6'>New Entry</Typography>
        <InputLabel style={{ marginTop: 20 }}>Description</InputLabel>
        <TextField
          placeholder='Add a description'
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <TextField
          fullWidth
          type='date'
          value={date}
          InputLabelProps={{ shrink: true }}
          onChange={({ target }) => setDate(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Specialist</InputLabel>
        <TextField
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select label='Type' fullWidth value={type} onChange={onTypeChange}>
          {typeOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        {type === 'Hospital' && (
          <HospitalForm
            diagnosis={diagnosis}
            setDiagnosis={setDiagnosis}
            discharge={discharge}
            setDischarge={setDischarge}
          />
        )}

        {type === 'OccupationalHealthcare' && (
          <OccupationalHealthcareForm
            employerName={employerName}
            setEmployerName={setEmployerName}
            diagnosis={diagnosis}
            setDiagnosis={setDiagnosis}
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
          />
        )}

        {type === 'HealthCheck' && (
          <HealthCheckForm
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating}
          />
        )}
      </form>
    </div>
  );
};
