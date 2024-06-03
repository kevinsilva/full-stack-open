import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { useDataContext } from '../../context/dataContext';
import { Patient, Diagnosis } from '../../types';
import { PatientDetails } from './PatientDetails';

export const PatientPage = () => {
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const id = useParams().id;
  const { diagnoses } = useDataContext();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!patientData) return <div>No patient data</div>;
  return (
    <div
      style={{
        backgroundColor: '#f5f5f5',
        width: '100%',
        height: '100%',
        padding: '20px',
      }}
    >
      <PatientDetails patientData={patientData} patientDiagnoses={diagnosis} />
    </div>
  );
};
