import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../../shared/services/login.service';
import { Localisation } from '../../../../shared/model/localisation';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  filterForm: FormGroup;
  select: any;
  option: any;
  departements:Localisation[] = [];

  constructor(private LoginService: LoginService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      ageMin: ['', [Validators.min(0), Validators.max(25)]],
      ageMax: ['', [Validators.min(0), Validators.max(25)]],
      sex: ['', [Validators.maxLength(255)]],
      localisation: [''],
      urgence: ['']
    });
  }
  ngOnInit() {
    this.Localisation();
  }


  //recuperer tout les departements
  Localisation(){
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

  onSubmit() {
    console.log(this.filterForm.value);
  }
}
