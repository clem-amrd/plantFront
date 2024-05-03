import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  monthName: string;
  fullDate: string;
  days = [
    { date: '2', month: 'MAI', active: false },
    { date: '5', month: 'MAI', active: true },
    { date: '8', month: 'MAI', active: false },
    { date: '11', month: 'MAI', active: false },
    { date: '13', month: 'MAI', active: false }
  ];

  events = [
    { type: 'Météo', description: 'Planifier les jours d\'arrosage en fonction des prévisions', date: 'Jeudi 2 mai', active: false },
    { type: 'Plantation', description: 'Tomates, courgettes et poivrons', date: 'Dimanche 5 mai', active: true },
    { type: 'Plantation', description: 'Semis en pleine terre de carottes, radis, et laitues', date: 'Mercredi 8 mai', active: false },
    { type: 'Tuteurs', description: 'Installation de systèmes de tuteurs', date: 'Mardi 11 mai', active: false }
  ];

  constructor(private location: Location) {
    const today = new Date();
    this.monthName = today.toLocaleDateString('fr-FR', { month: 'long', year:'numeric' });
    this.fullDate = today.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

// retourner en arrière
  back() {
    this.location.back();
  }

}