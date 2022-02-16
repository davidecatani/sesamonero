import { Component, Input, OnInit } from '@angular/core';
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';

import { Recipe } from '../models/recipe.model';

import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { slugify } from '../utils';

firebase.initializeApp(environment.firebase);

const storage = getStorage();
const listRef = ref(storage, 'images');

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  public imageUrl: string;
  public imageSrc: string;
  public detailUrl: string;

  constructor() {}

  ngOnInit() {
    this.detailUrl = `/recipes/detail/${slugify(this.recipe.title)}`;
    this.imageSrc = `/assets/images/${encodeURIComponent(
      this.recipe.imageName
    )}`;
    // console.log(this.detailUrl);
    // getDownloadURL(ref(storage, `images/${this.recipe.imageName}`))
    //   .then((url) => {
    //     // `url` is the download URL for 'images/stars.jpg'
    //     this.imageUrl = url;
    //     // This can be downloaded directly:
    //     const xhr = new XMLHttpRequest();
    //     xhr.responseType = 'blob';
    //     xhr.onload = (event) => {
    //       const blob = xhr.response;
    //     };
    //     xhr.open('GET', url);
    //     xhr.send();

    //     // Or inserted into an <img> element
    //     const img = document.getElementById('myimg');
    //     img.setAttribute('src', url);
    //   })
    //   .catch((error) => {
    //     // Handle any errors
    //   });
  }
}
