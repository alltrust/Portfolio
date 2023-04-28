export interface IState {
  // define your state properties here
  navPathname: string,
  navTabClicked: boolean 
};

interface INavPathname{
    type: "FOCUS_NAVLINK_PATH";
    payload: IState["navPathname"]
}

interface INavTabClicked{
  type: "NAV_TAB_CLICKED";
  payload: IState["navTabClicked"]
}

export type IAction =
  | INavPathname
  | INavTabClicked;

export type IDispatch = (action: IAction) => void;

export type IContextType = {
  state: IState;
  dispatch: IDispatch;
};
