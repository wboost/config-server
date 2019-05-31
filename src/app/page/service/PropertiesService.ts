import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Result} from "../../appConf/dto/dto.Result";
import {Env} from "../../appConf/dto/dto.env";
import {ApplicationDto, Properties} from "../../appConf/dto/dto.client";
import {UploadFile} from "ng-zorro-antd";

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {

  constructor(
    private http: HttpClient) {}

  fetchAllPublic (){
    return this.http.get<Result>(`/fetch/public/all`)
  }

  fetchInitByApp(application:string,profile: string) {
    return this.http.get<Env>(`/${application}/${profile}`)
  }

  fetchByApp(application: ApplicationDto) {
    return this.http.get<Result>(`/client/properties/${application.applicationName}/${application.id}`)
  }

  updateApp(application:string, profile:string, properties:Properties[]) {
    if (application === 'all' && profile === 'public') {

    }
    return this.http.put<Result>(`/client/${application}/${profile}`,properties)
  }

  resolveFile(application:string, profile:string,file: UploadFile) {
    const formData = new FormData();
    console.log(file.originFileObj);
    formData.append('file', <any>file);
    return this.http.post<Result>(`/client/${application}/${profile}`,formData);
  }

  resolveProp(source: any): Properties[] {
    let properties = [];
    for(let name in source) {
      properties.push({
        key: name,
        val: source[name]
      })
    }
    return properties;
  }


}
