import axios from 'axios';
import { Patient, PatientFormValues, NewEntryTypes, Entry } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getAllSensitive = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients/sensitive`
  );

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (
  id: string,
  entry: NewEntryTypes
): Promise<Entry> => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry
  );
  return data;
};

export default {
  getAll,
  getAllSensitive,
  create,
  createEntry,
  getOne,
};
