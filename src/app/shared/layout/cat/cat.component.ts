import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WsServiceService } from '../../services/ws-service.service';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss']
})
export class CatComponent {
  @Input() photo: string = "";
  @Input() name: string = "";
  @Input() age: number = 0;
  @Input() localisation: string = "";
  @Input() favoris: boolean = false;
  @Input() id: number = 0;
  @Input() numberOfFavorites: number = 0;
  @Input() sex: string = "";
  @Input() urgent: boolean = false;

  constructor(private WsServiceService: WsServiceService, public LoginService: LoginService) { }
 
  //mettre a jour le nombre de favoris
  ngOnInit(): void {
    this.WsServiceService.listenForFavoriteCountUpdate(this.id).subscribe((count: number) => {
      this.numberOfFavorites = count;
    });
  }
}

