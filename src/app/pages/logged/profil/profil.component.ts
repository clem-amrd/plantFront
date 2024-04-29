import { Component } from '@angular/core';
import { LoginService } from '../../../shared/services/login.service';
import { Location } from '@angular/common';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
  
  constructor(private LoginService: LoginService, private location: Location) { }
@ViewChild('myDialog') dialogLogout: any;
@ViewChild('myDialog2') dialogDelete: any;

  //se deconnecter
  logout() {
    this.LoginService.logout();
  }

  //supprimer son compte
  deleteUser() {
    this.LoginService.deleteUser();
  }

  //fermer le dialog pour confirmer la suppression du compte
  closeDialogDelete() {
    this.dialogDelete.nativeElement.open = false;
  }

  //ouvrir le dialog pour confirmer la suppression du compte
  openDialogDelete() {
    if (this.dialogDelete) {
      this.dialogDelete.nativeElement.open = true;
    }
  }

  //fermer le dialog pour confirmer la deconnection
  closeDialogLogout() {
    this.dialogLogout.nativeElement.open = false;
  }

  //ouvrir le dialog pour confirmer la deconnection
  openDialogLogout() {
    if (this.dialogLogout) {
      this.dialogLogout.nativeElement.open = true;
    }
  }
}
