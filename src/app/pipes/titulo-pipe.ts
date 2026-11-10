import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'titulo' })
export class TituloPipe implements PipeTransform {
  transform(valor: string | null | undefined): string {
    if (!valor?.trim()) return '';
    const ligacoes = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'ao', 'a', 'o', 'em', 'na', 'no']);
    return valor.trim().toLowerCase().split(/\s+/).map((palavra, i) =>
      i > 0 && ligacoes.has(palavra) ? palavra : palavra[0].toUpperCase() + palavra.slice(1)
    ).join(' ');
  }
}
