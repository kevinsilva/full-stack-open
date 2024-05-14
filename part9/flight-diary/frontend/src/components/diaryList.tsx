import { useEffect, useState } from 'react';
import { DiaryTypes } from '../types';
import diaryService from '../services/diaries';

export const DiaryList = () => {
  const [diaries, setDiaries] = useState<DiaryTypes[]>([]);

  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    fetchDiaryList();
  }, []);

  return (
    <>
      {diaries &&
        diaries.map((diary) => (
          <div key={diary.id}>
            <h4>{diary.date}</h4>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
          </div>
        ))}
    </>
  );
};
