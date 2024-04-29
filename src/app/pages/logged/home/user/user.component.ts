import { Component } from '@angular/core';
import { LoginService } from '../../../../shared/services/login.service';
import { Router } from '@angular/router';
import {APIURLWEB} from "../../../../../environments/environment";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user: any = {};
  apiUrl = APIURLWEB;

  constructor(private LoginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  //recuperer les informations de l'user connecté
  getUserInfo(): void {
    this.LoginService.infoUser()
      .then(response => {
        this.user = response;
      })
      .catch(error => {
        console.error('An error occurred while fetching user info:', error);
      });
  }
}
