import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as RecipesActions from './store/recipes/recipe.actions';
import * as GeneralActions from './store/general/general.actions';
import * as fromApp from './store/app.reducer';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sesamonero';

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}
  ngOnInit(): void {
    this.setUpAnalytics();
    this.store.dispatch(new RecipesActions.AnonymousLogin());
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  resetSearch() {
    this.store.dispatch(new GeneralActions.SetCurrentCategory(''));
    this.store.dispatch(new GeneralActions.SetCurrentSearch(''));
    this.store.dispatch(new GeneralActions.SetPage(1));
  }

  setUpAnalytics() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        gtag('config', 'UA-75609499-1', {
          page_path: event.urlAfterRedirects,
        });
      });
  }
}
