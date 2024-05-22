import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { Patient, PatientPageTypes, Diagnosis } from '../../types';
import { PatientDetails } from './PatientDetails';

export const PatientPage = ({ diagnoses }: PatientPageTypes) => {
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const id = useParams().id;

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!id) return;
      const patientData = await patientService.getOne(id);
      const patientDiagnosisCodes = patientData.entries.map(
        (e) => e.diagnosisCodes
      )[0];
      const patientDiagnosis = diagnoses.filter((d) =>
        patientDiagnosisCodes?.includes(d.code)
      );
      setPatientData(patientData);
      setDiagnosis(patientDiagnosis);
    };

    void fetchPatientData();
  }, [id]);

  if (!patientData) return <div>No patient data</div>;
  return (
    <PatientDetails patientData={patientData} patientDiagnoses={diagnosis} />
  );
};
