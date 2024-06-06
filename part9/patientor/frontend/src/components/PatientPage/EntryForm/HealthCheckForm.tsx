import { Select, MenuItem, InputLabel } from '@mui/material';

type HealthCheckFormTypes = {
  healthCheckRating: number;
  setHealthCheckRating: (value: number) => void;
};

export const HealthCheckForm = ({
  healthCheckRating,
  setHealthCheckRating,
}: HealthCheckFormTypes) => {
  return (
    <>
      <InputLabel sx={{ mt: 2 }}>Health Check Rating</InputLabel>
      <Select
        label='Health Check Rating'
        fullWidth
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(Number(target.value))}
      >
        <MenuItem value={0}>0 - Healthy</MenuItem>
        <MenuItem value={1}>1 - Low Risk</MenuItem>
        <MenuItem value={2}>2 - High Risk</MenuItem>
        <MenuItem value={3}>3 - Critical Risk</MenuItem>
      </Select>
    </>
  );
};
