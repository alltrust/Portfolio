import { IState } from '../types/context/theme-actions';

export const initialState: IState = {
  navPathname: 'home',
  navTabClicked: false,
  isLoading: false,
  alert: { display: false },
  showModal: false
};
