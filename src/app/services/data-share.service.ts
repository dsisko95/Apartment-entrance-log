import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataShareService {
  private city = new BehaviorSubject<string>("");
  currentCity = this.city.asObservable();

  constructor() {
  }
  setValue(data:string) {
    this.city.next(data);
  }
}
