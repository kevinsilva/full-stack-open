import { useState } from 'react';
import diaryService from '../services/diaries';
import { AddDiaryTypes, NewDiaryEntryTypes } from '../types';

const starterDiary: NewDiaryEntryTypes = {
  date: '',
  visibility: '',
  weather: '',
  comment: '',
};

export const AddDiaryForm = ({ onSubmit }: AddDiaryTypes) => {
  const [newDiary, setNewDiary] = useState<NewDiaryEntryTypes>(starterDiary);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const newEntry = await diaryService.create(newDiary);
      setNewDiary(starterDiary);
      onSubmit(newEntry);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <div>
          date{' '}
          <input
            type='text'
            value={newDiary.date}
            onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })}
          />
        </div>
        <div>
          visibility{' '}
          <input
            type='text'
            value={newDiary.visibility}
            onChange={(e) =>
              setNewDiary({ ...newDiary, visibility: e.target.value })
            }
          />
        </div>
        <div>
          weather{' '}
          <input
            type='text'
            value={newDiary.weather}
            onChange={(e) =>
              setNewDiary({ ...newDiary, weather: e.target.value })
            }
          />
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
