
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from './auth-state';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const loggedIn = inject(AuthState).loggedIn();

  if (loggedIn) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
