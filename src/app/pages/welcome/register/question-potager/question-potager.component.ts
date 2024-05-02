import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../../shared/services/login.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-question-potager',
  templateUrl: './question-potager.component.html',
  styleUrls: ['./question-potager.component.scss']
})
export class QuestionPotagerComponent {
  userData: FormGroup;
regions: any[] = [];


// initialiser les données
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private location: Location) {
    this.userData = this.formBuilder.group({
      region: ['', Validators.required],
      dimension: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    })
  }

  ngOnInit(): void {
    console.log("ici")
    // Appel de la méthode pour récupérer les régions
    this.loginService.region().then(data => {
      this.regions = data;
    });
  }

  // submit() {
  //   const req = {
  //     experience: this.userData.value['experience'],
  //   };
  //   this.router.navigate(['/questionPlante']);
  //   console.log("ici");
  // }
  submit() {
    if (this.userData.valid) {
      const formData = {
        region: this.userData.value.region,
        dimension: this.userData.value.dimension
      };
      this.loginService.saveQuestionnaire(formData).then(
        response => {
          console.log('Enregistrement réussi', response);
          this.router.navigate(['/questionPlante']);
        },
        error => {
          console.error('Erreur lors de l\'enregistrement :', error);
        }
      );
    } else {
      console.error('Le formulaire n\'est pas valide');
      console.error(this.userData.errors); // Log des erreurs de validation
    }
  }



// soumettre les données
//   submit() {
//     const req = {
//       experience: this.userData.value['experience'],
//     };
//     this.router.navigate(['/questionPlante']);
//   }

  // retourner en arrière
  back() {
    this.location.back();
  }
}
