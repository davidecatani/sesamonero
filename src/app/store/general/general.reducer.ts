import * as GeneralActions from './general.actions';

export interface State {
  currentPage: number;
  currentSearch: string;
}

const initialState: State = {
  currentPage: null,
  currentSearch: null,
};

export function generalReducer(
  state = initialState,
  action: GeneralActions.GeneralActions
): State {
  // console.log(action);
  switch (action.type) {
    case GeneralActions.SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case GeneralActions.SET_CURRENT_SEARCH:
      return {
        ...state,
        currentSearch: action.payload,
      };
    default:
      return { ...state };
  }
}
