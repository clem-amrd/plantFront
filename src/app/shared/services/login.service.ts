import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { APIURL, APIURLWEB } from "../../../environments/environment";
import { User } from "../model/user";
import { Cat } from "../model/cat";
import { Observable, Subject } from 'rxjs';
import { Router } from "@angular/router";
import { Form, FormGroup } from '@angular/forms';
import {data} from "autoprefixer";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public token?: string;
  urlParams: any;
  user?: User;
  cat?: Cat;

  isInit: boolean = false;
  initPromise: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.init();
  }

  public async requestApi(URLAPI: string, action: string, method: string = 'GET', datas: any = {}, httpOptions: any = {}): Promise<any> {

    const methodWanted = method.toLowerCase();
    let route = URLAPI + action;

    let req = null;

    if (httpOptions.headers === undefined) {
      httpOptions.headers = new HttpHeaders({
        'Accept': 'application/json',
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
    }

    if (this.token) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
    }

    switch (methodWanted) {
      case 'post':
        req = this.http.post(route, datas, httpOptions);
        break;
      case 'patch':
        req = this.http.post(route, datas, httpOptions);
        break;
      case 'put':
        req = this.http.put(route, datas, httpOptions);
        break;
      case 'delete':
        route += '?' + Object.keys(datas).map((key) => {
          return key + '=' + datas[key];
        }).join('&');

        req = this.http.delete(route, httpOptions);
        break;
      default:
        route += '?' + Object.keys(datas).map((key) => {
          return key + '=' + datas[key];
        }).join('&');

        req = this.http.get(route, httpOptions);
        break;
    }

    return req.toPromise();
  }
  async region(): Promise<any> {
    const action = `/plant/allRegion`;
      try {
        const response = await this.requestApi(APIURL, action, 'GET');
        console.log('Response:', response);
        return response;
      } catch (error) {
        console.error('Error:', error);
        return Promise.reject(error);
      }
  }
  async saveQuestionnaire(formData: any): Promise<any> {
    const action = `/user/conditionUser`;
    try {
      const response = await this.requestApi(APIURL, action, 'POST', formData);
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  async getRecommandation(): Promise<any> {
    const action = `/plant/recommendation`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  async addPlante(plant_id: number): Promise<any> {
    const action = `/plant/addPlant/${plant_id}`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET', data);
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  async deletePlante(plant_id: number): Promise<any> {
    const action = `/plant/deletePlant/${plant_id}`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET', data);
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  async showPlante(): Promise<any> {
    const action = `/plant/allMyPlant`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET', data);
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }


  public async userAuth(): Promise<any> {
    const action = `/user/userAuth`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('OUIIIII', response)
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }

  }

  public async init() {
    this.urlParams = new URLSearchParams(window.location.search);
    if (this.urlParams.has('code') & this.urlParams.has('state')) {
      let code = this.urlParams.get('code') as string;
      let state = this.urlParams.get('state') as string;
      let res = await this.requestApi(APIURLWEB, '/google/auth/callback', 'get', { code, state });
      if (res && res.token) {
        this.setToken(res.token);
      }
      this.router.navigate(['']);
    } else {
      this.token = localStorage.getItem('apiToken') ? JSON.parse(localStorage.getItem('apiToken') as string).token : undefined;
      console.log(this.token);
    }
    this.user = await this.userAuth();
    console.log(this.user?.id)
    this.isInit = true;
    this.initPromise.next(true);
  }

  loginUser(data: { email: string; password: string }): Observable<any> {
    return this.http.post(APIURL + '/auth/login', data);
  }

  register(data: { name: string, email: string; password: string, password_confirmation: string }): Observable<any> {
    return this.http.post(APIURL + '/auth/register', data);
  }

  setToken(apiToken: string): void {
    localStorage.setItem('apiToken', JSON.stringify({ token: apiToken }));
    this.token = apiToken;
  }

  public async infoUser(): Promise<any> {

    const action = "/user/showInfo";

    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('Response:', response);
      let https = "https://";
      if(response.avatarUrl.includes("https") == false){
        response.avatarUrl = APIURLWEB + response.avatarUrl;
      }
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

    //MODIFIE CLEM
    public async plantById(id: number): Promise<any> {
      const action = `/plant/${id}`;
      try {
        const response = await this.requestApi(APIURL, action, 'GET');
        console.log('Response:', response);
        return response;
      } catch (error) {
        console.error('Error:', error);
        return Promise.reject(error);
      }
    }
  
      //MODIFIE CLEM
  public async deleteFavoris(id: number): Promise<any> {

    const action = `/plant/deleteFavoris/${id}`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  //MODIFIE CLEM
  public async addFavoris(id: number): Promise<any> {

    const action = `/plant/addFavoris/${id}`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  //CLEM
  public async watering(id: number): Promise<any> {

    const action = `/plant/watering/${id}`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  //CLEM
  public async wateringPlant(id: number): Promise<any> {

    const action = `/plant/wateringPlant/${id}`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async search(data: any = {}): Promise<any> {
    const action = "/plant/filters";
    try {
      const response = await this.requestApi(APIURL, action, 'POST', data);
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async infoUserById(id: number): Promise<any> {

    const action = `/user/${id}`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async catById(id: number): Promise<any> {
    const action = `/cat/${id}`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async photoByCat(id: number): Promise<any> {
    const action = `/photo/loadImage/${id}`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async catUrgent(): Promise<any> {

    const action = "/cat/urgent";
    try {

      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async catNew(): Promise<any> {
    const action = "/cat/new";
    try {

      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async countForCat(data:{}){
    const action = `/cat/count`;
    try {
      const response = await this.requestApi(APIURL, action, 'POST', data);
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async departementById(id: number): Promise<any> {

    const action = `/cat/departement/${id}`;
    try {

      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('Response:', response);
      return response.departement;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async allDepartement(): Promise<any> {

    const action = "/cat/allDepartement";
    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async favoris(id: number): Promise<any> {

    const action = `/cat/favoris/${id}`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async allFavoris(): Promise<any> {

    const action = `/plant/allfavoris`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async updateCat(id: number, data: any = {}): Promise<any> {
    const action = `/cat/update/${id}`;
    try {
      const response = await this.requestApi(APIURL, action, 'PUT', data);
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async addCat(data: any = {}): Promise<any> {
    const action = `/cat/store`;
    try {
      const response = await this.requestApi(APIURL, action, 'POST', data);
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }



  public async deleteCat(id: number): Promise<any> {
    const action = `/cat/delete/${id}`;
    try {
      const response = await this.requestApi(APIURL, action, 'DELETE');
      return true;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async addPhotos(data: FormData): Promise<any> {
    const action = `/photo/store`;
    try {
      const response = await this.requestApi(APIURL, action, 'POST', data);
      return true;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async modifyPswd(data: any = {}): Promise<any> {
    const action = "/user/UpdatePswd";
    console.log("my data: ", data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    try {
      const response = await this.requestApi(APIURL, action, 'PUT', data, httpOptions);
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async modifyInfos(data: FormData): Promise<any> {
    try {
      const response = await this.requestApi(APIURL, '/user/update', 'POST', data);
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error in newInfos:', error);
      return Promise.reject(error);
    }
  }

  public async loadImage(idCat: number): Promise<any> {
    const action = `/photo/loadImage/${idCat}`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET', idCat);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async destroyImage(photoId: number): Promise<any> {
    const action = `/photo/destroy/${photoId}`;
    try {
      const response = await this.requestApi(APIURL, action, 'DESTROY', photoId);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  isLogged(): boolean {
    return this.token !== undefined;
  }

  isCompleteProfile(): boolean {
    return !!this.user?.name;
  }

  public async logout(): Promise<any> {
    const action = "/auth/logoff";
    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      console.log('Response:', response);
      localStorage.removeItem('apiToken');
      this.token = undefined;
      this.user = undefined;
      this.router.navigate(['/welcome']);
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async deleteUser(): Promise<any> {
    const action = "/user/delete";
    try {
      const response = await this.requestApi(APIURL, action, 'DELETE');
      console.log('Response:', response);
      localStorage.removeItem('apiToken');
      this.token = undefined;
      this.user = undefined;
      this.router.navigate(['/welcome']);
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async haveNoPswd(): Promise<any> {
    const action = "/user/haveNoPswd";
    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  photoCat(id: number) {
    this.photoByCat(id)
      .then(response => {
        console.log("toutes les photo: ", response);
        return response;
      })
      .catch(error => {
        console.error('une erreur s\'est produite', error);
      });
  }

  //ADOPTIONS

  public async currentAdoption(data: {}): Promise<any> {
    const action = `/adoption/currentAdoption`;
    try {
      const response = await this.requestApi(APIURL, action, 'POST', data);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async addAdoption(data: {}): Promise<any> {
    const action = `/adoption/store`;
    try {
      const response = await this.requestApi(APIURL, action, 'POST', data);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async updateAdoption(data: {}): Promise<any> {
    const action = `/adoption/update`;
    try {
      const response = await this.requestApi(APIURL, action, 'PUT', data);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async userAdoption(): Promise<any> {
    const action = `/adoption/userAdoption`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }

  public async ownerAdoption(): Promise<any> {
    const action = `/adoption/ownerAdoption`;
    try {
      const response = await this.requestApi(APIURL, action, 'GET');
      return response;
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }
}


