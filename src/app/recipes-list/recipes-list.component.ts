import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[];
  public pagedRecipes: Recipe[];
  public page: number;
  public pageSize = 10;
  public total = 10000;
  private subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.page = this.route.snapshot.paramMap.get('pageNumber')
      ? +this.route.snapshot.paramMap.get('pageNumber')
      : 1;

    this.subs = [
      ...this.subs,
      this.route.params.subscribe((params) => {
        this.page = params['pageNumber'] ? +params['pageNumber'] : 1;
        this.navigate();
      }),
      this.store
        .select('recipes')
        .pipe(map((recipesState) => recipesState.recipes))
        .subscribe((updatedRecipes: Recipe[]) => {
          this.recipes = updatedRecipes;
          this.navigate();
        }),
    ];
  }

  navigate() {
    this.pagedRecipes = this.recipes?.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
    this.router.navigate([`/recipes/${this.page}`], { relativeTo: this.route });
  }

  onPageChange(event) {
    this.router.navigate([`../${this.page}`], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
