import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
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

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit, OnDestroy, AfterViewInit {
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
    // this.searchQuery = '';
  }

  ngOnInit() {
    this.formInit();
    this.recipesFilter();
    this.page = this.route.snapshot.paramMap.get('pageNumber')
      ? +this.route.snapshot.paramMap.get('pageNumber')
      : 1;

    this.store.dispatch(new SetPage(this.page));

    this.store
      .select('general')
      .pipe(take(1))
      .subscribe((general) => {
        this.searchQuery = general.currentSearch;
        this.searchForm.setValue({ searchInput: this.searchQuery });
        this.selectedCategory = general.currentCategory;
        this.recipesFilter();
      });

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
          if (updatedRecipes.length !== this.fullRecipes.length) {
            this.categories = updatedRecipes
              .map((item) => item.category)
              .filter((value, index, self) => {
                return self.indexOf(value) === index;
              });
            this.isLoading = false;
            // this.recipes = updatedRecipes;
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
  ngAfterViewInit() {
    // this.searchInput.nativeElement.focus();
  }

  recipesFilter(): void {
    const re = new RegExp(this.searchQuery, 'i');
    if (Boolean(this.searchQuery) || Boolean(this.selectedCategory)) {
      this.recipes = this.fullRecipes.filter(
        (recipe) =>
          (recipe.title.match(re) ||
            recipe.ingredients.some((ingredient) =>
              ingredient.ingredient.match(re)
            )) &&
          recipe.category === this.selectedCategory
      );
    } else {
      this.recipes = this.fullRecipes;
    }
    this.navigate();
  }

  navigate() {
    this.pagedRecipes = this.recipes?.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
    this.router.navigate([`/recipes/${this.page}`], { relativeTo: this.route });
    window.scrollTo(0, 0);
  }

  formInit(): void {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(this.searchQuery),
    });
  }

  onPageChange(event) {
    this.router.navigate([`../${this.page}`], { relativeTo: this.route });
    this.store.dispatch(new SetPage(this.page));
  }

  onCategorySelect(category: string): void {
    this.selectedCategory =
      category === this.selectedCategory ? null : category;
    console.log({ category, selectedCategory: this.selectedCategory });
    this.store.dispatch(new SetCurrentCategory(this.selectedCategory));
    this.recipesFilter();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
