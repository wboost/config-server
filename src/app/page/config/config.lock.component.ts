import {Component, OnInit} from '@angular/core';
import {Client} from "../../appConf/dto/dto.client";
import {PropertiesService} from "../service/PropertiesService";
import {ClientService} from "../service/ClientService";

@Component({
  selector: 'config-lock',
  template: `
    {{NO_IMPL}}
    `,
  styles: [
    `
    `
  ]
})
export class ConfigLockComponent implements OnInit{

  clients:Client[];
  NO_IMPL: string;

  constructor(
    private clientService: ClientService,private propertiesService:PropertiesService) { }

  ngOnInit(): void {
    this.NO_IMPL = '不开放';
  }

}
