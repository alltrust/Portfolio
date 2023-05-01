import { useReducer, ReactNode } from 'react';
import { initialState } from './appInitialState';
import reducer from './appReducer';
import AppContext from './appContext';
import { IContextType } from '../types/context/theme-actions';

interface IAppProviderProps {
  children: ReactNode;
  value?: IContextType;
}

export const AppProvider = ({ children, value }: IAppProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={value || { state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
