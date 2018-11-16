import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { toast } from 'angular2-materialize';
import { NgProgress } from 'ngx-progressbar';
import { FilterServiceService } from '../filter-service.service';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';
import { setUsernameAndRoleOnMenuService } from '../set-username-and-role-on-menu.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  private login: object = {};
  username: string;
  password: string;
  usernameCheck: string;
  petCheckInput: string;
  mealCheckInput: string;
  newPassword: string;
  newPasswordRepeat: string;
  private usernameSecQuestion = [];
  constructor(private router: Router, private loginService: LoginServiceService, private setUsernameAndRoleService: setUsernameAndRoleOnMenuService) { }

  ngOnInit() {
    $(document).ready(function () {
      $('.tabs').tabs();
    });
  }
  checkProperties(obj) {
    for (let key in obj) {
      if (obj[key] !== null && obj[key] != "")
        return false;
    }
    return true;
  }
  loginUser() {
    if ((this.username === undefined || this.username.trim() === "") || (this.password === undefined || this.password.trim() === "")) {
      toast("Unesite korisničko ime/lozinku!", 3000);
    } else {
      // let key = '8b2b7d7dc4063bc0bf30986536f8816c71405c16fb0cc4677db1e349af157baa';
      // const ciphertextPassword = CryptoJS.HmacMD5(this.password.trim(), key);
      this.loginService.setValueForUsername(this.username.trim());
      this.loginService.setValueForPassword(this.password.trim());
      this.loginService.getFilterLogins()
        .subscribe(data => {
          this.login = data;
          if (this.checkProperties(this.login)) {
            toast("Neispravno korisničko ime ili lozinka!", 3000);
            this.username = "";
            this.password = "";
          } else {
            this.setUsernameAndRoleService.setValueForRole(this.login['Role']);
            this.setUsernameAndRoleService.setValueForUsername(this.login['OwnerNameSurname']);
            this.loginService.setUserLoggedIn();
            localStorage.setItem('session', this.loginService.getUserLoggedIn());
            localStorage.setItem('username', this.setUsernameAndRoleService.getValueForUsername());
            localStorage.setItem('role', this.setUsernameAndRoleService.getValueForRole());
            this.router.navigateByUrl('/logsdetail');
          }
        });
    }
  }
  checkResetPassword() {
    if ((this.usernameCheck === undefined || this.usernameCheck.trim() === "") || (this.petCheckInput === undefined || this.petCheckInput.trim() === "") || (this.mealCheckInput === undefined || this.mealCheckInput.trim() === "")) {
      toast("Unesite tražena polja!", 3000);
    } else {
      let key = '8b2b7d7dc4063bc0bf30986536f8816c71405c16fb0cc4677db1e349af157baa';
      const ciphertextSecQuest1 = CryptoJS.HmacMD5(this.petCheckInput.trim(), key);
      const ciphertextSecQuest2 = CryptoJS.HmacMD5(this.mealCheckInput.trim(), key);
      this.loginService.setValueForUsername(this.usernameCheck);
      this.loginService.setValueForPetCheck(ciphertextSecQuest1.toString());
      this.loginService.setValueForMealCheck(ciphertextSecQuest2.toString());
      this.loginService.getCheckUsernameBySecQuestion().subscribe(data => {
        this.usernameSecQuestion = data;
        if (this.usernameSecQuestion === null) {
          toast("Uneti korisnik, ili sigurnosna pitanja nisu odgovarajuća!", 3000);
          this.usernameCheck = "";
          this.petCheckInput = "";
          this.mealCheckInput = "";
        } else {
          this.switchTabsHide();
          this.usernameCheck = "";
          this.petCheckInput = "";
          this.mealCheckInput = "";
        }
      });
    }
  }
  resetPassword() {
    if ((this.newPassword === undefined || this.newPassword.trim() === "") || (this.newPasswordRepeat === undefined || this.newPasswordRepeat.trim() === "")) {
      toast("Molimo vas unesite odgovarajuća polja!", 3000);
    } else {
      if (this.newPassword.trim().length <= 5) {
        toast("Dužina lozinke mora biti veća od 5 karaktera!", 3000);
          this.newPassword = "";
          this.newPasswordRepeat = "";
      } else {
        if (this.newPassword !== this.newPasswordRepeat) {
          toast("Unete lozinke moraju biti iste!", 3000);
          this.newPassword = "";
          this.newPasswordRepeat = "";
        } else {
          let key = '8b2b7d7dc4063bc0bf30986536f8816c71405c16fb0cc4677db1e349af157baa';
          const newPassword = CryptoJS.HmacMD5(this.newPassword.trim(), key);
          this.loginService.setValueForNewPassword(newPassword.toString());
          this.loginService.updatePassword().subscribe(data => {
            toast("Lozinka je uspešno promenjena!", 3000);
            this.switchTabsShow();
            this.newPassword = "";
            this.newPasswordRepeat = "";
          });
        }
      }
    }
  }
  switchTabsHide() {
    let checkUsernameTab = document.getElementById('checkUsernameLink');
    let login = document.getElementById('login');
    let password = document.getElementById('resetpassword');
    let hiddenDiv = document.getElementById('test2');
    let showDiv = document.getElementById('test3');
    checkUsernameTab.style.display = "none";
    login.style.display = "none";
    password.style.display = "block";
    hiddenDiv.style.display = "none";
    showDiv.style.display = "block";
    $('#resetpassword a').click();
  }
  switchTabsShow() {
    let checkUsernameTab = document.getElementById('checkUsernameLink');
    let login = document.getElementById('login');
    let password = document.getElementById('resetpassword');
    let showDiv = document.getElementById('test3');
    checkUsernameTab.style.display = "block";
    login.style.display = "block";
    password.style.display = "none";
    showDiv.style.display = "none";
    $('#login a').click();
  }
}
