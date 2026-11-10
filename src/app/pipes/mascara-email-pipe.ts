import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'mascaraEmail' })
export class MascaraEmailPipe implements PipeTransform {
  transform(valor: string | null | undefined): string {
    if (!valor) return '';
    const arroba = valor.indexOf('@');
    if (arroba < 0) return valor;
    const usuario = valor.slice(0, arroba);
    return usuario.slice(0, 2) + '*'.repeat(Math.max(0, usuario.length - 2)) + valor.slice(arroba);
  }
}
