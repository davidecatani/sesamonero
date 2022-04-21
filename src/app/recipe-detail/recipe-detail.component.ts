import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, takeWhile } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

import { Recipe } from '../models/recipe.model';
import * as fromApp from '../store/app.reducer';
import { getRemoteImages, slugify } from '../utils';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  public recipe: Recipe;
  public id: string;
  public currentCategory: string;
  private alive = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private meta: Meta,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.store
      .select('general')
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.currentCategory = data.currentCategory ? data.currentCategory : '';
      });
    this.route.params
      .pipe(
        takeWhile(() => this.alive),
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
        }),
        filter((recipe) => {
          return Boolean(recipe);
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
        if (recipe.title) {
          this.titleService.setTitle(`${this.recipe.title} | Sesamonero`);
          this.meta.addTags([
            { name: 'description', content: this.recipe.intro },
            { name: 'og:site_name', content: 'Sesamonero' },
            { name: 'og:type', content: 'food' },
            {
              name: 'og:url',
              content: `${environment.siteDomain}/it/ricette/${slugify(
                this.currentCategory
              )}/${slugify(this.recipe.title)}`,
            },
            { name: 'og:title', content: this.recipe.title },
            { name: 'og:description', content: this.recipe.description },
            {
              name: 'og:image',
              content: `${getRemoteImages(this.recipe.imageName)}`,
            },
            {
              name: 'og:updated_time',
              content: this.recipe.date,
            },
          ]);
        }
      });
  }
  back(): void {
    this.router.navigate([`/it/ricette/${slugify(this.currentCategory)}`]);
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
