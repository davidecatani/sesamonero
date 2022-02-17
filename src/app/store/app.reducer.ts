import { ActionReducerMap } from '@ngrx/store';

import * as fromRecipes from './recipes/recipe.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface AppState {
  recipes: fromRecipes.State;
  token: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  recipes: fromRecipes.recipeReducer,
  token: fromAuth.authReducer,
};
