import { Component } from '@angular/core';
import { APIURL, APIURLWEB } from "../../../../environments/environment";
import { Router } from '@angular/router';
import { LoginService } from '../../../shared/services/login.service';
import {Location} from "@angular/common";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  APIURL = APIURL;
  APIURLWEB = APIURLWEB;
  email: string = "";
  password: string = "";
  error: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private location: Location) {}


  //Se connecter
  onLogin(): void {
    console.log(`Nom: ${this.email}`);
    console.log(`pswd: ${this.password}`);
    this.loginService.loginUser({ email: this.email, password: this.password })
      .subscribe(
        response => {
          console.log('Login successful', response);
          if (response.status == true) {
            this.loginService.setToken(response.token);
            this.router.navigate(['/']);
          }else{
            this.error = true;
            console.log("email ou mot de passe incorrect");
          }
        },
        error => {
          this.error = true;
          console.log("email ou mot de passe incorrect");
        },
      );
  }

  navigateToRegister() {
    console.log("redirect");
    this.router.navigate(['/register']);
}

// retourner en arrière
  back() {
    this.location.back();
  }

}


