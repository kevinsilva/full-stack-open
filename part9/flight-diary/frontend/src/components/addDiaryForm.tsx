import { useState } from 'react';
import diaryService from '../services/diaries';
import { ErrorMessage } from './errorMessage';
import {
  AddDiaryTypes,
  NewDiaryEntryTypes,
  Visiblity,
  Weather,
} from '../types';
import axios from 'axios';

const starterDiary: NewDiaryEntryTypes = {
  date: '',
  visibility: Visiblity.Great,
  weather: Weather.Sunny,
  comment: '',
};

export const AddDiaryForm = ({ onSubmit }: AddDiaryTypes) => {
  const [newDiary, setNewDiary] = useState<NewDiaryEntryTypes>(starterDiary);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const newEntry = await diaryService.create(newDiary);
      onSubmit(newEntry);
      setNewDiary(starterDiary);
      setError('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <div className='form'>
      {error && <ErrorMessage text={error} />}
      <form onSubmit={handleSubmit}>
        <div>
          date{' '}
          <input
            type='date'
            value={newDiary.date}
            onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })}
          />
        </div>
        <div>
          visibility{' '}
          {Object.values(Visiblity).map((value) => (
            <label key={value} className='radio-label'>
              <input
                className='radio'
                type='radio'
                name='visibility'
                value={value}
                checked={newDiary.visibility === value}
                onChange={() => setNewDiary({ ...newDiary, visibility: value })}
              />
              {value}
            </label>
          ))}
        </div>
        <div>
          weather{' '}
          {Object.values(Weather).map((value) => (
            <label key={value} className='radio-label'>
              <input
                className='radio'
                type='radio'
                name='weather'
                value={value}
                checked={newDiary.weather === value}
                onChange={() => setNewDiary({ ...newDiary, weather: value })}
              />
              {value}
            </label>
          ))}
        </div>
        <div>
          comment{' '}
          <input
            type='text'
            value={newDiary.comment}
            onChange={(e) =>
              setNewDiary({ ...newDiary, comment: e.target.value })
            }
          />
        </div>
        <button className='button' type='submit'>
          Add
        </button>
      </form>
    </div>
  );
};
