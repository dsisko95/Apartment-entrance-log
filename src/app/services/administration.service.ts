import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ILogs } from '../models/logs';
import { toast } from 'angular2-materialize';
@Injectable()
export class AdministrationService {

  private _url: string = "http://apartment-logs.somee.com/api/admin";
  private cityName: string;
  private country: string;
  private list: object[];
  private id: number;
  private idEdit: number;
  // users fields
  private username: string;
  private user: string;
  private password: string;
  private role: string;
  private secureQuestion1: string;
  private secureQuestion2: string;
  // apartments fields
  private cityId: number;
  private address: string;
  private type: string;
  private ownernameId: number;
  private apartmentNumber: number;
  // clients fields
  private JMBG: number;
  private clientName: string;
  private telephone: string;
  private jmbg;
  constructor(private http: HttpClient) { }

  // get methods
  getAdminLogsByCityName(): Observable<ILogs[]> {
    return this.http.get<ILogs[]>(`${this._url}/${this.cityName}/getcitybyname`);
  }
  getAdminLogsCountyes(): Observable<ILogs[]> {
    return this.http.get<ILogs[]>(`${this._url}/getallcountryes`);
  }
  getAdminLogsCountriesCities(): Observable<ILogs[]> {
    return this.http.get<ILogs[]>(`${this._url}/getallcitiescountries`);
  }
  getCheckUsername(): Observable<ILogs[]> {
    return this.http.get<ILogs[]>(`${this._url}/${this.username}/checkduplicateusername`);
  }
  getAdminLogsOwners(): Observable<ILogs[]> {
    return this.http.get<ILogs[]>(`${this._url}/getallowners`);
  }
  getAdminCitys(): Observable<ILogs[]> {
    return this.http.get<ILogs[]>(`${this._url}/getallcitys`);
  }
  getAdminOwners(): Observable<ILogs[]> { 
    return this.http.get<ILogs[]>(`${this._url}/getallownersbytypeowner`);
  }
  getAdminApartments(): Observable<ILogs[]> {
    return this.http.get<ILogs[]>(`${this._url}/getallapartmens`);
  }
  getClients(): Observable<ILogs[]> {
    return this.http.get<ILogs[]>(`${this._url}/getallclients`);
  }
  getClientsJMBG(): Observable<ILogs[]> {
    return this.http.get<ILogs[]>(`${this._url}/${this.jmbg}/getclientbyjmbg`);
  }
  // insert methods
  InsertCity(): Observable<Object> {
    return this.http.post(`${this._url}/insertcity`,
      {
        "Name": `${this.cityName}`,
        "Country": `${this.country}`
      }
    )
  }
  InsertUser(): Observable<Object> {
    return this.http.post(`${this._url}/insertowner`,
      {
        "OwnerNameSurname": `${this.user}`,
        "Username": `${this.username}`,
        "Password": `${this.password}`,
        "Role": `${this.role}`,
        "SecureQuestion1": `${this.secureQuestion1}`,
        "SecureQuestion2": `${this.secureQuestion2}`
      }
    )
  }
  InsertApartment(): Observable<Object> {
    return this.http.post(`${this._url}/insertapartment`,
      {
        "City_id": `${this.cityId}`,
        "Address": `${this.address}`,
        "Type": `${this.type}`,
        "Number": `${this.apartmentNumber}`,
        "OwnerId": `${this.ownernameId}`
      }
    )
  }
  InsertClient(): Observable<Object> {
    return this.http.post(`${this._url}/insertclient`,
      {
        "Identification_number": `${this.JMBG}`,
        "Name_Surname": `${this.clientName}`,
        "Telephone_number": `${this.telephone}`
      }
    )
  }
  // update methods
  updateCity(): Observable<Object> {
    return this.http.put(`${this._url}/updatecity`,
      {
        "Id": `${this.idEdit}`,
        "Name": `${this.cityName}`
      }
    )
  }
  updateOwner(): Observable<Object> {
    return this.http.put(`${this._url}/updateowner`,
      {
        "Id": `${this.idEdit}`,
        "OwnerNameSurname": `${this.user}`,
        "Role": `${this.role}`
      }
    )
  }
  updateApartment(): Observable<Object> {
    return this.http.put(`${this._url}/updateapartment`,
      {
        "Id": `${this.id}`,
        "City_id": `${this.cityId}`,
        "Address": `${this.address}`,
        "Type": `${this.type}`,
        "Number": `${this.apartmentNumber}`,
        "OwnerId": `${this.ownernameId}`
      }
    )
  }
  updateClient() {
    this.http.put(`${this._url}/updateclient`,
      {
        "Identification_number": `${this.JMBG}`,
        "Name_Surname": `${this.clientName}`,
        "Telephone_number": `${this.telephone}`
      }
    ).subscribe((data: any) => {
      toast("Uspešno ažurirano!", 3000);
    })
  }
  // delete methods
  deleteOwner() {
    this.http.delete(`${this._url}/${this.id}/deleteowner`).subscribe(data => {
      toast("Uspešno izbrisano!", 3000);
    });
  }
  resetPassword() {
    this.http.put(`${this._url}/updateownerpassword`,
      {
        "Id": `${this.id}`,
        "Password": `${this.password}`,
      }
    ).subscribe((data: any) => {
      toast("Uspešno resetovano!", 3000);
    })
  }
  // setters
  setValueForCity(data: string) {
    this.cityName = data;
  }
  setValueForCountry(data: string) {
    this.country = data;
  }
  setValueForId(data: number) {
    this.id = data;
  }
  setValueForidEdit(data: number) {
    this.idEdit = data;
  }
  setValueForUser(data: string) {
    this.user = data;
  }
  setValueForPassword(data: string) {
    this.password = data;
  }
  setValueForRole(data: string) {
    this.role = data;
  }
  setValueForsecureQuestion1(data: string) {
    this.secureQuestion1 = data;
  }
  setValueForsecureQuestion2(data: string) {
    this.secureQuestion2 = data;
  }
  setValueForCityId(data: number) {
    this.cityId = data;
  }
  setValueForAddress(data: string) { 
    this.address = data;
  }
  setValueForType(data: string) { 
    this.type = data;
  }
  setValueForOwnerId(data: number) { 
    this.ownernameId = data;
  }
  setValueForNumberApartment(data: number) {
    this.apartmentNumber = data;
  }
  setValueForJMBG(data: number) {
    this.JMBG = data;
  }
  setValueForClientName(data: string) {
    this.clientName = data;
  }
  setValueForTelephone(data: string) {
    this.telephone = data;
  }
  setValueForjmbg(data: string) {
    this.jmbg = data;
  }
  setValueForUsername(data: string) {
    this.username = data;
  }
}
