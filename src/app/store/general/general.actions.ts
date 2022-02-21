import { Action } from '@ngrx/store';
export const SET_PAGE = '[Recipes] Set Page';
export const SET_CURRENT_SEARCH = '[Recipes] Set Current Search';

export class SetPage implements Action {
  readonly type = SET_PAGE;

  constructor(public payload: number) {}
}
export class SetCurrentSearch implements Action {
  readonly type = SET_CURRENT_SEARCH;

  constructor(public payload: string) {}
}

export type GeneralActions = SetPage | SetCurrentSearch;
