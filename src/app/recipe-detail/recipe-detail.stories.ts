import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { of } from 'rxjs';
import { GetRemoteImages } from '../pipes/getRemoteImages.pipe';
import { Nl2brPipe } from '../pipes/nl2br.pipe';
import { RemoveBracketsPipe } from '../pipes/removeBrackets.pipe';
import * as fromApp from '../store/app.reducer';

import { RecipeDetailComponent } from './recipe-detail.component';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'RecipeDetailComponent',
  component: RecipeDetailComponent,
  decorators: [
    moduleMetadata({
      imports: [StoreModule.forRoot(fromApp.appReducer)],
      declarations: [Nl2brPipe, RemoveBracketsPipe, GetRemoteImages],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'cheese-cake' }),
          },
        },
      ],
    }),
  ],
} as Meta;

class MockActivatedRoute {
  // here you can add your mock objects, like snapshot or parent or whatever
  // example:
  parent = {
    snapshot: { data: { title: 'myTitle ' } },
    routeConfig: { children: { filter: () => {} } },
  };
}

export const Default: Story = () => ({
  props: {
    label: 'RecipeDetailComponent',
    imageName: 'Cheese_Cake.jpg',
    recipe: {
      author: {
        email: 'dave.catani@gmail.com',
        id: '1',
        name: 'Davide Catani',
      },
      category: 'Frutta e dolci',
      cookingTime: '30 minuti',
      date: '2017-02-26 20:50:13',
      description:
        "Sciogliere il burro in un pentolino.\nTritare i biscotti e unire il tutto.\nVersare in una teglia e formare una base compatta e uniforme.\nFrullare il resto degli ingredienti e versarli sopra la base di biscotti.\nCuocere in forno per mezz'ora circa a 180° finchè non diventa solida.\nLasciar sfreddare e ricoprire di marmellata.\n",
      difficulty: 'facile',
      id: '240',
      imageName: 'Cheese_Cake.jpg',
      ingredients: [
        {
          ingredient: 'Mascarpone',
          quantity: '250',
          unityOfMeasure: 'gr',
        },
        {
          ingredient: 'Ricotta',
          quantity: '250',
          unityOfMeasure: 'gr',
        },
        {
          ingredient: 'Vanillina',
          quantity: '1',
          unityOfMeasure: 'bustina',
        },
        {
          ingredient: 'Zucchero',
          quantity: '80',
          unityOfMeasure: 'gr',
        },
        {
          ingredient: 'Uova',
          quantity: '3',
        },
        {
          ingredient: 'Marmellata',
          note: 'preferibilmente rossa',
          quantity: '1 e mezzo',
          unityOfMeasure: 'barattolo',
        },
        {
          ingredient: 'Biscotti',
          note: 'Tipo Rigoli Mulino Bianco',
          quantity: '240',
          unityOfMeasure: 'gr',
        },
        {
          ingredient: 'Farina',
          quantity: '1/5',
          unityOfMeasure: 'cucchiaio',
        },
        {
          ingredient: 'Burro',
          quantity: '125',
          unityOfMeasure: 'gr',
        },
      ],
      intro: 'Un dolce buonissimo, semplice e veloce da preparare.',
      portions: '6',
      preparationTime: '20 minuti',
      title: 'Cheese cake',
    },
  },
});
