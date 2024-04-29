import { Component } from '@angular/core';
import { LoginService } from '../../../../shared/services/login.service';
import { CatService } from '../../../../shared/services/cat.service';
import { Router } from '@angular/router';
import { Cat } from '../../../../shared/model/cat';

@Component({
  selector: 'app-urgent',
  templateUrl: './urgent.component.html',
  styleUrls: ['./urgent.component.scss'],
})
export class UrgentComponent {
  catName: string = "";
  catAge: number = 0;
  catLocalisation: string = "";
  CatsExists: boolean = false;
  cats: Cat[] = [];

  constructor(private LoginService: LoginService, private CatService: CatService, private router: Router) { }

  ngOnInit(): void {
    this.getCatUrgent();
  }

  //recuperer les chats qui sont urgents
  async getCatUrgent() {
    this.LoginService.catUrgent().then((response) => {
      if (!response.message) {
        this.CatsExists = true;
        this.cats = this.CatService.getCat(response);
        this.getCount();
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
