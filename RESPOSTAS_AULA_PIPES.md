# Respostas — Aula de Pipes

1. O objeto deve manter o código `cartao`. Se alterarmos para o texto exibido, a edição e o salvamento podem enviar um valor incompatível com o tipo e com as opções do formulário. O pipe transforma apenas a apresentação.

2. Pegue o título, passe pelo `slice` usando 0 e 10, depois pelo `uppercase`. A saída de `Semana de Tecnologia` é `SEMANA DE` (dez caracteres, incluindo o espaço final).

3. Devolver o original permite visualizar e corrigir dados fora do padrão sem escondê-los ou inventar uma mensagem. A validação deve ocorrer separadamente.

4. O parâmetro `hoje` permite fixar uma data nos testes. Sem ele, os resultados mudariam conforme o dia em que o teste fosse executado.

5. Pipes puros só recalculam quando suas entradas mudam. A passagem da meia-noite não altera automaticamente a entrada `data`, então a tela não atualiza sozinha.

6. Use `computed` (ou uma derivação da lista), pois filtrar participantes altera a coleção exibida. Pipes aqui são para apresentação, não para selecionar registros.

## Desafio: LGPD

Mascarar o e-mail reduz a exposição visual do endereço numa listagem pública. Porém, o pipe não protege o dado real: o e-mail completo ainda existe na memória do navegador e pode aparecer nas respostas de rede, armazenamento ou ferramentas de desenvolvedor.

## Evidências pendentes de execução local

- Capturar a tela temporariamente com `<pre>{{ eventos | json }}</pre>`, confirmar os valores originais e remover a linha.
- Executar `npm test -- --run` e salvar um print dos testes aprovados.
- Executar `npm run build` e registrar o resultado.
- Os arquivos de pipe e testes foram criados diretamente pelo GitHub, não pelo Angular CLI. Se o professor exigir comprovação literal dos comandos `ng g p`, executar a geração pelo CLI em uma cópia de trabalho antes da entrega.
