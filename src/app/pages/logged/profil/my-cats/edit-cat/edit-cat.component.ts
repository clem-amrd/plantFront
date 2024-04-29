import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Cat } from '../../../../../shared/model/cat';
import { LoginService } from '../../../../../shared/services/login.service';
import { Localisation } from '../../../../../shared/model/localisation';

@Component({
  selector: 'app-edit-cat',
  templateUrl: './edit-cat.component.html',
  styleUrls: ['./edit-cat.component.scss']
})
export class EditCatComponent {
  constructor(private LoginService: LoginService, private router: Router) { }
  @Input() update: boolean = false;
  @Output() updateChange = new EventEmitter<boolean>();
  @Input() cat: any;
  departements: Localisation[] = [];
  @Output() closeForm = new EventEmitter<void>();

  //mettre les nouvelles valeurs
  onInputChange(newValue: boolean) {
    this.update = newValue;
    this.updateChange.emit(newValue);
  }

  ngOnInit() {
    this.Localisation();
    console.log(this.update);
  }

  //modifier les informatiosn du chat
  submitForm() {
    console.log(this.cat);
    this.LoginService.updateCat(this.cat.id, this.cat)
      .then(response => {
        console.log(response);
        if (response == true) {
          this.onInputChange(true);
          this.closeForm.emit();
        }
        console.log("update form: ", this.update);
      })
  }

  //recuperer tout les départements
  Localisation() {
    this.LoginService.allDepartement()
      .then(response => {
        this.departements = response;
        this.departements.forEach((departement: any) => {
        });
      })
      .catch(error => {
        console.error('une erreur s\'est produite', error);
      });
  }

}
