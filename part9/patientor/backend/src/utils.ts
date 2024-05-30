import {
  NewPatientEntryTypes,
  DiagnoseTypes,
  SickLeaveTypes,
  DischargeTypes,
  Entry,
  NewEntryTypes,
  HealthCheckRating,
  Gender,
} from './types';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isNumber = (param: unknown): param is number => {
  return typeof param === 'number' || param instanceof Number;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const isEntry = (entry: unknown): entry is Entry => {
  if (!entry || typeof entry !== 'object') {
    return false;
  }

  if ('type' in entry) {
    switch (entry.type) {
      case 'HealthCheck':
      case 'OccupationalHealthcare':
      case 'Hospital':
        return true;
      default:
        return false;
    }
  }

  return false;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  if (isNumber(param)) {
    return Object.values(HealthCheckRating)
      .map((v) => Number(v))
      .includes(param);
  }

  return false;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) throw new Error('Incorrect or missing name');

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth))
    throw new Error('Incorrect or missing date of birth');

  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) throw new Error('Incorrect or missing ssn');

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender))
    throw new Error('Incorrect or missing gender');

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) throw new Error('Incorrect or missing occupation');

  return occupation;
};

export const parseId = (id: unknown): string => {
  if (!isString(id)) throw new Error('Incorrect or missing id');

  return id;
};

export const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) throw new Error('Incorrect or missing entries');

  const validEntries: Entry[] = entries.map((entry) => {
    if (!isEntry(entry)) throw new Error('Incorrect or missing entry');
    return entry;
  });

  return validEntries;
};

export const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) throw new Error('Incorrect or missing specialist');

  return specialist;
};

export const parseDiagnosisCodes = (
  object: unknown
): Array<DiagnoseTypes['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnoseTypes['code']>;
  }

  return object.diagnosisCodes as Array<DiagnoseTypes['code']>;
};

export const parseDescription = (description: unknown): string => {
  if (!isString(description))
    throw new Error('Incorrect or missing description');

  return description;
};

export const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) throw new Error('Incorrect or missing criteria');

  return criteria;
};

export const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date))
    throw new Error('Incorrect or missing date');

  return date;
};

export const parseHealthCheckRating = (rating: unknown): number => {
  if (!isNumber(rating) || !isHealthCheckRating(rating))
    throw new Error('Incorrect or missing health check rating. Should be 0-3');

  return rating;
};

export const parseSickLeave = (sickLeave: unknown): SickLeaveTypes => {
  if (
    !sickLeave ||
    typeof sickLeave !== 'object' ||
    !('startDate' in sickLeave) ||
    !('endDate' in sickLeave)
  )
    throw new Error('Incorrect or missing sick leave');

  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

export const parseDischarge = (discharge: unknown): DischargeTypes => {
  if (
    !discharge ||
    typeof discharge !== 'object' ||
    !('date' in discharge) ||
    !('criteria' in discharge)
  )
    throw new Error('Incorrect or missing discharge');

  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria),
  };
};

export const toNewPatientEntry = (object: unknown): NewPatientEntryTypes => {
  if (!object || typeof object !== 'object')
    throw new Error('Incorrect or missing data');

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    const newEntry: NewPatientEntryTypes = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (object: unknown): NewEntryTypes => {
  if (!object || typeof object !== 'object')
    throw new Error('Incorrect or missing data');

  if (
    !(
      'type' in object &&
      'description' in object &&
      'date' in object &&
      'specialist' in object
    )
  ) {
    throw new Error('Incorrect or missing data');
  }

  switch (object.type) {
    case 'HealthCheck':
      if ('healthCheckRating' in object) {
        const newEntry: NewEntryTypes = {
          type: object.type,
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
        return newEntry;
      } else {
        throw new Error('Incorrect or missing data');
      }
    case 'OccupationalHealthcare':
      if ('employerName' in object) {
        const newEntry: NewEntryTypes = {
          type: object.type,
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          employerName: parseName(object.employerName),
          sickLeave:
            'sickLeave' in object
              ? parseSickLeave(object.sickLeave)
              : undefined,
        };
        return newEntry;
      } else {
        throw new Error('Incorrect or missing data');
      }
    case 'Hospital':
      if ('discharge' in object) {
        const newEntry: NewEntryTypes = {
          type: object.type,
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          discharge: parseDischarge(object.discharge),
        };
        return newEntry;
      } else {
        throw new Error('Incorrect or missing data');
      }
    default:
      throw new Error('Entry type not recognized');
  }
};
