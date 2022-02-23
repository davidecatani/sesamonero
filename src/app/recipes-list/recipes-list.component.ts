import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription, take } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import * as fromApp from '../store/app.reducer';
import {
  SetCurrentCategory,
  SetCurrentSearch,
  SetPage,
} from '../store/general/general.actions';
import { slugify } from '../utils';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public recipes: Recipe[] = [];
  public fullRecipes: Recipe[] = [];
  public pagedRecipes: Recipe[] = [];
  public categories: string[];
  public selectedCategory: string;
  public page: number;
  public pageSize = 12;
  public total = 10000;
  public searchForm: FormGroup;
  public searchQuery: string;
  private subs: Subscription[] = [];

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
    this.page = 1;
  }

  ngOnInit() {
    this.formInit();

    this.store
      .select('general')
      .pipe(take(1))
      .subscribe((general) => {
        this.searchQuery = general.currentSearch;
        this.page = general.currentPage ? general.currentPage : 1;
        this.searchForm.setValue({ searchInput: this.searchQuery });
        this.recipesFilter();
      });

    this.subs = [
      ...this.subs,
      this.route.params.subscribe((params) => {
        this.selectedCategory = params['category'] ? params['category'] : '';
        this.store.dispatch(new SetCurrentCategory(this.selectedCategory));
        if (this.selectedCategory) {
          this.recipesFilter();
        }
        this.getCurrentPagedRecipes();
      }),
      this.store
        .select('recipes')
        .pipe(map((recipesState) => recipesState.recipes))
        .subscribe((updatedRecipes: Recipe[]) => {
          if (updatedRecipes.length !== this.fullRecipes.length) {
            this.categories = updatedRecipes
              .map((item) => item.category)
              .filter((value, index, self) => {
                return self.indexOf(value) === index;
              });
            this.isLoading = false;
            this.fullRecipes = updatedRecipes;
            this.recipesFilter();
          }
        }),
    ];
    this.searchForm
      .get('searchInput')
      .valueChanges.subscribe((selectedValue) => {
        this.store.dispatch(new SetCurrentSearch(selectedValue));
        this.searchQuery = selectedValue;
        this.recipesFilter();
      });
  }

  recipesFilter(): void {
    const re = new RegExp(this.searchQuery, 'i');
    this.recipes = this.fullRecipes;
    if (Boolean(this.searchQuery) || Boolean(this.selectedCategory)) {
      this.recipes = this.fullRecipes.filter(
        (recipe) =>
          (recipe.title.match(re) ||
            recipe.ingredients.some((ingredient) =>
              ingredient.ingredient.match(re)
            )) &&
          (slugify(recipe.category) === this.selectedCategory ||
            !Boolean(this.selectedCategory))
      );
    } else {
      this.recipes = this.fullRecipes;
    }
    this.getCurrentPagedRecipes();
  }

  getCurrentPagedRecipes() {
    this.pagedRecipes = this.recipes?.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
    window.scrollTo(0, 0);
  }

  formInit(): void {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(this.searchQuery),
    });
  }

  onPageChange(event) {
    this.page = event;
    this.getCurrentPagedRecipes();
    this.store.dispatch(new SetPage(this.page));
  }

  onCategorySelect(category: string): void {
    this.selectedCategory =
      slugify(category) === this.selectedCategory ? '' : slugify(category);
    this.store.dispatch(new SetCurrentCategory(this.selectedCategory));
    this.router.navigate([`/it/ricette/${slugify(this.selectedCategory)}`], {
      relativeTo: this.route,
    });
    this.recipesFilter();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  categoryComparison(category: string, selectedCategory: string) {
    return slugify(category) === slugify(selectedCategory) ? 'active' : '';
  }
}
