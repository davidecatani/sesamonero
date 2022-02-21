import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit, OnDestroy, AfterViewInit {
  public isLoading = true;
  public recipes: Recipe[];
  public fullRecipes: Recipe[];
  public pagedRecipes: Recipe[];
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
    this.searchQuery = '';
  }

  ngOnInit() {
    this.formInit();
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
          this.isLoading = false;
          this.recipes = updatedRecipes;
          this.fullRecipes = updatedRecipes;
          this.navigate();
        }),
    ];
    this.searchForm
      .get('searchInput')
      .valueChanges.subscribe((selectedValue) => {
        const re = new RegExp(selectedValue, 'i');
        this.recipes = this.fullRecipes.filter(
          (recipe) =>
            recipe.title.match(re) ||
            recipe.ingredients.some((ingredient) =>
              ingredient.ingredient.match(re)
            )
        );
        this.navigate();
      });
  }
  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
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
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
