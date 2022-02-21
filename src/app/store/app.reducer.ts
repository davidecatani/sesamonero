import { ActionReducerMap } from '@ngrx/store';

import * as fromRecipes from './recipes/recipe.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromGeneral from './general/general.reducer';

export interface AppState {
  general: fromGeneral.State;
  recipes: fromRecipes.State;
  token: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  general: fromGeneral.generalReducer,
  recipes: fromRecipes.recipeReducer,
  token: fromAuth.authReducer,
};
