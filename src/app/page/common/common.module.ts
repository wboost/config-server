import {NgModule} from '@angular/core';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {ShowPropertiesComponent} from "./show.properties";
import {ShowDropDownComponent} from "./show.dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "../../../../node_modules/@angular/platform-browser/animations";
import {ShowUploadComponent} from "./show.update";


@NgModule({
  declarations: [
    // 下拉栏
    ShowDropDownComponent,
    // 配置展示
    ShowPropertiesComponent,
    // 提交展示
    ShowUploadComponent
  ],
  imports: [
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
    ShowDropDownComponent,
    ShowPropertiesComponent,
    ShowUploadComponent
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }]
})
export class CommonModule { }
