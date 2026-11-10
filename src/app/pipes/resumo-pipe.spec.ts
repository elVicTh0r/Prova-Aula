import { describe, expect, it } from 'vitest';
import { ResumoPipe } from './resumo-pipe';
describe('ResumoPipe', () => {
  const pipe = new ResumoPipe();
  it('usa limite padrao', () => expect(pipe.transform('Semana de Tecnologia da Unijorge com palestras e oficinas')).toBe('Semana de Tecnologia da…'));
  it('aceita limite customizado', () => expect(pipe.transform('Semana de Tecnologia da Unijorge com palestras e oficinas', 40)).toBe('Semana de Tecnologia da Unijorge com…'));
  it('aceita vazio', () => expect(pipe.transform('   ')).toBe(''));
});
