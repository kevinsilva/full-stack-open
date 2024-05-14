import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { DiaryTypes } from '../types';

const getAll = async () => {
  const { data } = await axios.get<DiaryTypes[]>(`${apiBaseUrl}/diaries`);

  return data;
};

export default {
  getAll,
};
