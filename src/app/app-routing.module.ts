import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/it/ricette', pathMatch: 'full' },
  {
    path: 'it/ricette',
    children: [
      {
        path: '',
        component: RecipesListComponent,
      },
      {
        path: ':pageNumber',
        component: RecipesListComponent,
      },
      {
        path: ':category/:id',
        component: RecipeDetailComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/it/ricette', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
