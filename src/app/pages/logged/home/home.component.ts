import { Component, ViewChild, AfterContentChecked  } from '@angular/core';
import { LoginService } from '../../../shared/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  data: any = {};
  userAvatarUrl: any;
  searchTerm: string = '';
  action: any;
  noCatsAvailable: boolean = false;

   constructor(private LoginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  //recuperer les informations de l'user connecté
  getUserInfo(): void {
    this.LoginService.infoUser()
      .then(response => {
        this.data = response;
      })
      .catch(error => {
        console.error('An error occurred while fetching user info:', error);
      });
  }

  //rechercher un chat
  handleSearch(term: string): void {
    console.log('Recherche pour', term);
    this.router.navigate(['/search'], { queryParams: { query: term } });
  }

}