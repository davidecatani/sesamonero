import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

import { Recipe } from '../models/recipe.model';
import * as fromApp from '../store/app.reducer';
import { slugify } from '../utils';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  public recipe: Recipe;
  public id: string;
  public imageSrc: string;
  public currentPage: number;
  private subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subs = [
      ...this.subs,
      this.store.select('general').subscribe((data) => {
        this.currentPage = data.currentPage ? data.currentPage : 1;
      }),
      this.route.params
        .pipe(
          map((params) => {
            return params['id'];
          }),
          switchMap((id) => {
            this.id = id ? id : '1';
            return this.store.select('recipes');
          }),
          map((recipeState) => {
            return recipeState.recipes.find(
              (recipe) => slugify(recipe.title) === this.id
            );
          })
        )
        .subscribe((recipe) => {
          this.recipe = recipe;
          if (recipe) {
            this.imageSrc = `/assets/images/${encodeURIComponent(
              recipe.imageName
            )}`;
          }
        }),
    ];
  }
  back(): void {
    this.router.navigate([`/it/ricette/${this.currentPage}`]);
  }
  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
