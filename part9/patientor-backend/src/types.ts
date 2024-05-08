export type DiagnoseTypes = {
  code: string;
  name: string;
  latin?: string;
};

export type PatientTypes = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
};

export type NonSensitivePatientTypes = Omit<PatientTypes, 'ssn'>;