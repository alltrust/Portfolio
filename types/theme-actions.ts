export interface IState {
  // define your state properties here
  navPathname: string
};

interface INavPathname{
    type: "FOCUS_NAVLINK_PATH";
    payload: IState["navPathname"]
}

export type IAction =
  | INavPathname
  | { type: 'ACTION_TYPE_2'; payload: "SOME_OTHERPAYLOA" };

export type IDispatch = (action: IAction) => void;

export type IContextType = {
  state: IState;
  dispatch: IDispatch;
};
