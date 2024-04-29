import { Component, Input } from '@angular/core';
import { LoginService } from '../../../../../../shared/services/login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.component.html',
  styleUrls: ['./add-photos.component.scss']
})
export class AddPhotosComponent {
  constructor(private LoginService: LoginService, private router: Router, private formBuilder: FormBuilder) {
    this.photoForm = this.formBuilder.group({
      image: [null, Validators.required]
    });
  }

  @Input() id: number | null = 0;
  photoForm: FormGroup;


  //recuperer les photos selectionnées
  onFileSelect(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.photoForm.get('image')?.setValue(input.files);
    } else {
      this.photoForm.get('image')?.setValue(null);
    }
  }

  //enregistrées toutes les photos
  envoyerPhoto() {
    const fichierInput = this.photoForm.get('image')?.value;
    if (fichierInput) {
      for(let i = 0; i < fichierInput.length; i++){
          this.uploadFichier(fichierInput[i]);  
      }
      this.router.navigate(['/meschats']);
    }
  }

  //enregistrer une photo dans la bdd
  uploadFichier(fichier: File) {
    const formData = new FormData();
    formData.append('image', fichier);
    if (this.id) {
      formData.append('id', this.id.toString());
    }
    this.LoginService.addPhotos(formData).then(
      response => {
        console.log('Upload réussi !', response);
      },
      error => {
        console.error('Erreur lors de l\'upload :', error);
      }
    );
  }
}
