import { Component, OnInit } from '@angular/core';
import { toast } from 'angular2-materialize';
import { Router } from '@angular/router';
import { LoginService } from '../services/login-service.service';
import { setUserOnMenu } from '../services/set-username-on-menu.service';
import * as CryptoJS from 'crypto-js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ILogs } from '../models/logs';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  private login: ILogs;
  private usernameSecQuestion: ILogs;
  resetFormShow: boolean = false;
  loginFormShow: boolean = true;
  reset: boolean = true;
  loginTab: boolean = true;
  loginForm: FormGroup;
  resetForm: FormGroup;
  newPassForm: FormGroup;
  key: string = '8b2b7d7dc4063bc0bf30986536f8816c71405c16fb0cc4677db1e349af157baa';
  regexWhitespace = /\s/;
  constructor(private router: Router, private loginService: LoginService, private setUsernameAndRoleService: setUserOnMenu) { }

  ngOnInit() {
    $(document).ready(function () {
      $('.tabs').tabs();
    });
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
    this.resetForm = new FormGroup({
      'resetUsername': new FormControl(null, Validators.required),
      'resetPet': new FormControl(null, Validators.required),
      'resetMeal': new FormControl(null, Validators.required),
    });
    this.newPassForm = new FormGroup({
      'newPass': new FormControl(null, Validators.required),
      'newPassRepeated': new FormControl(null, Validators.required)
    });
  }
  resetFormFields(): void {
    this.resetForm.setValue({
      'resetUsername': null,
      'resetPet': null,
      'resetMeal': null,
    });
  }
  resetNewPassFormFields(): void {
    this.newPassForm.setValue({
      'newPass': null,
      'newPassRepeated': null
    });
  }
  switchTabsHide() {
    this.resetFormShow = true;
    this.loginFormShow = false;
    this.reset = false;
    this.loginTab = false;
  }
  switchTabsShow() {
    this.resetFormShow = false;
    this.loginFormShow = true;
    this.reset = true;
    this.loginTab = true;
  }
  loginUser() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    if (!this.loginForm.valid || (username.match(this.regexWhitespace) || password.match(this.regexWhitespace))) {
      toast("Unesite korisničko ime/lozinku!", 3000);
    } else {
      const ciphertextPassword = CryptoJS.HmacMD5(password, this.key);
      this.loginService.setValueForUsername(username);
      this.loginService.setValueForPassword(ciphertextPassword.toString());
      this.loginService.getFilterLogins()
        .subscribe((data: any) => {
          this.login = data;
          if (!this.login['Username']) {
            toast("Neispravno korisničko ime ili lozinka!", 3000);
            this.loginForm.setValue({
              'username': null,
              'password': null
            });
          } else {
            this.setUsernameAndRoleService.setValueForRole(this.login['Role']);
            this.setUsernameAndRoleService.setValueForUsername(this.login['OwnerNameSurname']);
            this.loginService.setUserLoggedIn();
            this.loginService.setLoginObj(data);
            this.router.navigate(['/logsdetail']);
          }
        }, error => {throw new Error(error)});
    }
  }
  checkResetPassword() {
    const username = this.resetForm.value.resetUsername;
    const pet = this.resetForm.value.resetPet;
    const meal = this.resetForm.value.resetMeal;
    if (!this.resetForm.valid || (username.match(this.regexWhitespace) || pet.match(this.regexWhitespace) || meal.match(this.regexWhitespace))) {
      toast("Unesite tražena polja!", 3000);
    } else {
      const ciphertextSecQuest1 = CryptoJS.HmacMD5(pet, this.key);
      const ciphertextSecQuest2 = CryptoJS.HmacMD5(meal, this.key);
      this.loginService.setValueForUsername(username);
      this.loginService.setValueForPetCheck(ciphertextSecQuest1.toString());
      this.loginService.setValueForMealCheck(ciphertextSecQuest2.toString());
      this.loginService.getCheckUsernameBySecQuestion().subscribe((data: any) => {
        this.usernameSecQuestion = data;
        if (data === null || this.usernameSecQuestion['Username']) {
          toast("Uneti korisnik, ili sigurnosna pitanja nisu odgovarajuća!", 3000);
          this.resetFormFields();
        } else {
          this.switchTabsHide();
          this.resetFormFields();
        }
      }, error => {throw new Error(error)});
    }
  }
  resetPassword() {
    const newPass = this.newPassForm.value.newPass;
    const newPassRepeated = this.newPassForm.value.newPassRepeated;
    if (!this.newPassForm.valid || (newPass.match(this.regexWhitespace) || newPassRepeated.match(this.regexWhitespace))) {
      toast("Molimo vas unesite odgovarajuća polja!", 3000);
    } else {
      if (newPass.length <= 5) {
        toast("Dužina lozinke mora biti veća od 5 karaktera!", 3000);
        this.resetNewPassFormFields();
      } else {
        if (newPass !== newPassRepeated) {
          toast("Unete lozinke moraju biti iste!", 3000);
          this.resetNewPassFormFields();
        } else {
          const newPassword = CryptoJS.HmacMD5(newPass, this.key);
          this.loginService.setValueForNewPassword(newPassword.toString());
          this.loginService.updatePassword().subscribe(data => {
            toast("Lozinka je uspešno promenjena!", 3000);
            window.location.reload();
          }, error => {throw new Error(error)});
        }
      }
    }
  }
}
