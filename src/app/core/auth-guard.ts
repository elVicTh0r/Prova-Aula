import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

// Proteção de navegação no navegador; a API continua responsável
// por validar o token em cada requisição.
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.token() ? true : router.createUrlTree(['/entrar']);
};
