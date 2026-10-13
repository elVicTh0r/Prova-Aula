import { Routes } from '@angular/router';
import { CadastroEvento } from './pages/cadastro-evento/cadastro-evento';

export const routes: Routes = [
  { path: '', redirectTo: 'eventos/novo', pathMatch: 'full' },
  { path: 'eventos/novo', component: CadastroEvento },

  // Coringa
  { path: '**', redirectTo: 'eventos/novo' }

];