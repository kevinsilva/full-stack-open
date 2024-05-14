import { TextTypes } from '../types';

export const Header = ({ text }: TextTypes) => {
  return <h2 className='header'>{text}</h2>;
};
