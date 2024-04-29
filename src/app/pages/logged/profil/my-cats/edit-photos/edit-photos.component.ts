import { Component, Input } from '@angular/core';
import { LoginService } from '../../../../../shared/services/login.service';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Photo } from '../../../../../shared/model/photo';
import { APIURLWEB } from "../../../../../../environments/environment";
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-photos',
  templateUrl: './edit-photos.component.html',
  styleUrls: ['./edit-photos.component.scss']
})
export class EditPhotosComponent {
  constructor(private location : Location, private LoginService: LoginService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.photoForm = this.formBuilder.group({
      image: [null, Validators.required]
    });
  }

  @Input() id: number | null = 0;
  searchTerm: number = 0;
  datas : Photo[] = [];
  apiUrl = APIURLWEB;

  photoForm: FormGroup;

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      if ('query' in params) {
        const searchQuery = params['query'];
        console.log('query:', searchQuery);
        this.searchTerm = searchQuery;
      } else {
        console.log('pas de query');
      }
    });
    this.getPhotoCat();
  }

  //recuperer les photos du chat
  getPhotoCat(): void {
    this.LoginService.loadImage(this.searchTerm)
      .then(response => {
        this.datas = response;
        // this.datas.url = apiUrl + this.datas.url;
        console.log("cat: ", this.datas);
      })
      .catch(error => {
        console.error('An error occurred while fetching cat info:', error);
      });
  }

  //recuperer les photos selectionnées
  onFileSelect(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.photoForm.get('image')?.setValue(input.files);
    } else {
      this.photoForm.get('image')?.setValue(null);
    }
  }

  //ajouter toutes les photos selectionnées
  envoyerPhoto() {
    const fichierInput = this.photoForm.get('image')?.value;
    if (fichierInput) {
      console.log(fichierInput);
      for(let i = 0; i < fichierInput.length; i++){
          this.uploadFichier(fichierInput[i]);
      }
    }
  }

  //ajouter une photo dans le back
  uploadFichier(fichier: File) {
    const formData = new FormData();
    formData.append('image', fichier);
    if (this.searchTerm) {
      formData.append('id', this.searchTerm.toString());
      console.log(this.searchTerm.toString(), fichier);
    }
    console.log(formData);
    for (let [key, value] of (formData as any).entries()) {
      console.log(key, value);
    }
    this.LoginService.addPhotos(formData).then(
      response => {
        console.log('Upload réussi !', response);
        location.reload();
      },
      error => {
        console.error('Erreur lors de l\'upload :', error);
      }
    );
  }

  //supprimer une photo
  destroy(id: number) {
    this.LoginService.destroyImage(id).then(
      response => {
        console.log('destroy réussi !', response);
        location.reload();
      },
      error => {
        console.error('Erreur lors de l\'upload :', error);
      }
    );
  }

  //retour
  back() {
    this.location.back();
  }
}