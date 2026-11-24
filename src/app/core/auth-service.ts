import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { tap } from 'rxjs';

export const API_URL = 'https://dummyjson.com';

interface RespostaLogin {
  accessToken: string;
}

export interface PerfilUsuario {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  entrar(usuario: string, senha: string) {
    return this.http.post<RespostaLogin>(`${API_URL}/auth/login`, {
      username: usuario,
      password: senha,
      expiresInMins: 60
    }).pipe(tap(resposta => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('token', resposta.accessToken);
      }
    }));
  }

  perfil() {
    return this.http.get<PerfilUsuario>(`${API_URL}/auth/me`);
  }

  token(): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem('token')
      : null;
  }

  sair(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}
