import { describe, expect, it } from 'vitest';
import { FormaPagamentoPipe } from './forma-pagamento-pipe';
import { FormaPagamento } from '../models/participante';
describe('FormaPagamentoPipe', () => {
  const pipe = new FormaPagamentoPipe();
  it.each([
    ['pix', 'Pix'], ['cartao', 'Cartão de crédito'], ['boleto', 'Boleto'],
    ['dinheiro', 'Dinheiro'], ['', 'Não informado'], [null, 'Não informado']
  ] as [FormaPagamento | null, string][])('traduz %s', (entrada, saida) => {
    expect(pipe.transform(entrada)).toBe(saida);
  });
});
