import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {ConfigPublicComponent} from "../config/config.public.component";
import {ClientShowComponent} from "../client/client.show.component";
import {ConfigSettingComponent} from "../config/config.setting.component";
import {CommonModule} from "./common.module";
import {ConfigLockComponent} from "../config/config.lock.component";
import {ConfigFirstComponent} from "../config/config.first.component";

@NgModule({
  declarations: [
    ConfigPublicComponent,
    ClientShowComponent,
    ConfigSettingComponent,
    ConfigLockComponent,
    ConfigFirstComponent,
    // 下拉栏
    // ShowDropDownComponent,
    // 配置展示
    // ShowPropertiesComponent,
  ],
  imports: [
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }]
})
export class BisModule { }
