import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeEffects } from './store/recipes/recipe.effects';
import { environment } from 'src/environments/environment';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core.module';
import * as fromApp from './store/app.reducer';
import { Nl2brPipe } from './pipes/nl2br.pipe';
import { RemoveBracketsPipe } from './pipes/removeBrackets.pipe';

// import { initializeApp } from 'firebase/app';
@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    Nl2brPipe,
    RemoveBracketsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([RecipeEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
