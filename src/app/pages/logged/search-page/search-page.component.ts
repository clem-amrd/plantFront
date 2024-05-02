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
  cats: any[] = [];
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
      seedMonth: ['none'],
      fruitMonth: ['none'],
      fruit: ['none'],
      difficulty: ['none'],
      compatibility: ['none']
    });
  }

  ngOnInit() {
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
    console.log(this.filterForm.value);
  }

  addPlantToGarden(plantId: number): void {
    console.log(`Trying to add plant with ID: ${plantId}`);
    this.LoginService.addPlante(plantId).then(response => {
      console.log('Plant added successfully:', response);
      this.updatePlantStatus(plantId, true);
    }).catch(error => {
      console.error('Error adding plant:', error);
    });
  }

  deletePlantToGarden(plantId: number): void {
    console.log(`Trying to delete plant with ID: ${plantId}`);
    this.LoginService.deletePlante(plantId).then(response => {
      console.log('Plant deleted successfully:', response);
      this.updatePlantStatus(plantId, false);
    }).catch(error => {
      console.error('Error deleting plant:', error);
    });
  }

  updatePlantStatus(plantId: number, isInGarden: boolean): void {
    const plant = this.cats.find(p => p.id === plantId);
    if (plant) {
      plant.isInGarden = isInGarden;
      // Force Angular to detect changes
      this.cats = [...this.cats];
    }
  }

  onSubmit() {
    console.log(this.filterForm.value);
  }

  //rechercher un chat
  async handleSearch(term: string) {
    console.log('Recherche pour', term);
    this.data.search = term;
    if (this.filterForm.get('seedMonth')?.value !== "none") {
      this.data.seedMonth = this.filterForm.get('seedMonth')?.value;
    } else {
      delete this.data.seedMonth;
    }
    if (this.filterForm.get('fruitMonth')?.value !== "none") {
      this.data.fruitMonth = this.filterForm.get('fruitMonth')?.value;
    } else {
      delete this.data.fruitMonth;
    }
    if (this.filterForm.get('fruit')?.value !== "none") {
      this.data.fruit = this.filterForm.get('fruit')?.value;
    } else {
      delete this.data.fruit;
    }
    if (this.filterForm.get('difficulty')?.value !== "none") {
      this.data.difficulty = this.filterForm.get('difficulty')?.value;
    } else {
      delete this.data.difficulty;
    }
    if (this.filterForm.get('compatibility')?.value !== "none") {
      this.data.compatibility = this.filterForm.get('compatibility')?.value;
    }
    else {
      delete this.data.compatibility;
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
        }
        // this.getCount();
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
  // async getCount() {
  //   const response = await this.LoginService.countForCat({catTab: this.cats});
  //   this.cats.forEach(cat => {
  //     const catId = cat.id;
  //     cat.count = response[catId];
  //   });
  // }

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
