import { useState, useEffect } from 'react';

const Notify = ({ errorMessage, resetError }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      resetError();
    }, 5000);

    return () => clearTimeout(timer);
  }, [errorMessage, resetError]);

  if (!visible || !errorMessage) return null;

  return (
    <div style={{ color: 'red', marginBottom: '25px' }}>
      {errorMessage}
    </div>
  );
};

export default Notify;