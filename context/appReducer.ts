import { IState, IAction } from '../types/theme-actions';

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'FOCUS_NAVLINK_PATH':
      return {
        ...state,
        navPathname: action.payload || 'home',
      };

    default:
      return state;
  }
};

export default reducer;
