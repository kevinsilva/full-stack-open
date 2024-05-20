import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import { PatientDetails } from './PatientDetails';

export const PatientPage = () => {
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const id = useParams().id;

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!id) return;
      const patientData = await patientService.getOne(id);
      setPatientData(patientData);
    };
    void fetchPatientData();
  }, [patientData, id]);

  if (!patientData) return <div>No patient data</div>;
  return <PatientDetails patientData={patientData} />;
};
