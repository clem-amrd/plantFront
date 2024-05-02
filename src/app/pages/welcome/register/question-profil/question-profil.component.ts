import { Component } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../../shared/services/login.service";
import {Router} from "@angular/router";
import{HttpHeaders} from "@angular/common/http";
import {Location} from "@angular/common";
import {User} from "../../../../shared/model/user";

@Component({
  selector: 'app-question-profil',
  templateUrl: './question-profil.component.html',
  styleUrls: ['./question-profil.component.scss']
})
export class QuestionProfilComponent {
userData: FormGroup;
  experienceLevels = [
    { value: 0, label: 'Débutant' },
    { value: 1, label: 'Intermédiaire' },
    { value: 2, label: 'Confirmé' },
    { value: 3, label: 'Expert' }
  ];
  habitatOption = [
    {value: 1, label: 'Jardin a même la terre'},
    {value: 2, label: 'Terrasse/Balcon'},
    {value: 3, label: 'Les deux'},
  ];


// initialiser les données
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private location: Location) {
    this.userData = this.formBuilder.group({
      experience: ['', Validators.required],
      habitat: ['', Validators.required],
    });
  }
  ngOnInit(): void {console.log(this.experienceLevels);}

  submit() {
    if (this.userData.valid) {
      this.loginService.saveQuestionnaire(this.userData.value).then(
        response => {
          console.log('Données enregistrées avec succès !', response);
          this.router.navigate(['/questionPotager']); // Ajustez selon votre routeur
        },
        error => {
          console.error('Erreur lors de l\'enregistrement :', error);
        }
      );
    }
  }

// retourner en arrière
  back() {
    this.location.back();
  }
}
