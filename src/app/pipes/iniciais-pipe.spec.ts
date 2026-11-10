import { describe, expect, it } from 'vitest';
import { IniciaisPipe } from './iniciais-pipe';
describe('IniciaisPipe', () => {
  const pipe = new IniciaisPipe();
  it.each([
    ['Maria da Silva Santos', 'MS'],
    ['  joão   guedes de brito ', 'JB'],
    ['Ana', 'A'],
    ['', '']
  ])('gera iniciais de %s', (entrada, saida) => expect(pipe.transform(entrada)).toBe(saida));
});
