import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from "@angular/core";
import {ResultInterceptor} from "./interceptor/ResultInterceptor.interceptor";

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResultInterceptor, multi: true}
  ]
})

export class HttpInterceptorModule { }
