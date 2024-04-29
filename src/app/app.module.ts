import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/logged/home/home.component';
import { LoggedComponent } from './pages/logged/logged.component';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CatComponent } from './shared/layout/cat/cat.component';
import { UrgentComponent } from './pages/logged/home/urgent/urgent.component';
import { NewComponent } from './pages/logged/home/new/new.component';
import { SearchComponent } from './shared/layout/search/search.component';
import { SearchPageComponent } from './pages/logged/search-page/search-page.component';
import { FiltersComponent } from './pages/logged/search-page/filters/filters.component';
import { CatPageComponent } from './pages/logged/cat-page/cat-page.component';
import { UserComponent } from './pages/logged/home/user/user.component';
import { FavorisComponent } from './pages/logged/home/favoris/favoris.component';
import { ProfilComponent } from './pages/logged/profil/profil.component';
import { AllFavorisComponent } from './pages/logged/profil/all-favoris/all-favoris.component';
import { MyCatsComponent } from './pages/logged/profil/my-cats/my-cats.component';
import { EditCatComponent } from './pages/logged/profil/my-cats/edit-cat/edit-cat.component';
import { AddCatComponent } from './pages/logged/profil/my-cats/add-cat/add-cat.component';
import { AddPhotosComponent } from './pages/logged/profil/my-cats/add-cat/add-photos/add-photos.component';
import { MyDataComponent } from './pages/logged/profil/my-data/my-data.component';
import { EditPhotosComponent } from './pages/logged/profil/my-cats/edit-photos/edit-photos.component';
import { MyInformationsComponent } from './pages/logged/profil/my-informations/my-informations.component';
import { MyAdoptionsComponent } from './pages/logged/profil/my-adoptions/my-adoptions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoggedComponent,
    LoginComponent,
    RegisterComponent,
    CatComponent,
    UrgentComponent,
    NewComponent,
    SearchComponent,
    SearchPageComponent,
    FiltersComponent,
    CatPageComponent,
    UserComponent,
    FavorisComponent,
    ProfilComponent,
    AllFavorisComponent,
    MyCatsComponent,
    EditCatComponent,
    AddCatComponent,
    AddPhotosComponent,
    MyDataComponent,
    EditPhotosComponent,
    MyInformationsComponent,
    MyAdoptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
