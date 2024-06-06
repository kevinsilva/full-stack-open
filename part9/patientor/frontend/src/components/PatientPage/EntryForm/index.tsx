import { useState, SyntheticEvent } from 'react';
import {
  InputLabel,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import {
  Diagnosis,
  DischargeTypes,
  NewEntryTypes,
  SickLeaveTypes,
  EntryFormTypes,
} from '../../../types';
import { HospitalForm } from './HospitalForm';
import { OccupationalHealthcareForm } from './OccupationalHealthcareForm';
import { HealthCheckForm } from './HealthCheckForm';
import patientService from '../../../services/patients';
import { ErrorMessage } from '../../ErrorMessage';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDataContext } from '../../../context/dataContext';

const typeOptions = [
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
  { value: 'Hospital', label: 'Hospital' },
];

export const EntryForm = ({
  patientData,
  setPatientData,
  setPatientDiagnosis,
  setShowForm,
}: EntryFormTypes) => {
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
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const id = useParams().id;
  const { diagnoses } = useDataContext();

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    if (typeof event.target.value === 'string') setType(event.target.value);
  };

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      let entryData: NewEntryTypes | undefined = undefined;

      if (type === 'HealthCheck') {
        entryData = {
          description,
          date,
          specialist,
          type,
          healthCheckRating,
        };
      }
      if (type === 'OccupationalHealthcare') {
        entryData = {
          description,
          date,
          specialist,
          type,
          diagnosisCodes: diagnosis,
          employerName,
          sickLeave,
        };
      }

      if (type === 'Hospital') {
        entryData = {
          description,
          date,
          specialist,
          type,
          diagnosisCodes: diagnosis,
          discharge,
        };
      }

      if (id && entryData) {
        const entryResponse = await patientService.createEntry(id, entryData);

        if (
          entryResponse.diagnosisCodes &&
          entryResponse.diagnosisCodes.length > 0
        ) {
          const patientDiagnosis = diagnoses
            .filter((d) => entryResponse.diagnosisCodes?.includes(d.code))
            .map((d) => d);

          setPatientDiagnosis(patientDiagnosis);
        }

        const addedPatientEntry = patientData.entries.concat(entryResponse);

        setPatientData({ ...patientData, entries: addedPatientEntry });
        setError('');
        setShowForm(false);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data &&
          typeof error?.response?.data === 'string'
        ) {
          const message = error.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        }
      } else {
        console.error('Unknown error', error);
        setError('Unknown error');
      }
    }
  };
  return (
    <div>
      {error && <ErrorMessage text={error} />}
      <form onSubmit={onSubmit}>
        <Typography
          variant='h6'
          component='h3'
          sx={{ fontWeight: 'bold', my: 2 }}
        >
          new entry
        </Typography>
        <InputLabel sx={{ mt: 2 }}>Description</InputLabel>
        <TextField
          placeholder='Add a description'
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel sx={{ mt: 2 }}>Date</InputLabel>
        <TextField
          fullWidth
          type='date'
          value={date}
          InputLabelProps={{ shrink: true }}
          onChange={({ target }) => setDate(target.value)}
        />
        <InputLabel sx={{ mt: 2 }}>Specialist</InputLabel>
        <TextField
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel sx={{ mt: 2 }}>Type</InputLabel>
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
        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ mt: 2 }}
        >
          Add Entry
        </Button>
      </form>
    </div>
  );
};
