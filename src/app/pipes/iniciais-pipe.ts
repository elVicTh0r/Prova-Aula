import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'iniciais' })
export class IniciaisPipe implements PipeTransform {
  transform(valor: string | null | undefined): string {
    if (!valor?.trim()) return '';
    const partes = valor.trim().split(/\s+/).filter(p => !['de', 'da', 'do', 'das', 'dos', 'e'].includes(p.toLowerCase()));
    if (!partes.length) return '';
    return (partes[0][0] + (partes.length > 1 ? partes[partes.length - 1][0] : '')).toUpperCase();
  }
}
