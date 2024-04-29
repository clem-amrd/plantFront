import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import {APIURLWEB} from "../../../environments/environment";
import {Cat} from "../../shared/model/cat";
@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private LoginService: LoginService) { }
  apiUrl = APIURLWEB;
  
  photoCat(id: number){
    return this.LoginService.photoByCat(id)
      .then(response => {
        console.log("toutes les photo: ", response);
        if (response.length > 0) {
          return this.apiUrl + response[0].url;
        } else {
          return this.apiUrl + "/storage/Image/inconnu.jpg";
        }
      })
      .catch(error => {
        console.error('une erreur s\'est produite', error);
        return this.apiUrl + "/storage/Image/default.jpg";
      });
  }

  getCat(response: any[]) {
      for (let cat of response) {
        if (cat.photo !== "/storage/Image/") {
          cat.photo = this.apiUrl + cat.photo;
        } else {
          cat.photo = this.apiUrl + "/storage/Image/inconnu.jpg";
        }
      }
      return response;
    }
  }
