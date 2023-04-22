export enum IThemeActions {
    TOGGLE_COLOR_MODE= 'TOGGLE_COLOR_MODE'
}

export interface IThemeContextReducer{
    type: IThemeActions,
    payload?: object
}

