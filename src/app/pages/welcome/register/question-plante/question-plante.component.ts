import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../../shared/services/login.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-question-plante',
  templateUrl: './question-plante.component.html',
  styleUrls: ['./question-plante.component.scss']
})
export class QuestionPlanteComponent {
  userData: FormGroup;

// initialiser les données
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private location: Location) {
    this.userData = this.formBuilder.group({
      plants: ['', Validators.required],
    })
  }

// soumettre les données
  selectOption(option: string) {
    if (option === 'Oui') {
      this.router.navigate(['/search']);
    } else if (option === 'Non') {
      this.router.navigate(['/recommandation']);
    }
  }

  // retourner en arrière
  back() {
    this.location.back();
  }
}
