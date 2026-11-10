export type FormaPagamento = 'pix' | 'cartao' | 'boleto' | 'dinheiro' | '';

export interface Participante {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  formaPagamento: FormaPagamento;
  eventoId: number;
}
