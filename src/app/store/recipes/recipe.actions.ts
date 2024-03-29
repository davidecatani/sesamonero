import { Action } from '@ngrx/store';

import { Recipe } from '../../models/recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const STORE_RECIPES = '[Recipes] Store Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';
export const ANONYMOUS_LOGIN = '[Recipes] Anonymous Login';
export const AUTHENTICATE_FAIL = '[Recipes] Authenticate Fail';
export const SET_TOKEN = '[Recipes] Set Token';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}
export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class AnonymousLogin implements Action {
  readonly type = ANONYMOUS_LOGIN;
}
export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

// export class StoreRecipes implements Action {
//   readonly type = STORE_RECIPES;
// }

// export class AddRecipe implements Action {
//   readonly type = ADD_RECIPE;

//   constructor(public payload: Recipe) {}
// }

// export class UpdateRecipe implements Action {
//   readonly type = UPDATE_RECIPE;

//   constructor(public payload: { index: number; newRecipe: Recipe }) {}
// }

// export class DeleteRecipe implements Action {
//   readonly type = DELETE_RECIPE;

//   constructor(public payload: number) {}
// }

export type RecipesActions =
  | SetRecipes
  | FetchRecipes
  | AnonymousLogin
  | AuthenticateFail
  | SetToken;
/*| AddRecipe
  | UpdateRecipe;
| DeleteRecipe*/
