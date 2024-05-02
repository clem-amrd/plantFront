import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {LoginService} from "../../shared/services/login.service";

@Component({
  selector: 'app-recommandation',
  templateUrl: './recommandation.component.html',
  styleUrls: ['./recommandation.component.scss']
})
export class RecommandationComponent {
  searchTerm: string = '';
  plants: any[] = [];

  constructor(private router: Router, private location: Location, private LoginService: LoginService) { }
  ngOnInit(): void {
    this.loadRecommendations();
  }

  loadRecommendations(): void {
    this.LoginService.getRecommandation().then(data => {
      this.plants = data;
      console.log('Recommandations chargées', data);
    }).catch(error => {
      console.error('Erreur lors du chargement des recommandations', error);
    });
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
    const plant = this.plants.find(p => p.id === plantId);
    if (plant) {
      plant.isInGarden = isInGarden;
      // Force Angular to detect changes
      this.plants = [...this.plants];
    }
  }


  handleSearch(term: string): void {
    console.log('Recherche pour', term);
    this.router.navigate(['/search'], { queryParams: { query: term } });
  }

  // retourner en arrière
  back() {
    this.location.back();
  }
}
