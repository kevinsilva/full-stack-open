import { useState, useEffect } from 'react';
import { Header } from './components/header';
import { DiaryList } from './components/diaryList';
import { AddDiaryForm } from './components/addDiaryForm';
import { DiaryTypes } from './types';
import diaryService from './services/diaries';
import './App.css';

function App() {
  const [diaries, setDiaries] = useState<DiaryTypes[]>([]);

  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };

    try {
      fetchDiaryList();
    } catch (error: unknown) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Header text='Add new entry' />
      <AddDiaryForm
        onSubmit={(newEntry) => setDiaries(diaries.concat(newEntry))}
      />
      <Header text='Diary entries' />
      <DiaryList diaries={diaries} />
    </div>
  );
}

export default App;
