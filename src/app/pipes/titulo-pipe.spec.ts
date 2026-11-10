import { describe, expect, it } from 'vitest';
import { TituloPipe } from './titulo-pipe';
describe('TituloPipe', () => {
  const pipe = new TituloPipe();
  it.each([
    ['semana de tecnologia da unijorge', 'Semana de Tecnologia da Unijorge'],
    ['DE VOLTA AO CAMPUS', 'De Volta ao Campus'],
    ['   ', '']
  ])('formata %s', (entrada, saida) => expect(pipe.transform(entrada)).toBe(saida));
});
