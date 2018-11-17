import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FilterServiceService } from '../services/filter-service.service';
import { toast } from 'angular2-materialize';
import { LoginService } from '../services/login-service.service';
import { setUserOnMenu } from '../services/set-username-on-menu.service';
import { Location } from '@angular/common';
import { MzModalService } from 'ng2-materialize';
import { ILogs } from '../models/logs';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-logs-detail-list',
  templateUrl: './logs-detail-list.component.html',
  styleUrls: ['./logs-detail-list.component.scss'],
  providers: [DatePipe, FilterServiceService]
})
export class LogsDetailListComponent implements OnInit, OnDestroy {
  public logs = [];
  public logsFilterAll = [];
  // date format
  public options: Pickadate.DateOptions = {
    format: 'dddd, dd mmm, yyyy',
    formatSubmit: 'm-d-yyyy',
  };
  cardView: boolean = true;
  tableView: boolean = false;
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
  loginObj: ILogs;
  subscription: Subscription;
  @ViewChild('bottomSheetModalCard') modalCard;
  constructor(private filtersService: FilterServiceService, private loginService: LoginService, private setUsernameAndRoleService: setUserOnMenu, private location: Location, private modalService: MzModalService) {
    this.city = 'Svi';
    this.owner = 'Svi';
    this.client = 'Svi';
    this.status = 'Svi';
  }
  ngOnInit() {
    this.subscription = this.loginService.getLoginObj().subscribe((data: ILogs) => {
      this.loginObj = data;
      this.allLogs();
      this.populateOwners();
      this.updateFilterFields();
      this.setUsernameAndRole();
      this.checkRole();
    }, error => { throw new Error(error) });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  backClicked() {
    this.location.back();
  }
  setUsernameAndRole() {
    this.roleType === undefined ? this.roleType = this.loginObj['Role'] : this.roleType = this.setUsernameAndRoleService.getValueForRole();
    this.nameType === undefined ? this.nameType = this.loginObj['Username'] : this.nameType = this.setUsernameAndRoleService.getValueForUsername();
  } 
  checkRole() {
    if (this.loginObj['Role'] === "Vlasnik") {
      const dataAdd = document.getElementById('data-add');
      dataAdd.remove();
    }
  }
  populateOwners() {
    const username = document.getElementById('options-vlasnik');
    if (this.loginObj['Role'] === "Vlasnik") {
      this.owner = this.loginObj['OwnerNameSurname'];
      username.setAttribute("disabled", "");
    }
  }
  switchView() {
    this.cardView = !this.cardView;
    this.tableView = !this.tableView;
  }
  allLogs() {
    this.loginService.getLogs()
      .subscribe(data => { this.logs = data }, error => { throw new Error(error) });
  }
  resetFilters() {
    this.city = 'Svi';
    if (this.loginObj['Role'] === "Vlasnik") {
      this.owner = this.loginObj['OwnerNameSurname'];
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
    this.status === undefined || this.status === '' || this.status === 'Svi' ? this.filtersService.setValueForStatus('SELECT DISTINCT m.Status FROM Monitoring m, Apartments a, Cities c, Clients cl WHERE c.Id=a.City_Id AND a.Id=m.Apartment_Id AND m.Client_Identification_number=cl.Identification_number') : this.filtersService.setValueForStatus(`'${this.status}'`);
    this.filtersService.getFilterAllLogs()
      .subscribe(data => { this.logsFilterAll = data }, error => { throw new Error(error) });
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
      this.filtersService.setValue(this.date_od);
      this.filtersService.setValueForDate(this.date_do);
      this.filtersService.getFilterLogsByDateBetween()
        .subscribe(data => { this.logs = data }, error => { throw new Error(error) });
    }
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  cardSort(key, event: any) {
    if (event.target.classList.contains('cardSort')) {
      this.key = key;
      this.reverse = !this.reverse;
    }
  }
  UniqueModalById(log: any) {
    this.logModal = log;
  }
  openModal(event: any) {
    if (event.target.matches('div')) {
      this.modalCard.open()
    }
  }
}

