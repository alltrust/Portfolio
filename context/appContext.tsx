import { createContext } from 'react';
import { IContextType } from '../types/theme-actions';

const AppContext = createContext<IContextType>({} as IContextType);

export default AppContext;
