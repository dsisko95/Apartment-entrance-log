import { Injectable } from '@angular/core';

@Injectable()
export class setUsernameAndRoleOnMenuService {
  role: string;
  username: string;
  constructor() { }
  // setters
  setValueForUsername(data: string) {
    this.username = data;
  }
  setValueForRole(data: string) {
    this.role = data;
  }
  // getters
  getValueForUsername() {
    return this.username;
  }
  getValueForRole() {
    return this.role;
  }
}
