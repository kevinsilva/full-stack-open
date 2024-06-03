import { Select, MenuItem, InputLabel } from '@mui/material';

type HealthCheckFormTypes = {
  healthCheckRating: string;
  setHealthCheckRating: (value: string) => void;
};

export const HealthCheckForm = ({
  healthCheckRating,
  setHealthCheckRating,
}: HealthCheckFormTypes) => {
  return (
    <>
      <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
      <Select
        label='Health Check Rating'
        fullWidth
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(target.value)}
      >
        <MenuItem value='0'>0 - Healthy</MenuItem>
        <MenuItem value='1'>1 - Low Risk</MenuItem>
        <MenuItem value='2'>2 - High Risk</MenuItem>
        <MenuItem value='3'>3 - Critical Risk</MenuItem>
      </Select>
    </>
  );
};
