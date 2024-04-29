import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { LoginService } from '../../../../shared/services/login.service';
import { Cat } from '../../../../shared/model/cat';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cats',
  templateUrl: './my-cats.component.html',
  styleUrls: ['./my-cats.component.scss']
})
export class MyCatsComponent {
  constructor(private LoginService: LoginService, private location: Location, private router: Router) { }
  data: any = [];
  selectedCat: Cat | null = null;
  originalCatData: Cat | null = null;
  isEditFormVisible: boolean = false;
  update: boolean = false;
  selectedCatForDeletion: any = null;

  @ViewChild('myDialog') dialog: any;
  @ViewChild('supp') showButton: any;

  ngOnInit() {
    this.LoginService.myCats()
      .then(response => {
        this.data = response;
        console.log(this.data);
      });
  }

  //voir et modifier les photos du chat
  photoCatPage(term: number): void {
    console.log('Recherche pour', term);
    this.router.navigate(['/editPhotos'], { queryParams: { query: term } });
  }

  //ouvrir le dialog de suppression du chat
  openDeleteDialog(cat: any) {
    this.selectedCatForDeletion = cat;
    if (this.dialog) {
      this.dialog.nativeElement.open = true;
    }
  }

  //supprimer un chat
  deleteCat(id: number) {
    this.LoginService.deleteCat(id)
      .then(response => {
        if (response == true) {
          location.reload();
        }
      })
  }

  //fermer le dialog de suppression du chat
  closeDialog() {
    this.selectedCatForDeletion = null;
    this.dialog.nativeElement.open = false;
  }

  //ouvrir le formulaire de modification du chat
  openEditForm(cat: Cat) {
    this.originalCatData = { ...cat };
    this.selectedCat = cat;
    this.isEditFormVisible = true;
    this.selectedCat = cat;
  }

  //fermer le formulaire de modification du chat
  closeEditForm() {
    console.log(this.update);
    if (this.selectedCat && this.originalCatData && this.update == false) {
      Object.assign(this.selectedCat, this.originalCatData);
    }
    this.isEditFormVisible = false;
    this.update = false;
  }

  //renvoyer vers la page du chat
  catPage(id: number): void {
    this.router.navigate(['/cat'], { queryParams: { query: id } });
  }

}
