import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, map, take, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  private token: string;

  constructor(private store: Store<fromApp.AppState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('token').pipe(
      map((store) => {
        return store.token;
      }),
      filter((token) => !!token),
      exhaustMap((token) => {
        this.token = token;
        if (token != null) {
          request = this.addTokenToHeader(request);
          return next.handle(request);
        }
        return next.handle(request);
      })
    );
  }

  addTokenToHeader(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.token;
    request = request.clone({
      params: new HttpParams().set('auth', token),
    });
    return request;
  }
}
