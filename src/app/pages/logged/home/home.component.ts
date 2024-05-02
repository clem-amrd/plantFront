import {Component, ViewChild, AfterContentChecked, OnInit} from '@angular/core';
import { LoginService } from '../../../shared/services/login.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { APIURLWEB } from "../../../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  data: any = {};
  userAvatarUrl: any;
  searchTerm: string = '';
  action: any;
  noCatsAvailable: boolean = false;
  dayName: string;
  fullDate: string;
  myPlants: any[] = [];
  apiUrl = APIURLWEB;

   constructor(private LoginService: LoginService, private router: Router, private datePipe: DatePipe) {
     const today = new Date();
     this.dayName = today.toLocaleDateString('fr-FR', { weekday: 'long' });
     this.fullDate = today.toLocaleDateString('fr-FR', {
       year: 'numeric',
       month: 'long',
       day: 'numeric'
     });
   }

  ngOnInit(): void {
    this.getUserInfo();
    this.loadMyPlants();
  }

  get isProfilePage(): boolean {
    return this.router.url === '/profil';
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

  loadMyPlants(): void {
    this.LoginService.showPlante().then(plants => {
      this.myPlants = plants;
    }).catch(error => {
      console.error('Error fetching my plants:', error);
    });
  }

  catPage(term: number): void {
    console.log('Recherche pour', term);
    this.router.navigate(['/cat'], { queryParams: { query: term } });
  }

  //rechercher un chat
  handleSearch(term: string): void {
    console.log('Recherche pour', term);
    this.router.navigate(['/search'], { queryParams: { query: term } });
  }

}
