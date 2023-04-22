import React, { ReactNode, useMemo, useReducer } from 'react';
import themeReducer from './reducer';
import { AppContext } from './themeContext';
import { IThemeActions } from '../types/theme-actions';
import { IContextInitialState } from '../types/context-types';

interface ContextProviderProps{
    children: ReactNode
}

export const initialState:IContextInitialState = {
  any:'any'
};

export const AppProvider = ({ children }:ContextProviderProps)=>{

  const[ state, dispatch] = useReducer(themeReducer, initialState);

  const AppValue = {

  };

  return(
    <AppContext.Provider value={AppValue}>
      {children}
    </AppContext.Provider>
  );

};

