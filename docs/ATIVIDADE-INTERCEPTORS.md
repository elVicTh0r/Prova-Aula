# Atividade de Interceptors — Agenda UniJorge

Implementação isolada no projeto existente, sem alterar o CRUD de eventos, participantes ou Pipes.

## Objetivos

1. `AuthService`: entrar, perfil, token e sair.
2. Rota `/entrar` com mensagens de erro e login pela API DummyJSON.
3. `authInterceptor` adicionando `Authorization: Bearer ...` somente à API de autenticação.
4. Rota `/perfil` apresentando os dados do usuário.
5. `CepService` integrando ViaCEP, traduzindo o DTO para o endereço da tela.
6. `erroInterceptor` limpando o token e voltando ao login em respostas 401 da API.
7. Desafio extra: `authGuard` evita navegação direta a `/perfil` sem token.

## Executar

```bash
npm ci
npm start
```

Acesse `http://localhost:4200/entrar`.

**Credenciais de teste:** usuário `emilys`, senha `emilyspass`.

**CEP para testar:** `40140-110`. CEP inexistente: `99999-999`.

## Evidências no navegador

- Login com a senha correta: redireciona ao perfil.
- Senha errada: mensagem de credenciais inválidas.
- Na aba Network do DevTools: `/auth/me` deve conter `Authorization: Bearer ...`.
- A requisição `viacep.com.br` **não** deve conter `Authorization`.
- CEP inexistente devolve `erro` no JSON e a tela mostra "CEP não encontrado".
- Para simular credencial inválida, execute no console:
  ```javascript
  localStorage.setItem('token', 'inventado');
  location.reload();
  ```
  A API responde 401 e o app redireciona para `/entrar`.

## Compilar

```bash
npm run build
```

## Observações

- O projeto existente utiliza Angular 21, SSR/prerenderização e persistência local dos eventos e participantes. Por isso, o serviço verifica `isPlatformBrowser` antes de acessar `localStorage`.
- O Guard atua na navegação, mas a autorização verdadeira é responsabilidade do servidor.
- O uso de localStorage para tokens é didático e corresponde ao exercício. Aplicações reais exigem uma análise de segurança mais ampla, incluindo XSS e gestão de sessão.
- O cadastro de eventos continua disponível em `/eventos/novo`. A atividade foi adicionada como rotas novas, sem forçar autenticação sobre as telas antigas.
