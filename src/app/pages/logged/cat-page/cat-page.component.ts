import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../shared/services/login.service';
import { APIURLWEB } from "../../../../environments/environment";
import { Location, getLocaleFirstDayOfWeek } from '@angular/common';

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

  firstDay: Date | null = null;
  lastDay: Date | null = null;
  firstDayString: string ="";
  lastDayString: string ="";

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
        this.firstMonthSeed = this.extractMonthsLast(this.jsonStrSeed);
        this.lastMonthSeed = this.extractMonthsFirst(this.jsonStrSeed);
        this.firstMonthFruit = this.extractMonthsLast(this.jsonStrFruit);
        this.lastMonthFruit = this.extractMonthsFirst(this.jsonStrFruit);
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
          console.log("wekdays: ", this.weekDays);
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
    console.log(dayOfWeek, date.toLocaleDateString());
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
  
      // Réglage de la date sur le lundi de la semaine courante
      date.setDate(this.wateringPlantDate.getDate() - (today === 0 ? 6 : today - 1));
  
      // Sauvegarder la date du premier jour de la semaine (lundi)
      this.firstDay = new Date(date);
  
      // Ajuster pour obtenir la date du dernier jour de la semaine (dimanche)
      date.setDate(this.firstDay.getDate() + 6);
  
      // Sauvegarder la date du dernier jour de la semaine (dimanche)
      this.lastDay = new Date(date);
  
      // Créer le tableau de la semaine
      this.weekDays = days.map((day, index) => {
        // Assurez-vous que firstDay n'est pas null avant de l'utiliser
        if (this.firstDay) {
          const dayDate = new Date(this.firstDay); // Utiliser la date du premier jour de la semaine
          dayDate.setDate(dayDate.getDate() + index);
          return {
            day: day,
            date: dayDate.getDate().toString().padStart(2, '0') // Renvoie le jour du mois, formaté pour toujours avoir deux chiffres
          };
        } else {
          return { day: day, date: "" }; // Gérer le cas où firstDay est null
        }
      });
      this.firstDayString = this.formaterDate(this.firstDay);
      this.lastDayString = this.formaterDate(this.lastDay);

      console.log('Premier jour de la semaine:', this.firstDay);
      console.log('Dernier jour de la semaine:', this.lastDay);
    }
  }

   formaterDate(date: Date): string {
    // Obtenir le jour et le mois de l'objet Date
    const jour = date.getDate();
    const mois = date.getMonth() + 1; // getMonth() renvoie un index basé sur 0, donc +1 pour avoir le numéro correct du mois

    // Formater le jour et le mois pour assurer deux chiffres (ex: '02' au lieu de '2')
    const jourFormatte = jour < 10 ? `0${jour}` : jour.toString();
    const moisFormatte = mois < 10 ? `0${mois}` : mois.toString();

    // Retourner le format demandé
    return `${jourFormatte}/${moisFormatte}`;
}

  isToday(dayDate: string): boolean {
    const todayDate = new Date().toLocaleDateString();
    return dayDate === todayDate;
  }
  isSameDay(day: string): boolean {
    if (this.wateringPlantDate) {
      // Supposons que `day` est une chaîne comme "01", "12", "31", etc.
      const dayOfMonth = parseInt(day); // Convertit la chaîne du jour en nombre
      const plantDate = new Date(this.wateringPlantDate); // Crée une copie de la date de plantation
  
      // Retourne vrai si le jour du mois correspond au jour de `wateringPlantDate`
      return plantDate.getDate() === dayOfMonth;
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

  extractMonthsFirst(jsonStr: string): string {
    const obj = JSON.parse(jsonStr);
    return obj.months[0]; // Renvoie directement le premier élément du tableau
}

extractMonthsLast(jsonStr: string): string {
    const obj = JSON.parse(jsonStr);
    return obj.months[obj.months.length - 1]; // Renvoie directement le dernier élément du tableau
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
