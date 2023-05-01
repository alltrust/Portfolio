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
    // case 'LOADING':
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    case 'FETCH_FEATURED_PROJECTS':
      return {
        ...state,
        featuredProjects: action.payload || [],
      };

    default:
      return state;
  }
};

export default reducer;
