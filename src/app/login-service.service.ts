import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ILogs } from './logs';

@Injectable()
export class LoginServiceService {
  private username: string;
  private password: string;
  private isUserLoggedIn;
  private petCheckInput: string;
  private mealCheckInput: string;
  private newPassword: string;
  private _url: string = "http://localhost:38066/api/login";
  constructor(private http: HttpClient) { 

  }
  // get methods
  getFilterLogins():Observable<ILogs[]>{
    return this.http.get<ILogs[]>(`${this._url}/${this.username}/${this.password}/getownerlogin`);
  }
  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }
  getCheckUsernameBySecQuestion():Observable<ILogs[]>{
    return this.http.get<ILogs[]>(`${this._url}/${this.username}/${this.petCheckInput}/${this.mealCheckInput}/getcheckusernamebysecquest`);
  }
  getLogs(): Observable<ILogs[]>{
    return this.http.get<ILogs[]>(this._url.concat("/getalllogs"));
  }
  // update methods
  updatePassword(): Observable<Object> {
    return this.http.put(`${this._url}/updateownerbyusername`,
      {
        "Password": `${this.newPassword}`,
        "Username": `${this.username}`,
      }
    )
  }
  // setters
  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }
  setValueForUsername(data: string) {
    this.username = data;
  }
  setValueForPassword(data: string) {
    this.password = data;
  }
  setValueForNewPassword(data: string) {
    this.newPassword= data;
  }
  setValueForPetCheck(data: string) {
    this.petCheckInput = data;
  }
  setValueForMealCheck(data: string) {
    this.mealCheckInput = data;
  }
}
