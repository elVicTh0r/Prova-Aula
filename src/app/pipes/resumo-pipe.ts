import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'resumo' })
export class ResumoPipe implements PipeTransform {
  transform(valor: string | null | undefined, limite = 30): string {
    if (!valor?.trim()) return '';
    const texto = valor.trim();
    if (texto.length <= limite) return texto;
    const trecho = texto.slice(0, Math.max(0, limite));
    const ultimaPalavra = trecho.lastIndexOf(' ');
    return (ultimaPalavra > 0 ? trecho.slice(0, ultimaPalavra) : trecho).trimEnd() + '…';
  }
}
