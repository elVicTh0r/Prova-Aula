
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Evento } from '../../models/evento';
import { Participante } from '../../models/participante';

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

  participantes: Participante[] = [];

  proximoParticipanteId = 1;

  proximoId = 1;

  eventoSelecionadoId: number | null = null;
  participanteEmEdicaoId: number | null = null;
  participanteForm: Omit<Participante, 'id' | 'eventoId'> = this.novoParticipante();
  mensagemParticipante = '';

  constructor() {
    this.carregarDados();
  }

  novoParticipante(): Omit<Participante, 'id' | 'eventoId'> {
    return { descricao: '', email: '', telefone: '', formaPagamento: '' };
  }

  private carregarDados(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const eventos = JSON.parse(localStorage.getItem('agenda-eventos') ?? '[]');
      const participantes = JSON.parse(localStorage.getItem('agenda-participantes') ?? '[]');
      if (Array.isArray(eventos)) this.eventos = eventos;
      if (Array.isArray(participantes)) this.participantes = participantes;
      this.proximoId = Math.max(0, ...this.eventos.map(e => e.id)) + 1;
      this.proximoParticipanteId = Math.max(0, ...this.participantes.map(p => p.id)) + 1;
    } catch {
      this.eventos = [];
      this.participantes = [];
    }
  }

  private persistirDados(): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('agenda-eventos', JSON.stringify(this.eventos));
    localStorage.setItem('agenda-participantes', JSON.stringify(this.participantes));
  }

  participantesDoEvento(eventoId: number): Participante[] {
    return this.participantes.filter(p => p.eventoId === eventoId);
  }

  selecionarEvento(eventoId: number): void {
    this.eventoSelecionadoId = eventoId;
    this.cancelarEdicaoParticipante();
  }

  cancelarEdicaoParticipante(): void {
    this.participanteEmEdicaoId = null;
    this.participanteForm = this.novoParticipante();
    this.mensagemParticipante = '';
  }

  get participanteValido(): boolean {
    const p = this.participanteForm;
    return p.descricao.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email.trim()) &&
      p.telefone.trim().length > 0 &&
      p.formaPagamento.trim().length > 0;
  }

  salvarParticipante(): void {
    if (this.eventoSelecionadoId === null || !this.participanteValido) return;
    const evento = this.eventos.find(e => e.id === this.eventoSelecionadoId);
    if (!evento) return;

    if (this.participanteEmEdicaoId === null &&
        this.participantesDoEvento(evento.id).length >= (evento.vagas ?? 0)) {
      this.mensagemParticipante = 'Não há vagas disponíveis para este evento.';
      return;
    }

    const dados = {
      descricao: this.participanteForm.descricao.trim(),
      email: this.participanteForm.email.trim(),
      telefone: this.participanteForm.telefone.trim(),
      formaPagamento: this.participanteForm.formaPagamento.trim()
    };

    if (this.participanteEmEdicaoId !== null) {
      const participante = this.participantes.find(
        p => p.id === this.participanteEmEdicaoId && p.eventoId === evento.id
      );
      if (!participante) return;
      Object.assign(participante, dados);
    } else {
      this.participantes.push({
        id: this.proximoParticipanteId++,
        eventoId: evento.id,
        ...dados
      });
    }
    this.persistirDados();
    this.cancelarEdicaoParticipante();
  }

  editarParticipante(participante: Participante): void {
    if (participante.eventoId !== this.eventoSelecionadoId) return;
    this.participanteEmEdicaoId = participante.id;
    this.participanteForm = {
      descricao: participante.descricao,
      email: participante.email,
      telefone: participante.telefone,
      formaPagamento: participante.formaPagamento
    };
    this.mensagemParticipante = '';
  }

  excluirParticipante(participante: Participante): void {
    if (participante.eventoId !== this.eventoSelecionadoId) return;
    this.participantes = this.participantes.filter(p => p.id !== participante.id);
    if (this.participanteEmEdicaoId === participante.id) this.cancelarEdicaoParticipante();
    this.persistirDados();
  }


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
    this.persistirDados();

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
