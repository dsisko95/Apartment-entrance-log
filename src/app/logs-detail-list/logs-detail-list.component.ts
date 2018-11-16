import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FilterServiceService } from '../services/filter-service.service';
import { toast } from 'angular2-materialize';
import { LoginService } from '../services/login-service.service';
import { setUserOnMenu } from '../services/set-username-on-menu.service';
import { Location } from '@angular/common';
import { MzModalService } from 'ng2-materialize';
@Component({
  selector: 'app-logs-detail-list',
  templateUrl: './logs-detail-list.component.html',
  styleUrls: ['./logs-detail-list.component.scss'],
  providers: [DatePipe, FilterServiceService]
}) 
export class LogsDetailListComponent implements OnInit {
  public logs = [];
  public logsFilterAll = [];
  // date format
  public options: Pickadate.DateOptions = {
    format: 'dddd, dd mmm, yyyy',
    formatSubmit: 'm-d-yyyy',
  };
  cardView: boolean;
  tableView: boolean = true;
  city: string;
  owner: string;
  client: string;
  status: string;
  date_od: string;
  date_do: string;
  key: string;
  reverse: boolean = false;
  roleType: string;
  nameType: string;
  logintext: string;
  logModal: object = {};
  constructor(private filtersService: FilterServiceService, private loginService: LoginService, private setUsernameAndRoleService: setUserOnMenu, private location: Location, private modalService: MzModalService) {
    this.city = 'Svi';
    this.owner = 'Svi';
    this.client = 'Svi';
    this.status = 'Svi';
  }
  ngOnInit() {
    this.allLogs();
    this.populateOwners();
    this.updateFilterFields();
    this.setUsernameAndRole();
    this.checkRole();
  }
  backClicked() {
    this.location.back();
    localStorage.removeItem('session');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }
  setUsernameAndRole() {
    this.roleType === undefined ? this.roleType = localStorage.getItem('role') : this.roleType = this.setUsernameAndRoleService.getValueForRole();
    this.nameType === undefined ? this.nameType = localStorage.getItem('username') : this.nameType = this.setUsernameAndRoleService.getValueForUsername();
  }
  checkRole() {
    if (localStorage.getItem('role') === "Vlasnik") {
      const dataAdd = document.getElementById('data-add');
      dataAdd.style.display = "none";
    }
  }
  populateOwners() {
    const username = document.getElementById('options-vlasnik');
    if (localStorage.getItem('role') === "Vlasnik") {
      this.owner = localStorage.getItem('username');
      username.setAttribute("disabled","");
    }
  }
  switchView() {
    const switchBtn = document.getElementById('switchBtn');
    const table = document.getElementById('tableData');
    const card = document.getElementById('cardData');
    if (this.tableView) {
      table.style.display = 'block';
      card.style.display = 'none';
      this.cardView = true;
      this.tableView = false;
    } else if (this.cardView) {
      table.style.display = 'none';
      card.style.display = 'block';
      this.cardView = false;
      this.tableView = true;
    }
  }
  allLogs() {
    this.loginService.getLogs()
      .subscribe(data => this.logs = data);
  }
  resetFilters() {
    this.city = 'Svi';
    if ( localStorage.getItem('role') === "Vlasnik") {
    this.owner = localStorage.getItem('username');
    } else {
      this.owner = "Svi";
    }
    this.client = 'Svi';
    this.status = 'Svi';
    this.date_od = null;
    this.date_do = null;
    this.allLogs();
    this.updateFilterFields();
  }
  updateFilterFields() {
    this.city === undefined || this.city === '' || this.city === 'Svi' ? this.filtersService.setValueForCname('SELECT DISTINCT c.Name FROM Monitoring m, Apartments a, Cities c WHERE c.Id=a.City_Id AND a.Id=m.Apartment_Id') : this.filtersService.setValueForCname(`'${this.city}'`);
    this.owner === undefined || this.owner === '' || this.owner === 'Svi' ? this.filtersService.setValueForOwname('SELECT DISTINCT ow.OwnerNameSurname FROM Monitoring m, Apartments a, Cities c, Clients cl, Owners ow WHERE c.Id=a.City_Id AND a.Id=m.Apartment_Id AND m.Client_Identification_number=cl.Identification_number AND ow.Id = a.Owner_Id') : this.filtersService.setValueForOwname(`'${this.owner}'`);
    this.client === undefined || this.client === '' || this.client === 'Svi' ? this.filtersService.setValueForClname('SELECT DISTINCT cl.Name_Surname FROM Monitoring m, Apartments a, Cities c, Clients cl, Owners ow WHERE c.Id=a.City_Id AND a.Id=m.Apartment_Id AND m.Client_Identification_number=cl.Identification_number AND ow.Id = a.Owner_Id') : this.filtersService.setValueForClname(`'${this.client}'`);
    this.status === undefined || this.status === '' || this.status=== 'Svi' ? this.filtersService.setValueForStatus('SELECT DISTINCT m.Status FROM Monitoring m, Apartments a, Cities c, Clients cl WHERE c.Id=a.City_Id AND a.Id=m.Apartment_Id AND m.Client_Identification_number=cl.Identification_number') : this.filtersService.setValueForStatus(`'${this.status}'`);
    this.filtersService.getFilterAllLogs()
        .subscribe(data => this.logsFilterAll = data);
  }
  dateValidate() {
    const date_od_value = new Date(`${this.date_od}`);
    const date_do_value = new Date(`${this.date_do}`);
    if ((this.date_od === null || this.date_od === undefined || this.date_od === '') || (this.date_do === null || this.date_do === undefined || this.date_do === '')) {
      toast("Molimo vas unesite oba polja za datum!", 2000);
    } else if (date_od_value > date_do_value) {
      toast("Datum do koga se traži evidencija mora biti veći od početnog datuma!", 4000);
    }
    else {
      const counterResult = document.getElementById('counter');
      this.filtersService.setValue(this.date_od);
      this.filtersService.setValueForDate(this.date_do);
      this.filtersService.getFilterLogsByDateBetween()
      .subscribe(data => this.logs = data);
    }
  }
  sort (key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  UniqueModalById(index: number) {
    this.logModal = this.logs[index];
  }
}

