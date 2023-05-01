import { IProject } from '../app/Iproject';

export interface IState {
  navPathname: string;
  navTabClicked: boolean;
  // isLoading: boolean;
  featuredProjects: IProject[];
  allProjects: IProject[];
  singleProject: IProject;
}

interface INavPathname {
  type: 'FOCUS_NAVLINK_PATH';
  payload: IState['navPathname'];
}

interface INavTabClicked {
  type: 'NAV_TAB_CLICKED';
  payload: IState['navTabClicked'];
}

// interface IIsLoading {
//   type: 'LOADING';
//   payload: IState['isLoading'];
// }

interface IFeaturedProjects {
  type: 'FETCH_FEATURED_PROJECTS';
  payload: IState['featuredProjects'];
}

interface IAllProjects {
  type: 'FETCH_ALL_PROJECTS';
  payload: IState['allProjects'];
}

interface ISingleProject {
  type: 'FETCH_SINGLE_PROJECT';
  payload: IState['singleProject'];
}

export type IAction =
  | INavPathname
  | INavTabClicked
  | IFeaturedProjects
  | IAllProjects
  | ISingleProject;

export type IDispatch = (action: IAction) => void;

export type IContextType = {
  state: IState;
  dispatch: IDispatch;
};
