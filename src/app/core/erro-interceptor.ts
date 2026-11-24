import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_URL, AuthService } from './auth-service';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
  // inject() deve ser chamado no contexto de injeção, antes dos callbacks.
  const auth = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((erro: HttpErrorResponse) => {
      if (erro.status === 401 && req.url.startsWith(`${API_URL}/auth/`)) {
        auth.sair();
        void router.navigate(['/entrar']);
      }

      // O componente ainda recebe o erro e pode exibir uma mensagem.
      return throwError(() => erro);
    })
  );
};
