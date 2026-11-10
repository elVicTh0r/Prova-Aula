import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'diasPara' })
export class DiasParaPipe implements PipeTransform {
  transform(data: string | null | undefined, hoje: Date = new Date()): string {
    if (!data) return '';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) return '';
    const [ano, mes, dia] = data.split('-').map(Number);
    const destino = Date.UTC(ano, mes - 1, dia);
    if (new Date(destino).getUTCFullYear() !== ano ||
        new Date(destino).getUTCMonth() !== mes - 1 ||
        new Date(destino).getUTCDate() !== dia) return '';
    const atual = Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const dias = Math.round((destino - atual) / 86400000);
    if (dias < 0) return 'Encerrado';
    if (dias === 0) return 'Hoje';
    if (dias === 1) return 'Amanhã';
    return `Faltam ${dias} dias`;
  }
}
