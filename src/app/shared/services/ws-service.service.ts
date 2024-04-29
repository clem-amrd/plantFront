import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Echo from 'laravel-echo';
import {
  APIURLWEB,
  MIX_PUSHER_APP_KEY,
  MIX_PUSHER_FORCE_TLS,
  MIX_PUSHER_HOST,
  MIX_PUSHER_PORT,
  MIX_PUSHER_PORT_TLS,
  MIX_PUSHER_TRANSPORT
} from "../../../environments/environment";
import { LoginService } from "./login.service";
import { Cat } from "../../shared/model/cat";
import { User } from "../../shared/model/user";

// @ts-ignore
window.Pusher = require('pusher-js');

@Injectable({
  providedIn: 'root'
})
export class WsServiceService {
  private channel: any;
  constructor(
    public apiService: LoginService
  ) {
    let ws = this.initWs();
    this.channel = this.linkChannel(ws);
    this.bindEvents(this.channel);
  }

  initWs(): any {
    return new Echo({
      broadcaster: 'pusher',
      cluster: 'mt1',
      key: MIX_PUSHER_APP_KEY,
      wsHost: MIX_PUSHER_HOST,
      wsPort: MIX_PUSHER_PORT,
      wssPort: MIX_PUSHER_PORT_TLS,
      forceTLS: MIX_PUSHER_FORCE_TLS,
      disableStats: true,
      enabledTransports: MIX_PUSHER_TRANSPORT,
      authEndpoint: APIURLWEB + '/broadcasting/auth',
      auth:
      {
        headers:
        {
          'Authorization': 'Bearer ' + this.apiService.token
        }
      }
    });
  };

  linkChannel(ws: any) {
    console.log(this.apiService.user?.id)
    return ws.private('cats').pusher;
  }

  bindEvents(channel: any) {
    channel.bind('CatFavoritedEvent', (data: { countCat: number, cat: Cat }) => {
      console.log('CatFavoritedEvent', data.countCat, data.cat);
    });
  }

  listenForFavoriteCountUpdate(catId: number): Observable<number> {
    return new Observable<number>((observer) => {
      this.channel.bind('CatFavoritedEvent', (data: { countCat: number, cat: Cat }) => {
        if (data.cat.id === catId) {
          observer.next(data.countCat);
        }
      });
    });
  }

}
