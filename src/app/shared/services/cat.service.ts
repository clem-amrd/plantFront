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
