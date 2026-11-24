import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth-service';

@Component({
  selector: 'app-entrar',
  imports: [FormsModule, RouterLink],
  templateUrl: './entrar.html',
  styleUrl: './entrar.css'
})
export class Entrar {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  usuario = '';
  senha = '';
  carregando = signal(false);
  erro = signal('');

  entrar(): void {
    if (!this.usuario.trim() || !this.senha || this.carregando()) return;

    this.erro.set('');
    this.carregando.set(true);

    this.auth.entrar(this.usuario.trim(), this.senha).subscribe({
      next: () => {
        this.carregando.set(false);
        void this.router.navigate(['/perfil']);
      },
      error: () => {
        this.carregando.set(false);
        this.erro.set('Usuário ou senha inválidos.');
      }
    });
  }
}
