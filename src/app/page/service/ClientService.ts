import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Result} from "../../appConf/dto/dto.Result";
import {PromptService} from "../../appConf/service/prompt.service";

@Injectable({
  providedIn: 'root',
})
export class ClientService{

  aliveId: any;
  loadingRestartId: string;
  prefix: string = "/client";

  constructor(
    private http: HttpClient,private promptService: PromptService) {}

  fetchClients (){
    return this.http.get<Result>(this.prefix)
  }

  fetchClient (applicationName){
    return this.http.get<Result>(`${this.prefix}/${applicationName}`)
  }

  restart (applicationName:string,profile :string,callback:Function){
    this.http.put<Result>(`${this.prefix}/restart/${applicationName}/${profile}`,{}).subscribe(res => {
      let slf = this;
      let restartDetails = res;
      slf.loadingRestartId = slf.promptService.loadSelf('loading server restart...');
      setTimeout(() => {
        slf.aliveId = setInterval(() => {
          slf.checkAlive(applicationName).subscribe((res) => {
            if (res.data) {
              slf.promptService.ok('restartOk!');
              clearInterval(slf.aliveId);
              slf.promptService.loadEnd('restartOk.',slf.loadingRestartId);
              callback(restartDetails.data);
            } else {
              console.log("nextCheck.");
            }
          }, error1 => {
            console.log("nextCheck.");
          })
        }, 2000);
      },2000);
    });
  }

  checkAlive (applicationName:string){
    return this.http.get<Result>(`${this.prefix}/alive/${applicationName}`,{});
  }

}
