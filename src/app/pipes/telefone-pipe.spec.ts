import { describe, expect, it } from 'vitest';
import { TelefonePipe } from './telefone-pipe';
describe('TelefonePipe', () => {
  const pipe = new TelefonePipe();
  it.each([
    ['71988887777', '(71) 98888-7777'],
    ['7133334444', '(71) 3333-4444'],
    ['(71) 98888-7777', '(71) 98888-7777'],
    ['123', '123'],
    [null, ''],
    ['', '']
  ])('formata %s', (entrada, saida) => expect(pipe.transform(entrada)).toBe(saida));
});
