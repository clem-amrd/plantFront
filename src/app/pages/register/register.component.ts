import { Component } from '@angular/core';
import { APIURL, APIURLWEB } from "../../../environments/environment";
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  APIURL = APIURL;
  APIURLWEB = APIURLWEB;
  name: string = "";
  email: string = "";
  password: string = "";
  password_confirmation: string = "";
  error: boolean = false;
  errorMsg: string = "";

  constructor(private loginService: LoginService, private router: Router) { }


  //s'inscrire
  register(): void {
    this.loginService.register({ name: this.name, email: this.email, password: this.password, password_confirmation: this.password_confirmation })
      .subscribe(
        response => {
          console.log('register successful', response);
          if (response.status == true) {
            this.loginService.setToken(response.token);
            this.router.navigate(['/']);
          } else {
            this.error = true;
            this.errorMsg = "L'enregistrement a échoué.";
          }
        },
        error => {
          console.error('Registration failed', error);
          if (error.error && error.error.message === 'validation error' && error.error.errors) {
            const validationErrors = error.error.errors;
            let errorMessage = 'Validation error:';
            for (const field in validationErrors) {
              if (validationErrors.hasOwnProperty(field)) {
                errorMessage += ` ${validationErrors[field][0]}`;
              }
            }
            this.error = true;
            this.errorMsg = errorMessage;
          } else {
            this.error = true;
            this.errorMsg = "Vous avez rencontré une erreur. Réessayez ulterieurement.";
          }
        }
      );
  }

  //retourner a la page de connexion
  navigateToLogin() {
    console.log("redirect");
    this.router.navigate(['/login']);
  }
}
