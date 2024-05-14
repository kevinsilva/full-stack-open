export type TextTypes = {
  text: string;
};

export type AddDiaryTypes = {
  onSubmit: (newEntry: DiaryTypes) => void;
};

export enum Visiblity {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Windy = 'windy',
  Stormy = 'stormy',
}

export type DiaryTypes = {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visiblity;
  comment: string;
};

export type NewDiaryEntryTypes = Omit<DiaryTypes, 'id'>;
export type NonSensitiveDiaryEntryTypes = Omit<DiaryTypes, 'comment'>;
