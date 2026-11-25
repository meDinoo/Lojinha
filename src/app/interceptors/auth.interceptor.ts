import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginManager } from '../managers/login-manager';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const login = inject(LoginManager);
  const router = inject(Router);
  const isApiRequest = request.url.startsWith(environment.apiUrl);
  const outgoing = isApiRequest && login.token
    ? request.clone({ setHeaders: { Authorization: `Bearer ${login.token}` } })
    : request;

  return next(outgoing).pipe(catchError((error: unknown) => {
    if (isApiRequest && error instanceof HttpErrorResponse && error.status === 401 && login.token) {
      login.sair();
      void router.navigateByUrl('/login');
    }
    return throwError(() => error);
  }));
};