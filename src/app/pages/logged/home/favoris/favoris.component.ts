import { Component } from '@angular/core';
import { LoginService } from '../../../../shared/services/login.service';
import { CatService } from '../../../../shared/services/cat.service';
import { Router } from '@angular/router';
import { APIURLWEB } from "../../../../../environments/environment";

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.scss']
})
export class FavorisComponent {
  catName: string = "";
  catAge: number = 0;
  catLocalisation: string = "";
  cats: any[] = [];
  CatsExists: boolean = false;
  fav: boolean = true;
  apiUrl = APIURLWEB;

  constructor(private LoginService: LoginService, private CatService: CatService, private router: Router) { }

  ngOnInit(): void {
    this.getCatFav();
  }

  //recuperer les chats qui sont nouveaux
  async getCatFav() {
    this.LoginService.allFavoris().then((response) => {
      if (!response.message) {
        this.CatsExists = true;
      }
    });
  }

  //renvoyer vers la page du chat
  catPage(term: number): void {
    console.log('Recherche pour', term);
    this.router.navigate(['/cat'], { queryParams: { query: term } });
  }

  //recuperer le nombre de personnes qui ont mis le chat en favoris
  async getCount() {
    const response = await this.LoginService.countForCat({ catTab: this.cats });
    this.cats.forEach(cat => {
      const catId = cat.id;
      cat.count = response[catId];
    });
  }

}
