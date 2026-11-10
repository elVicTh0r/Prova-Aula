import { describe, expect, it } from 'vitest';
import { DiasParaPipe } from './dias-para-pipe';
describe('DiasParaPipe', () => {
  const pipe = new DiasParaPipe();
  const hoje = new Date(2026, 10, 10);
  it.each([
    ['2026-11-10', 'Hoje'],
    ['2026-11-11', 'Amanhã'],
    ['2026-11-20', 'Faltam 10 dias'],
    ['2026-12-01', 'Faltam 21 dias'],
    ['2026-11-09', 'Encerrado'],
    ['', '']
  ])('calcula %s', (entrada, saida) => expect(pipe.transform(entrada, hoje)).toBe(saida));
});
