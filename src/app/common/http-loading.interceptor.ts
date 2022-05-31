import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'; 
import { Injectable } from '@angular/core';
import { UI } from './UI';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(private ui: UI) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.ui.showLoading();
    return next.handle(request).pipe(
      finalize(() => {
        this.ui.hideLoading();
      })
    ) as Observable<HttpEvent<any>>;
  }
}
