import { Component } from '@angular/core';
import { LoginService } from '../../../../../shared/services/login.service';
import { Router } from '@angular/router';
import { Localisation } from '../../../../../shared/model/localisation';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-cat',
  templateUrl: './add-cat.component.html',
  styleUrls: ['./add-cat.component.scss']
})
export class AddCatComponent {
  constructor(private LoginService: LoginService, private router: Router) { }

  departements: Localisation[] = [];
  isEditFormVisible: boolean = false;
  id: number | null = null;

  model = {
    name: '',
    age: null,
    sex: '',
    breed: '',
    character: '', 
    localisation_id: 0, 
    description: '',
    urgent: false,
  };

  validationErrors = {
    age: '',
  };

  ngOnInit() {
    this.Localisation();
  }

  //créer un chat
  onSubmit(form: NgForm) {
    if (this.model.age === null || this.model.age < 0 || this.model.age > 25) {
      this.validationErrors.age = 'L\'âge doit être compris entre 0 et 25.';
      return;
    } else {
      this.validationErrors.age = '';
    this.LoginService.addCat(form.value)
      .then((response: any) => {
        console.log(response);
        this.id = response.id;
          this.openEditForm();
      })
    }
  }

  //recuperer tout les départements
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

  //ouvrir le formulaire d'ajout de photo
  openEditForm() {
    this.isEditFormVisible = true;
  }
  
  //fermer le formulaire d'ajout de photo et retourner a la page des chats de l'user
  closeEditForm() {
      this.isEditFormVisible = false;
      this.router.navigate(["/meschats"]);
  }

}
