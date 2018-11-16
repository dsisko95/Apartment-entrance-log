import { Component, OnInit, Input, OnChanges, EventEmitter } from '@angular/core';
import { toast } from 'angular2-materialize';
import { AdministrationService } from '../administration.service';
import { Location } from '@angular/common';
import { setUsernameAndRoleOnMenuService } from '../set-username-and-role-on-menu.service';
import { Router } from '@angular/router';
import { FilterServiceService } from '../filter-service.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-administration-comp',
  templateUrl: './administration-comp.component.html',
  styleUrls: ['./administration-comp.component.scss'],
  providers: [AdministrationService]
})
export class AdministrationCompComponent implements OnInit {
  cityName: string;
  countryName: string;
  editRowID: number;
  itemsPerPage: number;
  currentPage: number;
  roleType: string;
  nameType: string;
  logintext: string;
  // owner fields
  userName: string;
  userLoginName: string;
  password: string;
  passwordRepeated: string;
  role: string;
  secureQuestion1: string;
  secureQuestion2: string;
  // apartment fileds
  cityApartment: string;
  addressApartment: string;
  typeApartment: string;
  numberApartment: string;
  ownerApartment: string;
  // clients
  JMBG: string;
  clientName: string;
  telephone: string;
  private citys = [];
  private countryes = [];
  private allCitiesCountries = [];
  private showEditTable: boolean = false;
  private Edit: boolean = false;
  private username: object = {};
  private users = [];
  private citysApartments = [];
  private ownersApartments = [];
  private apartments = [];
  private clientsArray = [];
  private clientjmbg = [];
  key: string;
  reverse: boolean = false;
  constructor(private administrationService: AdministrationService, private _location: Location, private loginUser: setUsernameAndRoleOnMenuService, private router: Router) {
  }
  ngOnInit() {
    this.populateCountriesArray();
    this.populateCitiesCountriesTable();
    this.setUsernameAndRole();
    this.checkRole();
    this.populateUsersTable();
    this.populateCitysApartments();
    this.populateOwnersApartments();
    this.populateApartmentsTable();
    this.populateClientsTable();
    $(document).ready(function () {
      $('.tabs').tabs();
    });
  };
  backClicked() {
    this._location.back();
  }
  setUsernameAndRole() {
    this.roleType = localStorage.getItem('role');
    this.nameType = localStorage.getItem('username');
  }
  checkRole() {
    if (localStorage.getItem('role') === "Vlasnik") {
      const dataAdd = document.getElementById('data-add');
      dataAdd.setAttribute("disabled", "");
    }
  }
  insertCity() {
    if ((this.cityName === undefined || this.cityName.trim() === "") || (this.countryName === undefined || this.countryName.trim() === "")) {
      toast("Molimo vas unesite oba polja!", 2000);
    } else if (this.cityName.match(/^[A-Za-z\s]+$/)) {
      this.administrationService.setValueForCity(this.cityName.trim());
      this.administrationService.getAdminLogsByCityName()
        .subscribe(data => {
          this.citys = data;
          if (this.citys.length > 0) {
            toast("Grad sa unetim imenom već postoji!", 3000);
          } else {
            this.administrationService.setValueForCity(this.capitalizeEachWord(this.cityName));
            this.administrationService.setValueForCountry(this.countryName);
            this.administrationService.InsertCity().subscribe(data => {
              this.populateCitiesCountriesTable();
              this.populateCitysApartments();
              toast("Uspešno uneto!", 3000);
            });
            this.cityName = "";
            this.countryName = "";
          }
        });
    } else {
      toast("Uneti grad mora imati samo slova!", 2000);
    }
  }
  insertOwner() {
    if ((this.userName === undefined || this.userName.trim() === "") || (this.userLoginName === undefined || this.userLoginName.trim() === "") || (this.password === undefined || this.password.trim() === "") || (this.passwordRepeated === undefined || this.passwordRepeated.trim() === "") || (this.role === undefined || this.role.trim() === "") || (this.secureQuestion1 === undefined || this.secureQuestion1.trim() === "") || (this.secureQuestion2 === undefined || this.secureQuestion2.trim() === "")) {
      toast("Molimo vas unesite sva polja!", 2000);
    } else if (this.userName.match(/^[A-Za-z\s]+$/)) {
      this.administrationService.setValueForUsername(this.userLoginName.trim());
      this.administrationService.getCheckUsername()
        .subscribe(data => {
          this.username = data;
          if (this.username['Username'] !== null) {
            toast("Korisničko ime već postoji! Molimo Vas odaberite drugo!", 3000);
          } else {
            if (this.password.trim().length <= 5) {
              toast("Dužina lozinke mora biti veća od 5 karaktera!", 3000);
            } else {
              if (this.password !== this.passwordRepeated) {
                toast("Obe unete lozinke moraju biti iste!", 3000);
              } else {
                let key = '8b2b7d7dc4063bc0bf30986536f8816c71405c16fb0cc4677db1e349af157baa';
                const ciphertextPassword = CryptoJS.HmacMD5(this.password, key);
                const ciphertextSQ1 = CryptoJS.HmacMD5(this.secureQuestion1, key);
                const ciphertextSQ2 = CryptoJS.HmacMD5(this.secureQuestion2, key);
                this.administrationService.setValueForsecureQuestion1(ciphertextSQ1.toString());
                this.administrationService.setValueForsecureQuestion2(ciphertextSQ2.toString());
                this.administrationService.setValueForPassword(ciphertextPassword.toString());
                this.administrationService.setValueForUser(this.capitalizeEachWord(this.userName));
                this.administrationService.setValueForUsername(this.userLoginName);
                this.administrationService.setValueForRole(this.role);
                this.administrationService.InsertUser().subscribe(data => {
                  this.populateUsersTable();
                  this.populateOwnersApartments();
                  toast("Uspešno uneto!", 3000);
                });
                this.userName = "";
                this.userLoginName = "";
                this.password = "";
                this.passwordRepeated = "";
                this.role = "";
                this.secureQuestion1 = "";
                this.secureQuestion2 = "";
              }
            }
          }
        });
    } else {
      toast("Uneto ime korisnika mora imati samo slova!", 2000);
    }
  }
  insertApartment() {
    if ((this.cityApartment === undefined || this.cityApartment.trim() === "") || (this.addressApartment === undefined || this.addressApartment.trim() === "") || (this.typeApartment === undefined || this.typeApartment.trim() === "") || (this.ownerApartment === undefined || this.ownerApartment.trim() === "") || (this.numberApartment === undefined || this.numberApartment.trim() === "")) {
      toast("Molimo vas unesite sva polja!", 2000);
    } else {
      if (this.numberApartment.match(/^[0-9]+$/)) {
        this.administrationService.setValueForCityId(parseInt(this.cityApartment));
        this.administrationService.setValueForAddress(this.capitalizeEachWord(this.addressApartment));
        this.administrationService.setValueForType(this.typeApartment);
        this.administrationService.setValueForNumberApartment(parseInt(this.numberApartment));
        this.administrationService.setValueForOwnerId(parseInt(this.ownerApartment));
        this.administrationService.InsertApartment().subscribe(data => {
          this.populateApartmentsTable();
          toast("Uspešno uneto!", 3000);
        });
        this.cityApartment = "";
        this.addressApartment = "";
        this.typeApartment = "";
        this.ownerApartment = "";
        this.numberApartment = "";
      } else {
        toast("Broj stana mora biti numerička vrednost!", 2000);
      }
    }
  }
  insertClient() {
    if (this.JMBG === undefined || this.clientName === undefined || this.telephone === undefined) {
      toast("Molimo vas unesite sva polja!", 2000);
    } else {
      if (this.JMBG.match(/^[0-9]+$/) && this.telephone.match(/^[0-9]+$/)) {
        if (this.JMBG.trim().toString().length == 13) {
          if (this.telephone.trim().toString().length == 10) {
            this.administrationService.setValueForjmbg(this.JMBG);
            this.administrationService.getClientsJMBG()
              .subscribe(data => {
                this.clientjmbg = data;
                if (this.clientjmbg === null || this.clientjmbg.length !== 1) {
                  const telephoneFormat = this.telephone;
                  let line = "/";
                  let horizontalLine = "-";
                  let position = 3;
                  let position1 = 6;
                  let position2 = 9;
                  const fullTelFormat = [telephoneFormat.slice(0, position), line, telephoneFormat.slice(position)].join('');
                  const fullTelFormat1 = [fullTelFormat.slice(0, position1), horizontalLine, fullTelFormat.slice(position1)].join('');
                  const fullTelFormat2 = [fullTelFormat1.slice(0, position2), horizontalLine, fullTelFormat1.slice(position2)].join('');
                  this.administrationService.setValueForJMBG(parseInt(this.JMBG));
                  this.administrationService.setValueForClientName(this.capitalizeEachWord(this.clientName));
                  this.administrationService.setValueForTelephone(fullTelFormat2);
                  this.administrationService.InsertClient().subscribe(data => {
                    this.populateClientsTable();
                    toast("Uspešno uneto!", 3000);
                  });
                  this.JMBG = "";
                  this.clientName = "";
                  this.telephone = "";
                } else {
                  toast("Uneti JMBG već postoji!", 2000);
                }
              });
          } else {
            toast("Telefon mora imati 10 karaktera!", 2000);
          }
        } else {
          toast("JMBG mora imati 13 karaktera!", 2000);
        }
      } else {
        toast("JMBG i broj telefona moraju biti numeričke vrednosti!", 2000);
      }
    }
  }
  populateCountriesArray() {
    this.administrationService.getAdminLogsCountyes()
      .subscribe(data => this.countryes = data);
  }
  populateUsersTable() {
    this.administrationService.getAdminLogsOwners()
      .subscribe(data => this.users = data);
  }
  populateApartmentsTable() {
    this.administrationService.getAdminApartments()
      .subscribe(data => this.apartments = data);
  }
  populateCitiesCountriesTable() {
    this.administrationService.getAdminLogsCountriesCities()
      .subscribe(data => this.allCitiesCountries = data);
  }
  populateClientsTable() {
    this.administrationService.getClients()
      .subscribe(data => this.clientsArray = data);
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  editItemCity(id: number, city: string) {
    if (city.trim() === "" || city === undefined) {
      toast("Molimo vas unesite tražene vrednosti!", 3000);
    } else {
      this.administrationService.setValueForCity(city);
      this.administrationService.getAdminLogsByCityName()
        .subscribe(data => {
          this.citys = data;
          if (this.citys.length > 0) {
            toast("Grad sa unetim imenom već postoji!", 3000);
          } else {
            this.administrationService.setValueForidEdit(id);
            this.administrationService.setValueForCity(city);
            this.administrationService.updateCity().subscribe(data => {
              this.populateCitysApartments();
              toast("Uspešno ažurirano!", 3000);
            });
            this.editRowID = null;
          }
        });
    }
  }
  editItemOwner(id: number, ownername: string, role: string) {
    if ((ownername.trim() === "" || ownername === undefined)) {
      toast("Molimo vas unesite tražene vrednosti!", 3000);
    } else {
      this.administrationService.setValueForUser(this.capitalizeEachWord(ownername));
      this.administrationService.setValueForRole(role);
      this.administrationService.setValueForidEdit(id);
      this.administrationService.updateOwner().subscribe(data => {
        this.populateOwnersApartments();
        toast("Uspešno ažurirano!", 3000);
      });
      this.editRowID = null;
    }
  }
  editItemApartment(id: number, cityid: number, address: string, type: string, number: number, owner: number) {
    if ((address.trim() === "" || address === undefined) || (number === undefined || number === null) || (isNaN(cityid)) || (isNaN(owner))) {
      toast("Molimo vas unesite tražene vrednosti!", 3000);
    } else {
      const stringNumber = number.toString();
      if (stringNumber.match(/^[0-9]+$/)) {
        this.administrationService.setValueForId(id);
        this.administrationService.setValueForCityId(cityid);
        this.administrationService.setValueForAddress(this.capitalizeEachWord(address));
        this.administrationService.setValueForType(type);
        this.administrationService.setValueForNumberApartment(number);
        this.administrationService.setValueForOwnerId(owner);
        this.administrationService.updateApartment().subscribe(data => {
          this.populateApartmentsTable();
          toast("Uspešno ažurirano!", 3000);
        });
        this.editRowID = null;
      } else {
        toast("Broj stana mora biti numerička vrednost!", 3000);
      }

    }
  }
  editItemClient(id: string, name: string, telephone: string) {
    if ((id.trim() === "" || id === undefined) || (name.trim() === "" || name === undefined) || (telephone.trim() === "" || telephone === undefined)) {
      toast("Molimo vas unesite tražene vrednosti!", 3000);
    } else {
      const stringid = id.toString();
      if (stringid.match(/^[0-9]+$/)) {
        const stringtelephone = telephone.toString();
        if (stringtelephone.match(/^[0-9]+$/)) {
          this.administrationService.setValueForJMBG(parseInt(id));
          this.administrationService.setValueForClientName(this.capitalizeEachWord(name));
          this.administrationService.setValueForTelephone(telephone);
          this.administrationService.updateClient();
        } else {
          toast("Telefon mora biti numerička vrednost!", 3000);
        }
      } else {
        toast("JMBG mora biti numerička vrednost!", 3000);
      }
    }
  }
  editItemShow(id: number) {
    if (this.Edit === false) {
      this.editRowID = id;
      this.Edit = true;
    } else {
      this.editRowID = null;
      this.Edit = false;
    }
  }
  deleteItemOwner(id: number, index: number) {
    if (confirm('Da li ste sigurni da želite da obrišete korisnika?')) {
      this.administrationService.setValueForId(id);
      this.administrationService.deleteOwner();
      this.users.splice(index - 1, 1);
    }
  }

  resetPassword(id: number, username: string) {
    if (confirm('Da li ste sigurni da želite da resetujete lozinku?')) {
      let key = '8b2b7d7dc4063bc0bf30986536f8816c71405c16fb0cc4677db1e349af157baa';
      const ciphertextPassword = CryptoJS.HmacMD5(username, key);
      this.administrationService.setValueForId(id);
      this.administrationService.setValueForPassword(ciphertextPassword.toString());
      this.administrationService.resetPassword();
    }
  }
  populateCitysApartments() {
    this.administrationService.getAdminCitys()
      .subscribe(data => {
        this.citysApartments = data;
      });
  }
  populateOwnersApartments() {
    this.administrationService.getAdminOwners()
      .subscribe(data => {
        this.ownersApartments = data;
      });
  }
  capitalizeEachWord(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
