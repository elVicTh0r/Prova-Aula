import { describe, expect, it } from 'vitest';
import { MascaraEmailPipe } from './mascara-email-pipe';
describe('MascaraEmailPipe', () => {
  const pipe = new MascaraEmailPipe();
  it('mascara usuario mantendo dominio', () => expect(pipe.transform('joaopedro12@gmail.com')).toBe('jo*********@gmail.com'));
  it('aceita vazio', () => expect(pipe.transform('')).toBe(''));
});
