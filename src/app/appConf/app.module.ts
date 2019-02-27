import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
// 路由
import {RouterModule} from '@angular/router';
// 引入
import {LayoutMenuComponent} from './layout/menu.component';
import {LayoutTopComponent} from './layout/top.component';
import {LayoutFooterComponent} from './layout/footer.component';
import {LayoutContentComponent} from './layout/content.component';
//详情页
import {AppContentComponent} from './layout/app.content.component';
//测试
import {HighlightDirective} from './directive/disableText.directive';
import {BisModule} from "../page/common/bis.module";
import {HttpInterceptorModule} from "./app.http.module";
import {SecHeaderDirective} from "./directive/secheader.directive";
import {ClientShowComponent} from "../page/client/client.show.component";
import {ConfigLockComponent} from "../page/config/config.lock.component";
import {ConfigSettingComponent} from "../page/config/config.setting.component";
import {ConfigFirstComponent} from "../page/config/config.first.component";
import {ConfigPublicComponent} from "../page/config/config.public.component";


registerLocaleData(zh);

const routes = [
  {path: 'client_instance', component: ClientShowComponent},
  {path: 'client_restart', component: ConfigLockComponent},
  {path: 'config-setting', component: ConfigSettingComponent},
  {path: 'config-first', component: ConfigFirstComponent},
  {path: 'config-public', component: ConfigPublicComponent},
  {path: 'config-lock', component: ConfigLockComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    SecHeaderDirective,
    // 菜单
    LayoutMenuComponent,
    // 顶部栏
    LayoutTopComponent,
    // 底部栏
    LayoutFooterComponent,
    // 详情栏
    LayoutContentComponent,
    AppContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpInterceptorModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    RouterModule.forRoot(
      routes,
      {
        enableTracing: false,
        useHash: true
      }
    ),
    BisModule
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
