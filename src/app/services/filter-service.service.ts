import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ILogs } from '../models/logs';
@Injectable()
export class FilterServiceService {
  private value: string;
  private valueDate: string;
  private cname: string;
  private address: string;
  private type: string;
  private owname: string;
  private clname: string;
  private clid: string;
  private status: string;
  private _url: string = "http://localhost:38066/api/filter";
  constructor(private http: HttpClient) { }
  
  // filterController methods
  getFilterLogsByDateBetween(): Observable<ILogs[]>{
    return this.http.get<ILogs[]>(`${this._url}/${this.value}/${this.valueDate}/getalllogsbydate`);
  }
  getFilterAllLogs(): Observable<ILogs[]>{
    return this.http.get<ILogs[]>(`${this._url}/${this.cname}/${this.owname}/${this.clname}/${this.status}/getalllogsbyallfilter`);
  }
  // setters
  setValue(data: string) {
    this.value = data;
  }
  setValueForDate(data: string) {
    this.valueDate = data;
  }
  setValueForCname(data: string) {
    this.cname= data;
  }
  setValueForOwname(data: string) {
    this.owname = data;
  }
  setValueForClname(data: string) {
    this.clname = data;
  }
  setValueForStatus(data: string) {
    this.status = data;
  }
}