import { Component } from '@angular/core';
import { LoginService } from '../../../../shared/services/login.service';
import { Router } from '@angular/router';
import { Cat } from '../../../../shared/model/cat';
import {APIURLWEB} from "../../../../../environments/environment";

@Component({
  selector: 'app-all-favoris',
  templateUrl: './all-favoris.component.html',
  styleUrls: ['./all-favoris.component.scss']
})
export class AllFavorisComponent {
  constructor(private LoginService: LoginService, private router: Router) { }

  data: Cat[] = [];
  apiUrl = APIURLWEB;
  noCats: boolean = true;

  ngOnInit() {
    this.LoginService.allFavoris()
      .then(response => {
        if(!response.message){
          this.noCats = false;
        for (let cat of response) {
          if (cat.photo !== "/storage/Image/") {
            cat.photo = this.apiUrl + cat.photo;
          } else {
            cat.photo = this.apiUrl + "/storage/Image/inconnu.jpg";
          }
        }
        this.data = response;
        console.log(this.data);
        this.getCount();
      }
      });
  }

  //renvoyer vers la page du chat
  catPage(id: number): void {
    this.router.navigate(['/cat'], { queryParams: { query: id } });
  }

  //recuperer le nombre de personnes qui ont mis en favoris le chat
  async getCount() {
    const response = await this.LoginService.countForCat({catTab: this.data});
    this.data.forEach(cat => {
      const catId = cat.id;
      cat.count = response[catId];
    });
  }

}
