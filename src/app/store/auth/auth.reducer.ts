import * as RecipesActions from '../recipes/recipe.actions';

export interface State {
  token: string;
}

const initialState: State = {
  token: null,
};

export function authReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
): State {
  // console.log(action);
  switch (action.type) {
    case RecipesActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return { ...state };
  }
}
