import { useReducer, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { initialState } from './appInitialState';
import reducer from './appReducer';
import AppContext from './appContext';
import { IContextType } from '../types/context/theme-actions';
import { splitPathname } from '../utils/splitPathname';

interface IAppProviderProps {
  children: ReactNode;
  value?: IContextType;
}

export const AppProvider = ({ children, value }: IAppProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const router = useRouter();
  const pathname = splitPathname(router);

  const handleModalClose = () => {
    dispatch({ type: 'SHOW_MODAL', payload: false });
    dispatch({ type: 'FOCUS_NAVLINK_PATH', payload: pathname });
  };

  const handleModalOpen = () => {
    dispatch({ type: 'SHOW_MODAL', payload: true });
  };

  const handleToggleDrawer = () => {
    dispatch({ type: 'TOGGLE_DRAWER', payload: !state.toggleDrawer });
  };

  // const handleIntersectingHeadingId = (targetId: 'string')=>{
  //   dispatch({type: "FOCUS_TOC_HEADING", payload: targetId})
  // }

  const stateFns = {
    handleModalClose,
    handleModalOpen,
    handleToggleDrawer,
  };

  return (
    <AppContext.Provider value={value || { state, dispatch, stateFns }}>
      {children}
    </AppContext.Provider>
  );
};
