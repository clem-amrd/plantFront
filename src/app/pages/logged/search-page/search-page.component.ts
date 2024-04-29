import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { LoginService } from '../../../shared/services/login.service';
import { CatService } from '../../../shared/services/cat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Localisation } from '../../../shared/model/localisation';
import { Cat } from '../../../shared/model/cat';
import {APIURLWEB} from "../../../../environments/environment";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
  searchTerm: string = '';
  action: any;
  cats: Cat[] = [];
  number: number = -1;
  data: any = {};
  filterForm: FormGroup;
  departements: Localisation[] = [];
  responseMessage: string | null = null;
  apiUrl = APIURLWEB;
  filtersVisible: boolean = false;
  isOpen: boolean = false;

  constructor(private LoginService: LoginService, private fb: FormBuilder, private CatService: CatService, private route: ActivatedRoute, private router: Router) {
    this.filterForm = this.fb.group({
      ageMin: ['0', [Validators.min(0), Validators.max(25)]],
      ageMax: ['25', [Validators.min(0), Validators.max(25)]],
      sex: ['none', [Validators.maxLength(255)]],
      localisation: ['none'],
      urgence: ['none']
    });
  }

  ngOnInit() {
    this.Localisation();
    this.route.queryParams.subscribe(params => {
      if ('query' in params) {
        const searchQuery = params['query'];
        console.log('query:', searchQuery);
        this.searchTerm = searchQuery;
      } else {
        console.log('pas de query');
      }
    });
    this.handleSearch(this.searchTerm);
  }

  //recuperer tout les departements
  Localisation() {
    this.LoginService.allDepartement()
      .then(response => {
        console.log("tous les departements: ", response);
        this.departements = response;
        console.log(this.departements)
        this.departements.forEach((departement: any) => {
          console.log(typeof departement, departement.id);
        });
      })
      .catch(error => {
        console.error('une erreur s\'est produite', error);
      });
  }

  onSubmit() {
    console.log(this.filterForm.value);
  }

  //rechercher un chat
  async handleSearch(term: string) {
    console.log('Recherche pour', term);
    this.data.search = term;
    this.data.ageMin = this.filterForm.get('ageMin')?.value;
    this.data.ageMax = this.filterForm.get('ageMax')?.value;
    if (this.filterForm.get('sex')?.value !== "none") {
      this.data.sex = this.filterForm.get('sex')?.value;
    } else {
      delete this.data.sex;
    }
    if (this.filterForm.get('localisation')?.value !== "none") {
      this.data.localisation_id = this.filterForm.get('localisation')?.value;
    } else {
      delete this.data.localisation_id;
    }
    if (this.filterForm.get('urgence')?.value !== "none") {
      this.data.urgence = this.filterForm.get('urgence')?.value;
    }
    else {
      delete this.data.urgence;
    }
    console.log("data: ", this.data)
    this.LoginService.search(this.data)
      .then(async response => {
        if (response.message) {
          console.log(response.message);
          this.responseMessage = response.message;
          this.number = 0;
          this.cats = [];
        } else {
          this.responseMessage = null;
          this.cats = response;
          console.log(this.cats);
          this.number = this.cats.length;
          console.log(this.cats);
          for (let cat of response) {
            if (cat.photo !== "/storage/Image/") {
              cat.photo = this.apiUrl + cat.photo;
            } else {
              cat.photo = this.apiUrl + "/storage/Image/inconnu.jpg";
            }
          }
        }
        this.getCount();
      })
      .catch(error => {
        console.error('une erreur s\'est produite', error);
      });
  }

  //renvoyer vers la page du chat
  catPage(id: number): void {
    this.router.navigate(['/cat'], { queryParams: { query: id } });
  }

  //recuperer le nombre de personnes qui ont mis en favoris le chat
  async getCount() {
    const response = await this.LoginService.countForCat({catTab: this.cats});
    this.cats.forEach(cat => {
      const catId = cat.id;
      cat.count = response[catId];
    });
  }

  //faire apparaitre les filtres
  showFilters(): void {
    this.filtersVisible = !this.filtersVisible;
    if(this.isOpen == false){
    this.isOpen = true;
  }
    else{
      this.isOpen = false;
    }
  }
}
