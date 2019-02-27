import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from "../../appConf/dto/dto.client";
import {ClientService} from "../service/ClientService";

@Component({
  selector: 'client-show',
  template: `
    <form nz-form>
      <nz-form-item *ngFor="let client of clients;index as i">
        {{ client.name }}
      </nz-form-item>
    </form>`,

  styles: [
    ``
  ]
})
export class ClientShowComponent implements OnInit{

  clients:Client[];

  constructor(
    private http: HttpClient,private clientService:ClientService) { }

  ngOnInit(): void {
    this.clientService.fetchClients().subscribe(result => {
        this.clients = <Client[]>result.data;
      })
  }


}

