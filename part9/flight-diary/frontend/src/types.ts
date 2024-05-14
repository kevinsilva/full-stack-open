export type HeaderTypes = {
  name: string;
};

export type DiaryTypes = {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
};

export type NewDiaryEntryTypes = Omit<DiaryTypes, 'id'>;
export type NonSensitiveDiaryEntryTypes = Omit<DiaryTypes, 'comment'>;
