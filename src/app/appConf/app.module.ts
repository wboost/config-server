import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
// 路由
import { RouterModule, Routes } from '@angular/router';
// 引入
import { LayoutMenuComponent } from './layout/menu.component';
import { LayoutTopComponent } from './layout/top.component';
import { LayoutFooterComponent } from './layout/footer.component';
import { LayoutContentComponent } from './layout/content.component';
//详情页
import { AppContentComponent } from './layout/app.content.component';

//测试
import { Test1ContentComponent } from './test/content.component';
import { Test2ContentComponent } from './test/content2.component';

registerLocaleData(zh);

const appRoutes: Routes = [
  { path: 'test1', component: Test1ContentComponent },
  { path: 'test2', component: Test2ContentComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    // 菜单
    LayoutMenuComponent,
    // 顶部栏
    LayoutTopComponent,
    // 底部栏
    LayoutFooterComponent,
    // 详情栏
    LayoutContentComponent,
    AppContentComponent,
    //测试
    Test1ContentComponent,
    Test2ContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false,
        useHash: true
      }
    )
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
