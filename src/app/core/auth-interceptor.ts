import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_URL, AuthService } from './auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();

  // Não enviar o token ao login ou a serviços externos, como o ViaCEP.
  const ehNossaApi = req.url.startsWith(`${API_URL}/auth/`);
  const ehLogin = req.url.startsWith(`${API_URL}/auth/login`);

  if (!token || !ehNossaApi || ehLogin) {
    return next(req);
  }

  const comToken = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(comToken);
};
