import { Pipe, PipeTransform } from '@angular/core';
import { FormaPagamento } from '../models/participante';
@Pipe({ name: 'formaPagamento' })
export class FormaPagamentoPipe implements PipeTransform {
  transform(valor: FormaPagamento | null | undefined): string {
    if (!valor) return 'Não informado';
    const nomes: Record<FormaPagamento, string> = {
      '': 'Não informado',
      pix: 'Pix',
      cartao: 'Cartão de crédito',
      boleto: 'Boleto',
      dinheiro: 'Dinheiro'
    };
    return nomes[valor] ?? 'Não informado';
  }
}
