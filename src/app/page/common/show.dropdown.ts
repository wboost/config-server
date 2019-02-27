import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApplicationDto, Client} from "../../appConf/dto/dto.client";

@Component({
  selector: 'show-dropdown',
  template: `
    <show-upload [client]="chooseClient"></show-upload>
    <nz-dropdown>
      <a nz-dropdown>
        please choose one client. <i nz-icon type="down"></i>
      </a>
      <ul nz-menu>
        <div *ngFor="let client of clients;index as i">
          <li nz-menu-item nzDisabled *ngFor="let app of client.apps;index as j">
            <a (click)="choose(client,app)">{{client.name + '(' + app.basePath + ')'}}</a>
          </li>
          <li *ngIf="i !== clients.length-1" nz-menu-divider></li>
        </div>
      </ul>
    </nz-dropdown>
    `,

  styles: [
    `
      [nz-button] {
        height: 25px;
      }
    `
  ]
})
export class ShowDropDownComponent{

  @Input()  clients: Client[];
  chooseClient: Client;
  chooseApp: ApplicationDto;
  @Output() private childOuter = new EventEmitter();

  constructor(private http: HttpClient) { }

  choose(client,app) {
    this.chooseClient = client;
    this.chooseApp = app;
    this.childOuter.emit([client,app]);
  }
}
