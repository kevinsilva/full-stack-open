import { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';

import PatientListPage from './components/PatientListPage';
import { PatientPage } from './components/PatientPage';

import { EntryForm } from './components/PatientPage/EntryForm';
import DataContextProvider from './context/dataContext';

const App = () => {
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
  }, []);

  return (
    <div className='App'>
      <Router>
        <DataContextProvider>
          <Container>
            <EntryForm />
            <Typography variant='h3' style={{ marginBottom: '0.5em' }}>
              Patientor
            </Typography>
            <Button component={Link} to='/' variant='contained' color='primary'>
              Home
            </Button>
            <Divider hidden />
            <Routes>
              <Route path='/' element={<PatientListPage />} />
              <Route path='/patients/:id' element={<PatientPage />} />
            </Routes>
          </Container>
        </DataContextProvider>
      </Router>
    </div>
  );
};

export default App;
