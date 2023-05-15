import { AlertColor } from '@mui/material/Alert';

export interface IState {
  navPathname: string;
  navTabClicked: boolean;
  isLoading: boolean;
  alert: {
    display: boolean;
    message?: string;
    variant?: AlertColor | undefined;
  };
  showModal: boolean;
}

interface INavPathname {
  type: 'FOCUS_NAVLINK_PATH';
  payload: IState['navPathname'];
}

interface INavTabClicked {
  type: 'NAV_TAB_CLICKED';
  payload: IState['navTabClicked'];
}

interface IIsLoading {
  type: 'LOADING';
  payload: IState['isLoading'];
}

interface IAlert {
  type: 'ALERT';
  payload: IState['alert'];
}

interface IShowModal {
  type: 'SHOW_MODAL';
  payload: IState['showModal'];
}

export type IAction =
  | INavPathname
  | INavTabClicked
  | IIsLoading
  | IAlert
  | IShowModal;

export type IDispatch = (action: IAction) => void;

interface IContextActions {
  handleModalClose: ()=> void
}



export type IContextType = {
  state: IState;
  dispatch: IDispatch;
  stateFns: IContextActions

};
