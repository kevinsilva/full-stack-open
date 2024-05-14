import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { DiaryTypes, NewDiaryEntryTypes } from '../types';

const getAll = async () => {
  const { data } = await axios.get<DiaryTypes[]>(`${apiBaseUrl}/diaries`);

  return data;
};

const create = async (object: NewDiaryEntryTypes) => {
  const { data } = await axios.post<DiaryTypes>(
    `${apiBaseUrl}/diaries`,
    object
  );

  return data;
};

export default {
  getAll,
  create,
};
