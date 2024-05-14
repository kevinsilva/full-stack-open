import { TextTypes } from '../types';

export const ErrorMessage = ({ text }: TextTypes) => {
  if (text) return <p className='error'>{text}</p>;
};
