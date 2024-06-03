import { TextField, InputLabel, Select, MenuItem } from '@mui/material';
import { useDataContext } from '../../../context/dataContext';

type OccupationalHealthcareFormTypes = {
  employerName: string;
  setEmployerName: (value: string) => void;
  diagnosis: string[];
  setDiagnosis: (value: string[]) => void;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
  setSickLeave: (value: { startDate: string; endDate: string }) => void;
};

export const OccupationalHealthcareForm = ({
  employerName,
  setEmployerName,
  diagnosis,
  setDiagnosis,
  sickLeave,
  setSickLeave,
}: OccupationalHealthcareFormTypes) => {
  const { diagnoses } = useDataContext();
  const diagnosisCodes = diagnoses.map((d) => d.code);

  return (
    <>
      <InputLabel style={{ marginTop: 20 }}>Employer Name</InputLabel>
      <TextField
        placeholder='Add Employer Name'
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes</InputLabel>
      <Select
        label='Diagnosis Codes'
        fullWidth
        multiple
        value={diagnosis}
        onChange={({ target }) => setDiagnosis(target.value as string[])}
      >
        {diagnosisCodes.map((code) => (
          <MenuItem key={code} value={code}>
            {code}
          </MenuItem>
        ))}
      </Select>
      <InputLabel style={{ marginTop: 20 }}>Sick Leave</InputLabel>
      <TextField
        fullWidth
        label='Start Date'
        InputLabelProps={{ shrink: true }}
        type='date'
        value={sickLeave.startDate}
        onChange={({ target }) =>
          setSickLeave({ ...sickLeave, startDate: target.value })
        }
      />
      <TextField
        fullWidth
        label='End Date'
        type='date'
        value={sickLeave.endDate}
        InputLabelProps={{ shrink: true }}
        onChange={({ target }) =>
          setSickLeave({ ...sickLeave, endDate: target.value })
        }
      />
    </>
  );
};
