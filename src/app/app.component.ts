import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as RecipesActions from './store/recipe.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sesamonero';

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }
}
