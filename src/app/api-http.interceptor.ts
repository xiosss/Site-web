import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

  jwtToken : String = "";

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((evt : HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          let tab : Array<String> ;
          let enteteAuthorization =
          evt.headers.get("Authorization");
          if (enteteAuthorization != null ) {
            tab = enteteAuthorization.split(/Bearer\s+(.*)$/i);
            if (tab.length > 1) {
              this.jwtToken = tab [1]; }
          }
        }
        (error: HttpErrorResponse) => {
          switch (error.status) {
            case 400:
            case 401:
          }
          return of(null);
        }
      }
    ));
  }    
}
