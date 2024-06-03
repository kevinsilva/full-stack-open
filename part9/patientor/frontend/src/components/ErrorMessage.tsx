import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

export const ErrorMessage = ({ text }: { text: string }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (text) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }
  }, [text]);

  if (isVisible)
    return (
      <Typography
        className='error'
        sx={{
          backgroundColor: 'mistyrose',
          color: 'maroon',
          padding: '0.5rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ErrorIcon sx={{ marginRight: '0.5rem' }} />
        {text}
      </Typography>
    );
};
