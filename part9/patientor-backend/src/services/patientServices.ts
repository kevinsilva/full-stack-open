import patients from '../../data/patients';
import { PatientTypes, NonSensitivePatientTypes } from '../types';

const getEntries = (): PatientTypes[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientTypes[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};