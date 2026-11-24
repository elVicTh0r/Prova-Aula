import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, PerfilUsuario } from '../../core/auth-service';
import { CepService, Endereco } from '../../core/cep-service';

@Component({
  selector: 'app-perfil',
  imports: [FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly cepService = inject(CepService);
  private readonly router = inject(Router);

  perfil = signal<PerfilUsuario | null>(null);
  endereco = signal<Endereco | null>(null);
  erroPerfil = signal('');
  erroCep = signal('');
  carregandoCep = signal(false);
  cep = '';

  ngOnInit(): void {
    this.auth.perfil().subscribe({
      next: dados => this.perfil.set(dados),
      error: () => this.erroPerfil.set('Não foi possível carregar o perfil.')
    });
  }

  buscarCep(): void {
    if (this.carregandoCep()) return;

    this.erroCep.set('');
    this.endereco.set(null);
    this.carregandoCep.set(true);

    this.cepService.buscar(this.cep).subscribe({
      next: endereco => {
        this.carregandoCep.set(false);
        if (endereco === null) {
          this.erroCep.set('CEP não encontrado.');
        } else {
          this.endereco.set(endereco);
        }
      },
      error: () => {
        this.carregandoCep.set(false);
        this.erroCep.set('CEP inválido ou falha ao consultar o ViaCEP.');
      }
    });
  }

  sair(): void {
    this.auth.sair();
    void this.router.navigate(['/entrar']);
  }
}
