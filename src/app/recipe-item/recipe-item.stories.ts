import { Meta, Story } from '@storybook/angular';

import { RecipeItemComponent } from './recipe-item.component';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'RecipeItemComponent',
  component: RecipeItemComponent,
} as Meta;

export const Default: Story = () => ({
  props: {
    label: 'RecipeItemComponent',
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
