export enum ITheme{
    DARK= 'dark',
    LIGHT= 'light'
}

export interface IContextInitialState {
    navPathname: string;
}

export interface IAppValue extends IContextInitialState{
    handlePathname: ()=> void
}