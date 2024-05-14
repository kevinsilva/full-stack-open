import { HeaderTypes } from '../types';

export const Header = ({ text }: HeaderTypes) => {
  return <h2 className='header'>{text}</h2>;
};
