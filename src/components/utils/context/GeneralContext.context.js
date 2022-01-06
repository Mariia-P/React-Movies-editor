import { createContext } from 'react';

export const generalInfo = {
  language: 'english',
  changeData: () => {},
};

export const GeneralContext = createContext(generalInfo);
