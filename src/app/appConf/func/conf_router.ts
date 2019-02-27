import {Route, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';

/**
 * 注册路由
 * @param routes
 */
export function registerAppRoutes(routes: Routes) {
  AppRouters.regists(routes)
}

export function getAppRoutes() {
  // console.log('AppRouters.routes',AppRouters.routes)
  return AppRouters.routes
}

export class AppRouters {
  static routes: Route[] = []
  static regist (route: Route): void {
    AppRouters.routes.push(route)
  }

  static regists (routes: Routes): void {
    AppRouters.routes = AppRouters.routes.concat(routes)
  }
}
