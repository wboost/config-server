import {Component, OnInit} from '@angular/core';
import {Client, Properties} from "../../appConf/dto/dto.client";
import {PropertiesService} from "../service/PropertiesService";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Env} from "../../appConf/dto/dto.env";
import {PromptService} from "../../appConf/service/prompt.service";
import {ClientService} from "../service/ClientService";
import {UploadFile} from "ng-zorro-antd";
import {Observable} from "rxjs";

///<reference path="../../../assets/js/javaClass"/>

@Component({
  selector: 'config-first',
  template: `
    <nz-modal [(nzCancelText)]="nzCancelText" [(nzVisible)]="write" (nzOnOk)="ok()" (nzOnCancel)="this.write = false">
      application.name<input nz-input [(ngModel)]="client.name">
      <br>
      application.profile<input nz-input [(ngModel)]="client.profile">
    </nz-modal>
    <nz-modal [nzTitle]="modalTitle" [nzContent]="modalContent" [nzFooter]="modalFooter" [(nzCancelText)]="nzCancelText" [(nzVisible)]="addProp" (nzOnOk)="okAddProp()"
              (nzOnCancel)="this.addProp = false" nzWidth="800">
      <ng-template #modalTitle>
        初始化配置项
      </ng-template>
      <ng-template #modalContent>
        <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
          <nz-form-item *ngFor="let control of controlArray;let i = index">
            <nz-form-control [nzOffset]="1">
              key:<input nz-input style="width: 240px; margin-right:5px;margin-left:12px;" placeholder="properties.name"
                         [attr.id]="control.id" [formControlName]="control.key">
              val:<input nz-input style="width: 300px; margin-right:5px;margin-left:5px;" placeholder="properties.value"
                         [attr.id]="control.id" [formControlName]="control.val">
              <i nz-icon type="minus-circle-o" class="dynamic-delete-button" (click)="removeField(control,$event)"></i>
              <nz-form-explain
                *ngIf="getFormControl(control.key)?.dirty&&getFormControl(control.key)?.hasError('required')">
                properties.key required
              </nz-form-explain>
              <nz-form-explain
                *ngIf="getFormControl(control.val)?.dirty&&getFormControl(control.val)?.hasError('required')">
                properties.val required
              </nz-form-explain>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-control [nzXs]="{span:24,offset:0}" [nzSm]="{span:20,offset:4}">
              <button nz-button nzType="dashed" style="width:60%" (click)="addField($event)"><i nz-icon type="plus"></i>
                Add Properties
              </button>
            </nz-form-control>
          </nz-form-item>
          <!--<nz-form-item>
            <nz-form-control [nzXs]="{span:24,offset:0}" [nzSm]="{span:20,offset:4}">
              <button nz-button nzType="primary">Submit</button>
            </nz-form-control>
          </nz-form-item>-->
        </form>
      </ng-template>
      <ng-template #modalFooter>
        <nz-upload class="file-upload"
                   [nzBeforeUpload]="resolveFile">
          <button nz-button>
            <i nz-icon type="upload"></i><span>文件解析(yml或properties)</span>
          </button>
        </nz-upload>
        <button nz-button nzType="primary" (click)="okAddProp()">确认</button>
      </ng-template>
    </nz-modal>
    <show-upload [client]="client" sec-header (childOuter)="upload($event)"
                 (restartEvt)="fetchProperties()"></show-upload>
    <show-properties class="show-prop" [properties]="properties"></show-properties>`,
  styles: [
      `
      .file-upload {
        /*position: fixed;
        overflow: auto;*/
        margin-right: 10px;
        display: inline-block;
      }
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
export class ConfigFirstComponent implements OnInit {

  properties: Properties[];
  env: Env;
  client: Client = new Client();
  write: boolean = true;
  addProp: boolean = false;
  nzCancelText: string = null;
  // -----------
  validateForm: FormGroup;
  controlArray: Array<{ id: number, key: string, val: string }> = [];
  initMap: any;

  resolveFile = (file: UploadFile): boolean => {
    this.propertiesService.resolveFile(this.client.name, this.client.profile,file).subscribe(res => {
      let resultObservable = this.propertiesService.fetchInitByApp(this.client.name, this.client.profile);
      this.initForm(resultObservable);
    });
    return false;
  };

  constructor(private propertiesService: PropertiesService, private clientService: ClientService, private fb: FormBuilder, private promptService: PromptService) {
  }

  ok(): void {
    this.write = false;
    this.initMap = new JavaClass.HashMap();
    let resultObservable = this.propertiesService.fetchInitByApp(this.client.name, this.client.profile);
    this.initForm(resultObservable);
  }

  initForm(resultObservable: Observable<Env>): void {
    resultObservable.subscribe(res => {
      this.env = res;
      let change = new Object();
      res.propertySources.forEach(propertySource => {
        let properties = this.propertiesService.resolveProp(propertySource.source);
        properties.forEach(prop => {
          let id = (this.controlArray.length > 0) ? this.controlArray[this.controlArray.length - 1].id + 1 : 0;
          let control = {
            id,
            key: `key${id}`,
            val: `val${id}`
          };
          const index = this.controlArray.push(control);
          this.validateForm.addControl(this.controlArray[index - 1].key, new FormControl(null, Validators.required));
          this.validateForm.addControl(this.controlArray[index - 1].val, new FormControl(null, Validators.required));
          change[control.key] = prop.key;
          change[control.val] = prop.val;
          this.initMap.put(prop.key, prop.val);
        });
      });
      this.validateForm.setValue(change);
      this.addProp = true;
    });
  }

  okAddProp(): void {
    this.write = false;
    this.addProp = false;
    this.properties = [];
    const prop = this.properties;
    const formVal = this.validateForm.value;
    this.controlArray.forEach(obj => {
      let initProp = new Properties().setKey(formVal[obj.key]);
      if (this.initMap.containsKey(formVal[obj.key])) {
        if (formVal[obj.val] !== this.initMap.get(formVal[obj.key])) {
          initProp.setValue(this.initMap.get(formVal[obj.key]));
          initProp.setChangeVal(formVal[obj.val])
        } else {
          initProp.setValue(formVal[obj.val]);
          initProp.setChangeVal(undefined);
        }
      } else {
        initProp.setChangeVal(formVal[obj.val]);
      }
      prop.push(initProp);
    });
    console.log(prop);
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = (this.controlArray.length > 0) ? this.controlArray[this.controlArray.length - 1].id + 1 : 0;

    const control = {
      id,
      key: `key${id}`,
      val: `val${id}`
    };
    const index = this.controlArray.push(control);
    console.log(this.controlArray[this.controlArray.length - 1]);
    this.validateForm.addControl(this.controlArray[index - 1].key, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.controlArray[index - 1].val, new FormControl(null, Validators.required));
  }


  removeField(i: { id: number, key: string, val: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.controlArray.length > 1) {
      const index = this.controlArray.indexOf(i);
      console.log(this.controlArray);
      this.validateForm.removeControl(this.controlArray[index].key);
      this.validateForm.removeControl(this.controlArray[index].val);
      this.controlArray.splice(index, 1);
    }
  }

  getFormControl(name: string): AbstractControl {
    return this.validateForm.controls[name];
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value);
  }

  ngOnInit(): void {
    this.properties = [];
    this.validateForm = this.fb.group({});
  }

  upload($event) {
    this.propertiesService.updateApp(this.client.name, this.client.profile, this.properties).subscribe(res => {
      this.promptService.ok('init properties ok!');
      if (this.client.name === 'all' && this.client.profile === 'public') {
        let slf = this;
        this.clientService.restart(this.client.name, this.client.profile, () => {
          slf.fetchProperties();
        })
      } else {
        this.fetchProperties();
      }
    })
  }

  fetchProperties() {
    this.propertiesService.fetchInitByApp(this.client.name, this.client.profile).subscribe(res => {
      res.propertySources.forEach(propertySource => {
        let properties = this.propertiesService.resolveProp(propertySource.source);
        this.properties = properties;
      })
    })
  }


}
