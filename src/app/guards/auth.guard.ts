import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginManager } from '../managers/login-manager';

export const authGuard: CanActivateFn = () => {
  const login = inject(LoginManager);
  return login.token ? true : inject(Router).createUrlTree(['/login']);
};