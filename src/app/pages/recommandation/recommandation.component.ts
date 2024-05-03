import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {LoginService} from "../../shared/services/login.service";
import {APIURLWEB} from "../../../environments/environment";


interface Plant {
 id: number;
 name: string;
 imageUrl: string;
 // Ajoutez d'autres propriétés que chaque plante doit avoir
}


@Component({
 selector: 'app-recommandation',
 templateUrl: './recommandation.component.html',
 styleUrls: ['./recommandation.component.scss']
})
export class RecommandationComponent {
 searchTerm: string = '';
 plants: any[] = [];
 apiUrl = APIURLWEB;


 constructor(private router: Router, private location: Location, private LoginService: LoginService) { }
 ngOnInit(): void {
   this.loadRecommendations();
 }


 loadRecommendations(): void {
   this.LoginService.getRecommandation().then(data => {
     this.plants = data.map((plant: Plant) => ({
       ...plant,
       isInGarden: localStorage.getItem(`plant-${plant.id}`) === 'true'
     }));
     console.log('Recommandations chargées', this.plants);
   }).catch(error => {
     console.error('Erreur lors du chargement des recommandations', error);
   });
 }


 addPlantToGarden(plantId: number): void {
   this.LoginService.addPlante(plantId).then(response => {
     console.log('Plant added successfully:', response);
     localStorage.setItem(`plant-${plantId}`, 'true');  // Sauvegarde de l'état "dans le jardin"
     this.updatePlantStatus(plantId, true);
   }).catch(error => {
     console.error('Error adding plant:', error);
   });
 }


 deletePlantToGarden(plantId: number): void {
   this.LoginService.deletePlante(plantId).then(response => {
     console.log('Plant deleted successfully:', response);
     localStorage.removeItem(`plant-${plantId}`);  // Suppression de l'état "dans le jardin"
     this.updatePlantStatus(plantId, false);
   }).catch(error => {
     console.error('Error deleting plant:', error);
   });
 }


 updatePlantStatus(plantId: number, isInGarden: boolean): void {
   const index = this.plants.findIndex(p => p.id === plantId);
   if (index !== -1) {
     this.plants[index].isInGarden = isInGarden;
     this.plants = [...this.plants]; // Crée une nouvelle référence pour l'array pour forcer le change detection
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

