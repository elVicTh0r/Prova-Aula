
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Evento } from '../../models/evento';

import {
  validarTitulo,
  validarData,
  validarLocal,
  validarEmail,
  validarVagas
} from '../../models/evento.validacao';

type Campo = 'titulo' | 'data' | 'local' | 'emailResponsavel' | 'vagas';

@Component({
  selector: 'app-cadastro-evento',
  imports: [FormsModule],
  templateUrl: './cadastro-evento.html',
  styleUrl: './cadastro-evento.css'
})
export class CadastroEvento {

  evento: Evento = this.novoEvento();

  eventos: Evento[] = [];

  proximoId = 1;

  tocados: Record<Campo, boolean> = {
    titulo: false,
    data: false,
    local: false,
    emailResponsavel: false,
    vagas: false
  };

  novoEvento(): Evento {
    return {
      id: 0,
      titulo: '',
      data: '',
      local: '',
      emailResponsavel: '',
      vagas: null
    };
  }

  // Validações de todos os campos
  validar(campo: Campo): string | null {
    switch (campo) {
      case 'titulo':
        return validarTitulo(this.evento.titulo);

      case 'data':
        return validarData(this.evento.data);

      case 'local':
        return validarLocal(this.evento.local);

      case 'emailResponsavel':
        return validarEmail(this.evento.emailResponsavel);

      case 'vagas':
        return validarVagas(this.evento.vagas, this.evento.local);
    }
  }

  // Marca o campo como visitado
  marcarTocado(campo: Campo): void {
    this.tocados[campo] = true;
  }

  // Exibe erros apenas após o blur
  erro(campo: Campo): string | null {
    if (!this.tocados[campo]) {
      return null;
    }

    return this.validar(campo);
  }

  // Verifica todos os campos
  get formularioValido(): boolean {
    const campos: Campo[] = [
      'titulo',
      'data',
      'local',
      'emailResponsavel',
      'vagas'
    ];

    return campos.every(campo => this.validar(campo) === null);
  }

  salvar(): void {
    if (!this.formularioValido) {
      return;
    }

    const novo: Evento = {
      ...this.evento,
      id: this.proximoId++
    };

    this.eventos.push(novo);

    // Limpa o formulário
    this.evento = this.novoEvento();

    // Reseta os campos visitados
    this.tocados = {
      titulo: false,
      data: false,
      local: false,
      emailResponsavel: false,
      vagas: false
    };
  }
}
