import { createContext, useContext } from 'react';
import { IAppValue } from '../types/context-types';

const AppContext = createContext({} as any);

const useAppContext= (): IAppValue=>{

  return useContext(AppContext);

};

export { AppContext, useAppContext };

