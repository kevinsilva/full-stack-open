export type TextTypes = {
  text: string;
};

export type AddDiaryTypes = {
  onSubmit: (newEntry: DiaryTypes) => void;
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
