export interface Entry {}

export type DiagnoseTypes = {
  code: string;
  name: string;
  latin?: string;
};

export type PatientTypes = {
  id: string | undefined;
  name: string;
  ssn: string;
  occupation: string;
  dateOfBirth: string;
  gender: string;
  entries: Entry[];
};

export type NewPatientEntryTypes = Omit<PatientTypes, 'id' | 'entries'>;

export type NonSensitivePatientTypes = Omit<PatientTypes, 'ssn' | 'entries'>;
