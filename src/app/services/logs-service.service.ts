import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogs } from '../models/logs';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class LogsServiceService {

  private _url: string =  "http://localhost:38066/api/logs";
  constructor(private http: HttpClient) { }

  getLogs(): Observable<ILogs[]>{
    return this.http.get<ILogs[]>(this._url.concat("/getall"));
  }
}
