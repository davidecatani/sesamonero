import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';

import { Recipe } from '../models/recipe.model';

import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getRemoteImages, slugify } from '../utils';

firebase.initializeApp(environment.firebase);

const storage = getStorage();
const listRef = ref(storage, 'images');

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
  host: { class: ' col-12 col-sm-4 col-lg-3 d-flex' },
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  public imageUrl: string;
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
