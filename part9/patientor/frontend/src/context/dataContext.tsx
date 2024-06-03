import { useState, createContext, useContext, useEffect } from 'react';
import { ContextTypes, ChildrenTypes, Diagnosis, Patient } from '../types';
import patientService from '../services/patients';
import diagnosesService from '../services/diagnoses';

const DataContext = createContext<ContextTypes | null>(null);

export default function DataContextProvider({ children }: ChildrenTypes) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchPatientList();
    void fetchDiagnosesList();
  }, []);

  const value = {
    patients,
    setPatients,
    diagnoses,
    setDiagnoses,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

/* eslint-disable react-refresh/only-export-components */
export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataContextProvider');
  }
  return context;
}
