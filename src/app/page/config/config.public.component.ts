import {Component, OnInit, ViewChild} from '@angular/core';
import {ShowPropertiesComponent} from "../common/show.properties";
import {Client, Properties} from "../../appConf/dto/dto.client";
import {PropertiesService} from "../service/PropertiesService";

@Component({
  selector: 'config-public',
  template: `
    <show-properties class="show-prop" [properties]="properties"></show-properties>`,
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
export class ConfigPublicComponent implements OnInit{

  @ViewChild(ShowPropertiesComponent) showProperties: ShowPropertiesComponent;

  properties:Properties[];
  client:Client;

  constructor(private propertiesService:PropertiesService) { }

  ngOnInit(): void {
    this.propertiesService.fetchAllPublic().subscribe(resultEntity => {
      let source = resultEntity.data.source;
      this.properties = this.propertiesService.resolveProp(source);
    },error => console.log(error))
  }

  upload() {

  }

}
