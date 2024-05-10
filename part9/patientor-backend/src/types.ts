export type DiagnoseTypes = {
  code: string;
  name: string;
  latin?: string;
};

export type PatientTypes = {
  id: string | undefined;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
};

export type NewPatientEntryTypes = Omit<PatientTypes, 'id'>;

export type NonSensitivePatientTypes = Omit<PatientTypes, 'ssn'>;