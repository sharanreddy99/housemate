import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('access_token');
    let newrequest = request.clone();
    if (token) {
      newrequest = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
        },
      });
    }

    return next.handle(newrequest).pipe(
      catchError((err) => {
        if (err.status == 401) {
          if (!newrequest.url.includes('logout')) {
            this.authService.logout();
          }
        }

        return throwError(err);
      })
    );
  }
}
