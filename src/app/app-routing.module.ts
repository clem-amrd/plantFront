import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/logged/home/home.component';
import { ProfilComponent } from './pages/logged/profil/profil.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from "./shared/guards/auth.guard";
import { SearchPageComponent } from './pages/logged/search-page/search-page.component';
import { CatPageComponent } from './pages/logged/cat-page/cat-page.component';
import { LoggedComponent } from './pages/logged/logged.component';
import { MyCatsComponent } from './pages/logged/profil/my-cats/my-cats.component';
import { AllFavorisComponent } from './pages/logged/profil/all-favoris/all-favoris.component';
import { AddCatComponent } from './pages/logged/profil/my-cats/add-cat/add-cat.component';
import { MyDataComponent } from './pages/logged/profil/my-data/my-data.component';
import { MyInformationsComponent } from './pages/logged/profil/my-informations/my-informations.component';
import { EditPhotosComponent } from './pages/logged/profil/my-cats/edit-photos/edit-photos.component';
import { MyAdoptionsComponent } from './pages/logged/profil/my-adoptions/my-adoptions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  {
    path: '', component: LoggedComponent, canActivate: [authGuard],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'search', component: SearchPageComponent},
      {path: 'profil', component: ProfilComponent},
      {path: 'meschats', component: MyCatsComponent},
      {path: 'favoris', component: AllFavorisComponent},
      {path: 'myInfos', component: MyInformationsComponent},
      {path: 'editPhotos', component: EditPhotosComponent},
      {path: 'adoptions', component: MyAdoptionsComponent},
      {path: 'myInformations', component: MyDataComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]
  },
  {path: 'cat', component: CatPageComponent, canActivate: [authGuard]},
  {path: 'add', component: AddCatComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
