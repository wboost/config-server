import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApplicationDto, Client} from "../../appConf/dto/dto.client";
import {ClientService} from "../service/ClientService";
import {PromptService} from "../../appConf/service/prompt.service";


@Component({
  selector: 'show-upload',
  template: `
    <div style="float: right;">
      <button nz-button nz-popconfirm [nzTitle]="title" [nzOkText]="okText" (click)="getTitle()" (nzOnConfirm)="upload($event)" nzType="primary" style="margin-right: 5px">
        <i nz-icon type="cloud-upload"></i>
        UPLOAD
      </button>
      <button nz-button nzType="dashed" nz-popconfirm [nzTitle]="restartTitle" [nzOkText]="restartOkText" (click)="getRestartTitle()" (nzOnConfirm)="restartPwd=true">
        <i nz-icon type="reload"></i>
        RESTART
      </button>
      client choose | {{client === undefined?'无':client.name}}
    </div>
    <nz-modal [(nzVisible)]="restartLog" nzTitle="RESTART_LOG" [nzWidth]="1200" (nzOnCancel)="closeLogView()" (nzOnOk)="closeLogView()">
      <pre>
      {{logText}}
        </pre>
    </nz-modal>
    <nz-modal [(nzVisible)]="restartPwd" nzTitle="请输入密码" [nzWidth]="200" (nzOnCancel)="closePwdView()" (nzOnOk)="checkRestart()">
      <input [(ngModel)]="restartPwdText"/>
    </nz-modal>
    `,

  styles: [
    `
      [nz-button] {
        height: 25px;
      }
    `
  ]
})
export class ShowUploadComponent{

  @Input()  client: Client;
  okText: string;
  title: string;
  restartLog:boolean = false;
  logText:string = '';
  restartTitle:string = 'waiting...';
  restartOkText: string = 'waiting...';
  restartPwd: boolean = false;
  restartPwdText: string = '';
  ws: WebSocket;
  @Output() private childOuter = new EventEmitter();
  @Output() private restartEvt = new EventEmitter();

  constructor(private clientService:ClientService,private promptService :PromptService) { }

  upload($event) {
    this.childOuter.emit($event);
  }

  restart() {
    let slf = this;
    this.restartTitle = 'waiting...';
    this.restartTitle = 'waiting...';
    //this.promptService.info("功能未开放");
    // console.log("重启～");
    this.clientService.restart(this.client.name,this.client.profile,(data) => {
      slf.restartEvt.emit();
      this.restartLog = true;
      let dtos = <ApplicationDto[]>data;
      console.log(dtos);
      this.ws = new WebSocket(dtos[0].ws);
      this.ws.onmessage = evt => {
        this.logText += evt.data;
      }
    });
  }


  closeLogView() {
    this.ws.close();
    this.restartLog = false;
    this.logText = '';
  }

  getTitle() {
    if (this.client.name === 'all' && this.client.profile === "public") {
      this.title = '注意！当前修改的为全局配置!';
      this.okText = '确认上传并重启配置中心';
    } else {
      this.title = '修改项: ' + this.client.name + ',配置项: ' + this.client.profile;
      this.okText = '确认上传';
    }
  }

  getRestartTitle() {
    console.log(this.restartPwd);
    if (this.client == undefined) {
      this.restartTitle = '请先选择一个应用!';
      this.restartOkText = '取消';
    } else {
      this.clientService.fetchClient(this.client.name).subscribe(result => {
        this.restartTitle = '当前启动的应用\n|' + this.client.name + "|\n共" + result.data.length + "个\n是否全部重新启动？";
        this.restartOkText = '确认重启全部' + this.client.name + '服务';
      });
    }
  }

  closePwdView() {
    this.restartPwdText = '';
    this.restartPwd = false;
  }

  checkRestart() {
    console.log(this.restartPwdText);
    if (this.restartPwdText === 'hh') {
      this.restartPwdText = '';
      this.restartPwd = false;
      this.restart();
    } else {
      this.promptService.error('不允许执行此操作');
    }
  }
}
