import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ILogs } from '../models/logs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginService {
  private username: string;
  private password: string;
  private isUserLoggedIn;
  private petCheckInput: string;
  private mealCheckInput: string;
  private newPassword: string;
  private _url: string = "http://apartment-logs.somee.com/api/login";
  private loginObj = new BehaviorSubject<any>('');
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
  getLoginObj(): Observable<ILogs> {
    return this.loginObj.asObservable();
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
  setLoginObj(obj: ILogs): void {
    this.loginObj.next(obj);
  }
}
