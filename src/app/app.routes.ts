import { Routes } from '@angular/router';
import { CadastroEvento } from './pages/cadastro-evento/cadastro-evento';
import { Entrar } from './pages/entrar/entrar';
import { Perfil } from './pages/perfil/perfil';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'eventos/novo', pathMatch: 'full' },
  { path: 'eventos/novo', component: CadastroEvento },
  { path: 'entrar', component: Entrar },
  { path: 'perfil', component: Perfil, canActivate: [authGuard] },

  // Coringa
  { path: '**', redirectTo: 'eventos/novo' }
];
