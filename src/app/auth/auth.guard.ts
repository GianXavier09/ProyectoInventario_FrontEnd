import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  //Si la ruta requiere un rol específico
  const expectedRole = route.data['role'];
  const userRole = authService.getRole();
 
  if (expectedRole && userRole !== expectedRole) {
    router.navigate(['/unauthorized']);
    return false;
  }
 
  return true;
};
