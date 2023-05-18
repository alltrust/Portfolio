import { IState, IAction } from '../types/context/theme-actions';

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'FOCUS_NAVLINK_PATH':
      return {
        ...state,
        navPathname: action.payload || 'home',
      };
    case 'NAV_TAB_CLICKED':
      return {
        ...state,
        navTabClicked: action.payload,
      };
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'ALERT':
      return {
        ...state,
        alert: action.payload,
      };
    case 'SHOW_MODAL':
      return {
        ...state,
        showModal: action.payload,
      };
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        toggleDrawer: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
