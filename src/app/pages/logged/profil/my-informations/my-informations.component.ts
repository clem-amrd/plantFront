import { Component } from '@angular/core';
import { LoginService } from '../../../../shared/services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from '../../../../shared/model/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-informations',
  templateUrl: './my-informations.component.html',
  styleUrls: ['./my-informations.component.scss']
})
export class MyInformationsComponent {
  constructor(private location : Location, private LoginService: LoginService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      avatar: [null],
    });
  }

  form: FormGroup;
  ngOnInit(): void {
    this.getUserInfo();
  }
  res: string = "";
  datas: any = {};
  name: string = "";

  //recuperer la photo de profil
  onFileSelect(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.form.get('avatar')?.setValue(input.files);
    } else {
      this.form.get('avatar')?.setValue(null);
    }
    console.log(this.form.get('avatar')?.value);
  }


  //recuperer les informations de l'user
  getUserInfo(): void {
    this.LoginService.infoUser()
      .then(response => {
        this.datas = response;
        console.log("user ", this.datas);
        this.name = this.datas.user.name;
        this.form.patchValue({
          name: this.name
        });
      })
      .catch(error => {
        console.error('An error occurred while fetching user info:', error);
      });
  }

  //envoyer les nouvelles données
  onSubmit() {
    const formData = new FormData();
    const avatarInput = this.form.get('avatar')?.value;
    console.log(this.form.get('avatar')?.value);
    if (avatarInput) {
      const avatarFile = avatarInput[0];
      formData.append('avatar', avatarFile, avatarFile.name);
    }
      formData.append('name', this.form.value.name);
      this.newInfos(formData);
  }

  //envoyer les nouvelles données
  newInfos(data: any) {
    console.log(data);
    this.LoginService.modifyInfos(data).then(
      response => {
        this.router.navigate(['/profil'])
      },
      error => {
        console.error('Erreur lors de la modification :', error);
        console.log("nope");
      }
    );
  }

  //retour
  back() {
    this.location.back();
  }
}
