import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Menu} from "../dto/dto.menu";


@Injectable({
  providedIn: 'root',
})
export class AppMenuService {

  constructor(
    private http: HttpClient) { }

  fetchMenus (): Menu[]{
    let json = [{
      "icon":"tool",
      "name":"config",
      "childs":
        [
          {"router":"config-public","name":"public-config","icon":"copy"},
          {"router":"config-first","name":"init-config","icon":"edit"},
          {"router":"config-setting","name":"context-properties","icon":"setting"},
          {"router":"config-lock","name":"config-lock","icon":"lock"}]
    },{
      "icon":"api",
      "name":"client",
      "childs":
        [
          {"router":"/client_instance","name":"instance","icon":"customer-service"},
          {"router":"/client_restart","name":"restart","icon":"customer-service"}]
    }];
    let menuInstances = <Menu[]>json;
    console.log("fetch menu.");
    return menuInstances
  }
}
