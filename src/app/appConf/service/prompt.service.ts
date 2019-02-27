///<reference path="../../../assets/js/notyf"/>
///<reference path="../../../assets/js/javaClass"/>
import {Injectable} from "@angular/core";
import {NzMessageService, NzNotificationService} from "ng-zorro-antd";

@Injectable({
  providedIn: 'root',
})
export class PromptService{

  notyf: any;
  notifyId: string;

  constructor(private notifyService: NzNotificationService,private message: NzMessageService) {
    this.notyf = new Notyf({delay:3000});
    // notifyService.config({
    //   nzPlacement: "bottomRight"
    // });
  }

  ok (msg : string) {
    this.message.success(msg);
  }

  info (msg : string) {
    this.message.info(msg);
  }

  error (msg : string) {
    this.message.error(msg);
  }

  warn (msg : string) {
    this.message.warning(msg);
  }

  loadSelf (msg : string) {
    return this.message.loading(msg, { nzDuration: 0,nzAnimate:true }).messageId;
  }

  load (msg : string) {
    this.notifyId = this.message.loading(msg, { nzDuration: 0,nzAnimate:true }).messageId;
    // this.notifyService.info(msg,"");
    // this.notyf.confirm(msg)
  }

  loadEnd (msg? : string, closeId? :string) {
    if (this.notifyId !== undefined && closeId === undefined) {
      this.message.remove(this.notifyId);
      this.notifyId = undefined;
    } else if (closeId !== undefined){
      this.message.remove(closeId);
    }
    // this.notyf.confirm(msg)
  }

}
