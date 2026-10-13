
export function validarTitulo(titulo: string): string | null {
  if (titulo.trim().length < 5 || titulo.trim().length > 80) {
    return 'O título deve ter entre 5 e 80 caracteres.';
  }
  return null;
}

export function validarData(data: string): string | null {
  if (!data || !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    return 'A data é obrigatória ou inválida.';
  }

  const hoje = new Date();
  const dataHoje =
    hoje.getFullYear() + '-' +
    String(hoje.getMonth() + 1).padStart(2, '0') + '-' +
    String(hoje.getDate()).padStart(2, '0');

  if (data < dataHoje) {
    return 'A data não pode estar no passado.';
  }

  return null;
}

export function validarLocal(local: string): string | null {
  const locais = [
    'Auditório',
    'Laboratório 1',
    'Laboratório 2',
    'Sala 101'
  ];

  if (!locais.includes(local)) {
    return 'O local não pode ficar em branco ou ser inválido.';
  }

  return null;
}

export function validarEmail(email: string): string | null {
  if (!email.trim()) {
    return 'O e-mail é obrigatório.';
  }

  const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formato.test(email.trim())) {
    return 'E-mail em formato inválido.';
  }

  return null;
}

export function validarVagas(
  vagas: number | null,
  local: string
): string | null {
  if (vagas === null || !Number.isInteger(vagas) ||
      vagas < 1 || vagas > 200) {
    return 'As vagas devem ser um número inteiro de 1 a 200.';
  }

  if (
    (local === 'Laboratório 1' || local === 'Laboratório 2') &&
    vagas > 30
  ) {
    return 'Laboratórios permitem no máximo 30 vagas.';
  }

  return null;
}
