import { Component } from '@angular/core';
import { LoginService } from '../../../../shared/services/login.service';
import { Router } from '@angular/router';
import {APIURLWEB} from "../../../../../environments/environment";
import { Location } from '@angular/common';

@Component({
  selector: 'app-all-favoris',
  templateUrl: './all-favoris.component.html',
  styleUrls: ['./all-favoris.component.scss']
})
export class AllFavorisComponent {
  constructor(private LoginService: LoginService, private router: Router, private location: Location) { }

  data: any[] = [];
  apiUrl = APIURLWEB;
  noCats: boolean = true;

  ngOnInit() {
    this.LoginService.allFavoris()
      .then(response => {
        this.data = response;
        // this.getCount();
      });
  }

    //retour
    back() {
      this.location.back();
    }

  //renvoyer vers la page du chat
  catPage(id: number): void {
    this.router.navigate(['/plant'], { queryParams: { query: id } });
  }

  //recuperer le nombre de personnes qui ont mis en favoris le chat
  // async getCount() {
  //   const response = await this.LoginService.countForCat({catTab: this.data});
  //   this.data.forEach(cat => {
  //     const catId = cat.id;
  //     cat.count = response[catId];
  //   });
  // }

}
