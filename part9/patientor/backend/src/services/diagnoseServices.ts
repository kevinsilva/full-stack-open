import diagnoses from '../../data/diagnoses';
import { DiagnoseTypes } from '../types';

const getEntries = (): DiagnoseTypes[] => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};