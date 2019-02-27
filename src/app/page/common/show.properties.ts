import {Component, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Properties} from "../../appConf/dto/dto.client";

@Component({
  selector: 'show-properties',
  template: `
    <form *ngIf="properties !== undefined">
      <nz-form-item *ngFor="let prop of properties;index as index">
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="prop">{{ prop.key}}</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input readonly nz-input [ngStyle]="{'color':prop.changeVal !== undefined?'red':'black'}" [value]="prop.changeVal !== undefined?prop.changeVal:prop.val" (dblclick)="change($event,prop,index)">
        </nz-form-control>
      </nz-form-item>
    </form>
    <nz-modal *ngIf="doProp !== undefined" [(nzVisible)]="write && isVisible" nzTitle="PropertiesModel" (nzOnCancel)="cancel()" (nzOnOk)="ok()">
      当前值<input readonly nz-input [(ngModel)]="doProp.properties.val">
      <input nz-input [(ngModel)]="doProp.propertiesChange.val">
    </nz-modal>
  `,


  styles: [
    `      
    `
  ]
})
export class ShowPropertiesComponent{

  @Input() properties: Properties[];
  @Input() write: boolean;
  isVisible: boolean;
  doProp: PropertiesChangeDto;

  constructor(private http: HttpClient) { }

  change(evt,prop,index) {
    this.doProp = new PropertiesChangeDto(prop,index);
    this.isVisible = true;
  }

  cancel() {
    this.isVisible = false;
    this.doProp = undefined;
  }

  ok() {
    if (this.properties[this.doProp.index].val !== this.doProp.propertiesChange.val) {
      this.properties[this.doProp.index].changeVal = this.doProp.propertiesChange.val;
    } else {
      this.properties[this.doProp.index].changeVal = undefined;
    }
    this.isVisible = false;
    this.doProp = undefined;
  }


}


export class PropertiesChangeDto{

  properties: Properties;
  propertiesChange: Properties;
  index: number;

  constructor(prop: Properties,index: number) {
    this.index = index;
    this.properties = prop;
    this.propertiesChange = <Properties>JSON.parse(JSON.stringify(prop));
  }
}
