import {Component, OnInit} from '@angular/core';
import {ApplicationDto, Client, Properties} from "../../appConf/dto/dto.client";
import {PropertiesService} from "../service/PropertiesService";
import {ClientService} from "../service/ClientService";

@Component({
  selector: 'config-setting',
  template: `    
    <show-dropdown #showDropDown sec-header (childOuter)="show($event)" [clients]="clients" class="show-dropdown"></show-dropdown>
    <show-properties [properties]="properties" class="show-prop" [write]=true ></show-properties>`,
  styles: [
    `
      .show-prop {
        position: fixed;
        overflow: auto;
        left: 240px;
        top: 95px;
        bottom: 31px;
        right: 0px;
      }
    `
  ]
})
export class ConfigSettingComponent implements OnInit{

  properties:Properties[];
  clients:Client[];

  constructor(
    private clientService: ClientService,private propertiesService:PropertiesService) { }

  ngOnInit(): void {
    this.clientService.fetchClients().subscribe(result => {
      this.clients = <Client[]>result.data;
      },error => console.log(error)
      , () => console.log("complete"))
  }

  show(choose) {
    let client = choose[0];
    let app = choose[1];
    this.propertiesService.fetchByApp(client.name).subscribe(result => {
      let client = <Client>result.data;
      client.apps.forEach(appFind=> {
        if (appFind.id === app.id)
          this.properties = (<ApplicationDto>appFind).propertiesDtos;
      });
    },error => console.log(error))
  }
}
