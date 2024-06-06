import { SetStateAction } from 'react';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientPageTypes = {
  diagnoses: Diagnosis[];
};

export type EntryDetailsTypes = {
  entry: Entry;
  codes: Diagnosis[];
};

export type DischargeTypes = {
  date: string;
  criteria: string;
};

export type SickLeaveTypes = {
  startDate: string;
  endDate: string;
};

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeaveTypes;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge?: DischargeTypes;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

export type PatientDetailsTypes = {
  setPatientData: React.Dispatch<SetStateAction<Patient | null>>;
  patientData: Patient;
  patientDiagnosis: Diagnosis[];
  setPatientDiagnosis: React.Dispatch<SetStateAction<Diagnosis[]>>;
};

export type EntryFormTypes = {
  patientData: Patient;
  setPatientData: React.Dispatch<SetStateAction<Patient | null>>;
  setPatientDiagnosis: React.Dispatch<SetStateAction<Diagnosis[]>>;
};

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type NewEntryTypes = UnionOmit<Entry, 'id'>;

export type ChildrenTypes = {
  children: React.ReactNode;
};

export type ContextTypes = {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  diagnoses: Diagnosis[];
  setDiagnoses: React.Dispatch<React.SetStateAction<Diagnosis[]>>;
};
