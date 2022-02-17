import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { of, from } from 'rxjs';

import { Recipe } from '../../models/recipe.model';
import * as RecipesActions from './recipe.actions';
import * as fromApp from '../app.reducer';

export interface AuthResponseData {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const baseApi =
  'https://ng-course-recipe-book-a8fae-default-rtdb.firebaseio.com';
enum errorMessages {
  EMAIL_EXISTS = 'The email address is already in use by another account',
  OPERATION_NOT_ALLOWED = 'Password sign-in is disabled for this project',
  TOO_MANY_ATTEMPTS_TRY_LATER = 'We have blocked all requests from this device due to unusual activity. Try again later',
  EMAIL_NOT_FOUND = 'There is no user record corresponding to this identifier.The user may have been deleted',
  INVALID_PASSWORD = 'The password is invalid or the user does not have a password',
  USER_DISABLED = 'The user account has been disabled by an administrator',
}
const handleError = (errorRes: any) => {
  let errorMessage = Boolean(errorMessages[errorRes.error.error.message])
    ? errorMessages[errorRes.error.error.message]
    : 'An unknown error occurred!';
  return of(new RecipesActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class RecipeEffects {
  fetchRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(`${baseApi}/recipes.json`);
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return new RecipesActions.SetRecipes(recipes);
      })
    );
  });

  storeRecipes$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
          return this.http.put(`${baseApi}/recipes.json`, recipesState.recipes);
        })
      );
    },
    { dispatch: false }
  );

  authLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.ANONYMOUS_LOGIN),
      switchMap((authData: RecipesActions.AnonymousLogin) => {
        const auth = getAuth();
        return from(signInAnonymously(auth));
      }),
      switchMap((resData) => {
        return from(resData.user.getIdToken());
      }),
      map((token) => {
        return new RecipesActions.SetToken(token);
      })
    );
  });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
