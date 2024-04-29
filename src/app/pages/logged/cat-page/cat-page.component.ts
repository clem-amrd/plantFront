import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../shared/services/login.service';
import { APIURLWEB } from "../../../../environments/environment";
import { Location } from '@angular/common';

@Component({
  selector: 'app-cat-page',
  templateUrl: './cat-page.component.html',
  styleUrls: ['./cat-page.component.scss']
})
export class CatPageComponent implements OnInit {
  searchTerm: number = 0;
  data: any = {};
  apiUrl = APIURLWEB;
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });
  sendAsk: boolean = false;
  statut: number = 0;
  user = this.LoginService.user;

  constructor(private LoginService: LoginService, private route: ActivatedRoute, private location: Location) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if ('query' in params) {
        const searchQuery = params['query'];
        console.log('query:', searchQuery);
        this.searchTerm = searchQuery;
      } else {
        console.log('pas de query');
      }
    });
    this.user = await this.LoginService.userAuth();
    this.infoCat();
  }

  //recuperer les informations du chat
  infoCat() {
    this.LoginService.catById(this.searchTerm)
      .then(async response => {
        console.log("toutes les infos: ", response);
        this.data = response;
        this.data.created_at = this.data.created_at.split("T")[0].replaceAll("-", "/");
        this.photoCat();
        this.userById(this.data.user_id);
        this.currAdoption();
      })
      .catch(error => {
        console.error('une erreur s\'est produite', error);
      });
  }

  //recuperer les photos du chat
  photoCat() {
    console.log("data = ", this.data.id);
    this.LoginService.photoByCat(this.data.id)
      .then(response => {
        console.log("toutes les photo: ", response);
        if (response.length == 0) {
          response[0] = { url: "/storage/Image/inconnu.jpg" };
        }
        this.data.photos = response;
      })
      .catch(error => {
        console.error('une erreur s\'est produite', error);
      });
  }

  //recuperer le propriétaire du chat
  userById(id: number) {
    return this.LoginService.infoUserById(id)
      .then(response => {
        console.log(response);
        this.data.user = response.user;
        if (response.avatarUrl.includes("https://")) {
          this.data.avatarUrl = response.avatarUrl;
        } else {
          this.data.avatarUrl = this.apiUrl + response.avatarUrl;
        }
        console.log("data = ", this.data);
        console.log(this.user?.id, this.data.user_id)
      })
      .catch(error => {
        console.error('une erreur s\'est produite', error);
        return error;
      });
  }

  //retour
  back() {
    this.location.back();
  }

  //ajouter/supprimer le chat des favoris
  changeFavoris() {
    if (this.data.favoris == true) {
      console.log("il va être supp");
      this.LoginService.deleteFavoris(this.data.id)
        .then(response => {
          console.log("supprimé");
          this.data.favoris = false;
        })
        .catch(error => {
          console.error('une erreur s\'est produite', error);
        });
    } else if (this.data.favoris == false) {
      console.log("il va être add");
      this.LoginService.addFavoris(this.data.id)
        .then(response => {
          console.log("ajouté");
          this.data.favoris = true;
        })
        .catch(error => {
          console.error('une erreur s\'est produite', error);
        });
    }
  }

  //recuperer le statut actuel de l'adoption si l'user a déjàa fait une demande d'adoption pour ce chat
  currAdoption() {
    this.LoginService.currentAdoption({ 'cat_id': this.data.id })
      .then(response => {
        console.log(response);
        this.statut = response.statut_id;
      })
  }

  //faire une demande d'adoption
  addAdoption() {
    this.LoginService.addAdoption({ 'cat_id': this.data.id })
      .then(response => {
        console.log(response.response);
        location.reload();
      })
  }

  //contacter le propriétaire du chat par email
  sendEmail(userEmail: string) {
    window.location.href = `mailto:${userEmail}`;
  }

}
