import { DiaryTypes } from '../types';

export const DiaryList = ({ diaries }: { diaries: DiaryTypes[] }) => {
  return (
    <>
      {diaries &&
        diaries.map((diary) => (
          <div className='diary' key={diary.id}>
            <h4>{diary.date}</h4>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
            {diary.comment && <p>comment: {diary.comment}</p>}
          </div>
        ))}
    </>
  );
};
