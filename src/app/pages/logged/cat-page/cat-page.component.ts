import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../shared/services/login.service';
import { APIURLWEB } from "../../../../environments/environment";
import { Location } from '@angular/common';

@Component({
  selector: 'app-cat-page',
  templateUrl: './cat-page.component.html',
  styleUrls: ['./cat-page.component.scss']
})
export class CatPageComponent implements OnInit {
  searchTerm: number = 0;
  data: any = {};
  wateringDate: string = "";
  wateringPlant: number = 0;
  apiUrl = APIURLWEB;
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });
  sendAsk: boolean = false;
  statut: number = 0;
  user = this.LoginService.user;
  firstMonthSeed: string = '';
  firstMonthFruit: string = '';

  lastMonthSeed: string = '';
  lastMonthFruit: string = '';

  jsonStrSeed: any;
  jsonStrFruit: any;

  wateringPlantDate: Date | null = null;
  weekDays: { day: string, date: string }[] = [];

  constructor(private LoginService: LoginService, private route: ActivatedRoute, private location: Location) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if ('query' in params) {
        const searchQuery = params['query'];
        console.log('query:', searchQuery);
        this.searchTerm = searchQuery;
      } else {
        console.log('pas de query');
      }
    });
    this.user = await this.LoginService.userAuth();
    this.infoPlant();
    this.infoWatering();
  }

  //recuperer les informations du chat
  infoPlant() {
    this.LoginService.plantById(this.searchTerm)
      .then(async response => {
        console.log("toutes les infos: ", response);
        this.data = response;
        this.jsonStrSeed = response.seed_months;
        this.jsonStrFruit = response.fruit_months;
        console.log(this.jsonStrSeed, this.jsonStrFruit);
        this.firstMonthSeed = this.extractMonthsLast(this.firstMonthSeed, this.jsonStrSeed);
        this.lastMonthSeed = this.extractMonthsFirst(this.lastMonthSeed, this.jsonStrSeed);
        this.firstMonthFruit = this.extractMonthsLast(this.firstMonthFruit, this.jsonStrFruit);
        this.lastMonthFruit = this.extractMonthsFirst(this.lastMonthFruit, this.jsonStrFruit);
      })
      .catch(error => {
        console.error('une erreur s\'est produite', error);
      });
  }

  infoWatering() {
    this.LoginService.watering(this.searchTerm)
      .then(async response => {
        console.log("toutes les infos: ", response);
        if (response.wateringDate) {
          this.wateringDate = response.wateringDate;
          console.log("watering: ", this.wateringDate);
          this.formatDate(this.wateringDate);
          this.infoWateringPlant();
        }else{
          this.infoWateringPlant();
        }
      })
      .catch(error => {
        console.error('une erreur s\'est produite', error);
      });
  }

  infoWateringPlant() {
    this.LoginService.wateringPlant(this.searchTerm)
      .then(async response => {
        console.log("toutes les infos: ", response);
        if (response.watering) {
          this.wateringPlant = response.watering;
          console.log("wateringPlant: ", this.wateringPlant);
          this.wateringPlantDate = this.addDaysToDate(this.wateringDate, this.wateringPlant);
          this.setupWeekDays();
        }
      })
      .catch(error => {
        console.error('une erreur s\'est produite', error);
      });
  }

  formatDate(dateStr: string): void {
    const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const date = new Date(dateStr);
    const dayOfWeek = days[date.getDay()];
    console.log(`${dayOfWeek}, ${date.toLocaleDateString()}`);
  }

  addDaysToDate(dateStr: string, daysToAdd: number): Date {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + daysToAdd);
    return date;
  }

  setupWeekDays(): void {
    if (this.wateringPlantDate) {
      const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
      const today = this.wateringPlantDate.getDay(); // Jour de la semaine, 0 (dimanche) à 6 (samedi)
      const date = new Date(this.wateringPlantDate); // Utilisation de la date correcte

      // Régler date sur le lundi de la semaine courante
      console.log('Date initiale:', this.wateringPlantDate);
      date.setDate(this.wateringPlantDate.getDate() - (today === 0 ? 6 : today - 1));
      console.log('Date ajustée au début de la semaine:', date);

      // Créer le tableau de la semaine
      this.weekDays = days.map((day, index) => {
        const dayDate = new Date(date);  // Créer une copie pour éviter de muter la date originale
        dayDate.setDate(date.getDate() + index);
        // console.log(dayDate)
        return {
          day: day,
          date: dayDate.toLocaleDateString() // Formatte la date comme vous souhaitez l'afficher
        };
      });

      console.log('Jours de la semaine:', this.weekDays);

    }
  }

  isToday(dayDate: string): boolean {
    const todayDate = new Date().toLocaleDateString();
    return dayDate === todayDate;
  }
  isSameDay(dayDateString: string): boolean {
    if (this.wateringPlantDate) {
      const formattedDate = this.formatDate2(dayDateString);
      const dayDate = new Date(formattedDate);
      const plantDate = new Date(this.wateringPlantDate);
      return dayDate.setHours(0, 0, 0, 0) === plantDate.setHours(0, 0, 0, 0);
    } else {
      return false;
    }
  }
  
  formatDate2(dateStr: string): string {
    // Supposons que la date est dans le format DD/MM/YYYY
    const parts = dateStr.split('/');
    return `${parts[1]}/${parts[0]}/${parts[2]}`; // Change en MM/DD/YYYY
  }

  //retour
  back() {
    this.location.back();
  }

  //ajouter/supprimer le chat des favoris
  changeFavoris() {
    if (this.data.favoris == true) {
      console.log("il va être supp");
      this.LoginService.deleteFavoris(this.data.id)
        .then(response => {
          console.log("supprimé");
          this.data.favoris = false;
        })
        .catch(error => {
          console.error('une erreur s\'est produite', error);
        });
    } else if (this.data.favoris == false) {
      console.log("il va être add");
      this.LoginService.addFavoris(this.data.id)
        .then(response => {
          console.log("ajouté");
          this.data.favoris = true;
        })
        .catch(error => {
          console.error('une erreur s\'est produite', error);
        });
    }
  };

  get gridColumnSeed(): string {
    return `${this.firstMonthSeed} / ${this.lastMonthSeed}`;
  }

  get gridColumnFruit(): string {
    return `${this.firstMonthFruit} / ${this.lastMonthFruit}`;
  }

  extractMonthsFirst(firstMonth: string, jsonStr: any): string {
    const obj = JSON.parse(jsonStr);
    const monthsArray = obj.months.split(',');
    return firstMonth = monthsArray[0];
  }
  extractMonthsLast(lastMonth: string, jsonStr: any): string {
    const obj = JSON.parse(jsonStr);
    const monthsArray = obj.months.split(',');
    return lastMonth = monthsArray[monthsArray.length - 1];
  }

  dataLevel(data:number): number{
    if(0 <= data && data <= 45){
      return 30;
    }else if(45 < data && data <= 60){
      return 60;
    }else if(60 < data && data <= 100){
      return 100;
    }else{
      return 0;
    }
  }
}
