import { Component } from '@angular/core';
import { LoginService } from '../../../../shared/services/login.service';
import { APIURLWEB } from "../../../../../environments/environment";
import { Cat } from '../../../../shared/model/cat';
import { Adoption } from '../../../../shared/model/adoption';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-adoptions',
  templateUrl: './my-adoptions.component.html',
  styleUrls: ['./my-adoptions.component.scss']
})
export class MyAdoptionsComponent {
  apiUrl = APIURLWEB;
  cats: Cat[] = [];
  ownerCats: any[] = [];
  msgUser: boolean = true;
  msgOwner: boolean = true;
  currentTab: string = 'tab1';
  
  constructor(private LoginService: LoginService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.allUserAdoptions();
    this.allOwnerAdoptions();
    this.selectTab('tab1');
  }

  //recuperer les demandes d'adoptions que l'user a fait
  allUserAdoptions() {
    this.LoginService.userAdoption()
      .then(response => {
        console.log(response);
        if (!response.message) {
        this.msgUser = false;
        this.cats = response.cats;
        for (let i = 0; i < this.cats.length; i++) {
          this.cats[i].statut = response.adoptions[i].statut_id;
          this.cats[i].user_id = response.adoptions[i].user_id;
          if (response.photos[i] !== null) {
            this.cats[i].photo = this.apiUrl + "/storage/Image/" + response.photos[i];
          } else {
            this.cats[i].photo = this.apiUrl + "/storage/Image/inconnu.jpg";
          }
        }
      }
      })
  }

  //recuperer les demandes d'adoptions que l'user a reçu
  allOwnerAdoptions() {
    this.LoginService.ownerAdoption()
      .then(response => {
        if (!response.message) {
          this.msgOwner = false;
          console.log(response);
          this.ownerCats = response.cats;
          for (let i = 0; i < this.ownerCats.length; i++) {
            this.ownerCats[i].statut = response.adoptions[i].statut_id;
            this.ownerCats[i].user_id = response.adoptions[i].user_id;
            this.ownerCats[i].askUser_name = response.user[i].name;
            this.ownerCats[i].askUser_email = response.user[i].email;
            if (response.user[i].avatar.includes("https://")) {
              this.ownerCats[i].askUser_avatar = response.user[i].avatar;
            } else {
              this.ownerCats[i].askUser_avatar = this.apiUrl + "/storage/Image/" + response.user[i].avatar;
            }
            if (response.photos[i] !== null) {
              this.ownerCats[i].photo = this.apiUrl + "/storage/Image/" + response.photos[i];
            } else {
              this.ownerCats[i].photo = this.apiUrl + "/storage/Image/inconnu.jpg";
            }
          }
        }
      })
  }

  //changer le statut d'adoption
  update(catId: number, usertId: number, statut: number) {
    this.LoginService.updateAdoption({ 'statut_id': statut, 'cat_id': catId, 'user_id': usertId })
      .then(response => {
        console.log(response);
        location.reload();
      })
  }

  //basculer entre les demandes d'adoptions envoyées et reçues
  selectTab(tabId: string) {
    this.currentTab = tabId;
    console.log(this.currentTab);
}

//renvoyer vers la page du chat
catPage(id: number): void {
  this.router.navigate(['/plant'], { queryParams: { query: id } });
}

//retour
back() {
  this.location.back();
}

//contacter la personne qui a fait la demande d'adoption
sendEmail(userEmail: string) {
  window.location.href = `mailto:${userEmail}`;
}

}
