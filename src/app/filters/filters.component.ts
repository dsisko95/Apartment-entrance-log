import { Component, OnInit, Input } from '@angular/core';
import { LogsServiceService } from '../logs-service.service';
import { DataShareService } from '../data-share.service';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  providers: [LogsServiceService, DataShareService]
})
export class FiltersComponent implements OnInit {
  public logs = [];
  city: string;
  constructor(private _logsService: LogsServiceService, private _dataShareService: DataShareService) {
  }

  ngOnInit() {
    this._logsService.getLogs()
      .subscribe(data => this.logs = data);
  }
  sendData() {
    this._dataShareService.setValue(this.city);
  }
}
