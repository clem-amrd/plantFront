import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent} from "./pages/welcome/welcome.component";
import { HomeComponent } from './pages/logged/home/home.component';
import { ProfilComponent } from './pages/logged/profil/profil.component';
import { LoginComponent } from './pages/welcome/login/login.component';
import { RegisterComponent } from './pages/welcome/register/register.component';
import { authGuard } from "./shared/guards/auth.guard";
import { SearchPageComponent } from './pages/logged/search-page/search-page.component';
import { CatPageComponent } from './pages/logged/cat-page/cat-page.component';
import { LoggedComponent } from './pages/logged/logged.component';
import { AllFavorisComponent } from './pages/logged/profil/all-favoris/all-favoris.component';
import { MyDataComponent } from './pages/logged/profil/my-data/my-data.component';
import { MyInformationsComponent } from './pages/logged/profil/my-informations/my-informations.component';
import { MyAdoptionsComponent } from './pages/logged/profil/my-adoptions/my-adoptions.component';
import {QuestionProfilComponent} from "./pages/welcome/register/question-profil/question-profil.component";
import {QuestionPotagerComponent} from "./pages/welcome/register/question-potager/question-potager.component";
import {QuestionPlanteComponent} from "./pages/welcome/register/question-plante/question-plante.component";
import {RecommandationComponent} from "./pages/recommandation/recommandation.component";
import {CalendarComponent} from "./pages/logged/calendar/calendar.component";

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  {path:'questionProfil', component: QuestionProfilComponent, canActivate: [authGuard]},
  { path:'questionPotager', component: QuestionPotagerComponent, canActivate: [authGuard]},
  { path: 'questionPlante', component: QuestionPlanteComponent, canActivate: [authGuard] },

  {
    path: '', component: LoggedComponent, canActivate: [authGuard],
    children: [

      {path: 'home', component: HomeComponent},
      {path: 'search', component: SearchPageComponent},
      {path: 'calendar', component: CalendarComponent},
      {path: 'profil', component: ProfilComponent},
      {path: 'favoris', component: AllFavorisComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]
  },
  {path: 'plant', component: CatPageComponent, canActivate: [authGuard]},
  { path: 'recommandation', component: RecommandationComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
