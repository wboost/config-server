import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of, throwError} from "rxjs";
import {catchError, mergeMap} from "rxjs/operators";
import {Result} from "../dto/dto.Result";
import {PromptService} from "../service/prompt.service";

@Injectable()
export class ResultInterceptor implements HttpInterceptor {

  constructor(private promptService : PromptService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const confReq = req.clone({
      headers: req.headers.set('token', '^-^wawo~~~~~')
    });
    this.promptService.load("please wait...");
    return next.handle(confReq).pipe(mergeMap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && event.status === 200)
        return this.handleData(event);//具体处理请求返回数据
      return of(event);
    }), catchError((err: HttpErrorResponse) => this.handleErrorData(err)))
  };

  private handleData(event: HttpResponse<any>): Observable<any> {
    this.promptService.loadEnd();
    let body = <Result>event.body;
    if (body.status === 0 || body.status === undefined) {
      return of(event);
    } else {
      this.promptService.error(body.info.message);
      return throwError(event);
    }
  }

  private handleErrorData(event: HttpErrorResponse): Observable<any> {
    this.promptService.loadEnd();
    return throwError(event);
  }
}
