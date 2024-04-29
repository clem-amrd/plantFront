import { Component } from '@angular/core';
import { LoginService } from '../../../../shared/services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss']
})
export class MyDataComponent {
  constructor(private location : Location, private LoginService: LoginService, private router: Router, private fb: FormBuilder) { 
    this.form = this.fb.group({
      current_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirmation_password: ['', Validators.required]
});}

  form: FormGroup;
  res : string = "";

  onSubmit() {
    const formData = this.form.value;
    this.newPswd(JSON.stringify(formData));
  }

  //modifier le mot de passe
  newPswd(data: any) {
    console.log(data);
    this.LoginService.modifyPswd(data).then(
      response => {
        console.log(response);
        this.res = response.reponse;
        console.log(this.res);
      },
      error => {
        console.error('Erreur lors de la modification :', error);
      }
    );
  }

  //retour
  back() {
    this.location.back();
  }
}
