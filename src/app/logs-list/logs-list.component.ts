import { Component, OnInit } from '@angular/core';
import { LogsServiceService } from '../logs-service.service';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.css']
})
export class LogsListComponent implements OnInit {

  public logs = [];

  constructor(private _logsService: LogsServiceService) { }

  ngOnInit() {
    this._logsService.getLogs()
        .subscribe(data => this.logs = data);
  }

}
