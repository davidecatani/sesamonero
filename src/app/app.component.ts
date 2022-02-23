import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as RecipesActions from './store/recipes/recipe.actions';
import * as GeneralActions from './store/general/general.actions';
import * as fromApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sesamonero';

  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(new RecipesActions.AnonymousLogin());
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  resetSearch() {
    this.store.dispatch(new GeneralActions.SetCurrentCategory(''));
    this.store.dispatch(new GeneralActions.SetCurrentSearch(''));
    this.store.dispatch(new GeneralActions.SetPage(1));
  }
}
