import { Component } from '@angular/core';
import {APIURLWEB} from "../../../environments/environment";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  protected readonly APIURLWEB = APIURLWEB;
}
