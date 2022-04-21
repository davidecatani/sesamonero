import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from '../models/recipe.model';
import { getRemoteImages, slugify } from '../utils';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
  host: { class: ' col-12 col-sm-4 col-lg-3 d-flex' },
})
export class RecipeItemComponent implements OnInit {
  @Input() public recipe: Recipe;
  public imageSrc: string;
  public detailUrl: string;

  constructor() {}

  ngOnInit() {
    this.detailUrl = `/it/ricette/${slugify(this.recipe.category)}/${slugify(
      this.recipe.title
    )}`;
    this.imageSrc = getRemoteImages(this.recipe.imageName);
  }
}
