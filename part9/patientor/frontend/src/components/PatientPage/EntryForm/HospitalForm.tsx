import { TextField, InputLabel, Select, MenuItem } from '@mui/material';
import { useDataContext } from '../../../context/dataContext';

type HospitalFormTypes = {
  discharge: {
    date: string;
    criteria: string;
  };
  setDischarge: (value: { date: string; criteria: string }) => void;
  diagnosis: string[];
  setDiagnosis: (value: string[]) => void;
};

export const HospitalForm = ({
  discharge,
  setDischarge,
  diagnosis,
  setDiagnosis,
}: HospitalFormTypes) => {
  const { diagnoses } = useDataContext();
  const diagnosisCodes = diagnoses.map((d) => d.code);

  return (
    <div>
      <InputLabel sx={{ my: 2 }}>Discharge</InputLabel>
      <TextField
        label='Date'
        fullWidth
        type='date'
        InputLabelProps={{ shrink: true }}
        value={discharge.date}
        sx={{ mb: 2 }}
        onChange={({ target }) =>
          setDischarge({ ...discharge, date: target.value })
        }
      />
      <TextField
        label='Criteria'
        fullWidth
        value={discharge.criteria}
        InputLabelProps={{ shrink: true }}
        onChange={({ target }) =>
          setDischarge({ ...discharge, criteria: target.value })
        }
      />
      <InputLabel sx={{ mt: 2 }}>Diagnosis Codes</InputLabel>
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
    </div>
  );
};
