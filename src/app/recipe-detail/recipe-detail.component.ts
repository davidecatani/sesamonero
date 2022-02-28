import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
  public imageSrc: string;
  public currentCategory: string;
  private subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private meta: Meta,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.subs = [
      ...this.subs,
      this.store.select('general').subscribe((data) => {
        this.currentCategory = data.currentCategory ? data.currentCategory : '';
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
            this.imageSrc = getRemoteImages(recipe.imageName);
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
                content: `${this.imageSrc}`,
              },
              {
                name: 'og:updated_time',
                content: this.recipe.date,
              },
            ]);
          }
        }),
    ];
  }
  back(): void {
    this.router.navigate([`/it/ricette/${slugify(this.currentCategory)}`]);
  }
  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
