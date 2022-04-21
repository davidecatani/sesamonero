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

const Template: Story = (args: RecipeItemComponent) => ({
  props: {
    label: 'RecipeItemComponent',
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  recipe: {
    category: 'Frutta e dolci',
    title: 'Cheese cake',
    imageName: 'Cheese_Cake.jpg',
  },
};
