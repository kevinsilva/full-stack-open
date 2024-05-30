import patientsData from '../../data/patients';
import {
  PatientTypes,
  NonSensitivePatientTypes,
  Entry,
  NewEntryTypes,
  NewPatientEntryTypes,
} from '../types';
import { v1 as uuid } from 'uuid';

const patients: PatientTypes[] = patientsData;

const getEntries = (): PatientTypes[] => {
  return patients;
};

const addEntry = (patientId: string, entry: NewEntryTypes): Entry => {
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) throw new Error('Patient not found.');

  const id = uuid();
  const newEntry = {
    id,
    ...entry,
  };

  patient.entries.push(newEntry);

  return newEntry;
};

const getNonSensitiveEntries = (): NonSensitivePatientTypes[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const getOne = (id: string): PatientTypes | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (entry: NewPatientEntryTypes): PatientTypes => {
  const id = uuid();

  const newPatientEntry = {
    id,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getOne,
  addPatient,
  addEntry,
};
