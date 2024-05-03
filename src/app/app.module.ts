import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/logged/home/home.component';
import { LoggedComponent } from './pages/logged/logged.component';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/welcome/login/login.component';
import { RegisterComponent } from './pages/welcome/register/register.component';
import { CatComponent } from './shared/layout/cat/cat.component';
import { SearchComponent } from './shared/layout/search/search.component';
import { ProfileComponent } from './shared/layout/profile/profile.component';
import { SearchPageComponent } from './pages/logged/search-page/search-page.component';
import { FiltersComponent } from './pages/logged/search-page/filters/filters.component';
import { CatPageComponent } from './pages/logged/cat-page/cat-page.component';
import { UserComponent } from './pages/logged/home/user/user.component';
import { FavorisComponent } from './pages/logged/home/favoris/favoris.component';
import { ProfilComponent } from './pages/logged/profil/profil.component';
import { AllFavorisComponent } from './pages/logged/profil/all-favoris/all-favoris.component';
import { MyDataComponent } from './pages/logged/profil/my-data/my-data.component';
import { MyInformationsComponent } from './pages/logged/profil/my-informations/my-informations.component';
import { MyAdoptionsComponent } from './pages/logged/profil/my-adoptions/my-adoptions.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { QuestionProfilComponent } from './pages/welcome/register/question-profil/question-profil.component';
import { QuestionPotagerComponent } from './pages/welcome/register/question-potager/question-potager.component';
import { QuestionPlanteComponent } from './pages/welcome/register/question-plante/question-plante.component';
import { RecommandationComponent } from './pages/recommandation/recommandation.component';
import { CalendarComponent } from './pages/logged/calendar/calendar.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoggedComponent,
    LoginComponent,
    RegisterComponent,
    CatComponent,
    SearchComponent,
    SearchPageComponent,
    FiltersComponent,
    CatPageComponent,
    UserComponent,
    FavorisComponent,
    ProfilComponent,
    AllFavorisComponent,
    MyDataComponent,
    MyInformationsComponent,
    MyAdoptionsComponent,
    WelcomeComponent,
    QuestionProfilComponent,
    QuestionPotagerComponent,
    QuestionPlanteComponent,
    RecommandationComponent,
    CalendarComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
