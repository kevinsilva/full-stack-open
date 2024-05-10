import { NewPatientEntryTypes } from './types';

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) throw new Error('Incorrect or missing name');

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) throw new Error('Incorrect or missing date of birth');

  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) throw new Error('Incorrect or missing ssn');

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) throw new Error('Incorrect or missing gender');

  return gender;
};

const occupation = (occupation: unknown): string => {
  if (!isString(occupation)) throw new Error('Incorrect or missing occupation');

  return occupation;
};

export const parseId = (id: unknown): string => {
  if (!isString(id)) throw new Error('Incorrect or missing id');

  return id;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntryTypes => {
  if (!object || typeof object !== 'object')  throw new Error('Incorrect or missing data');

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
  const newEntry: NewPatientEntryTypes = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: occupation(object.occupation),
  };

  return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};
