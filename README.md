# node-sales

## Running the project

1. Assegure-se de ter o **docker/docker-compose**, bem como um gerenciador de pacotes como **pnpm** (recomednado), **yarn** ou **npm**, instalados em sua máquina.

2. Clone o repositório:

```bash
git clone https://github.com/titi-lima/sales-api.git
```

3. Instale as dependências:

```bash
pnpm install
```

4. Crie um arquivo **.env** na raiz do projeto, com as variáveis de ambiente definidas no arquivo [.env.example](./.env.example).

5. Para rodar o servidor, execute:

```bash
docker compose up
```

_**NOTE**: existem diversas variações do comando docker-compose. Algumas usam hífen, algumas não. Alguma precisam de sudo, outras não. Verifique o que funciona no seu caso e tome de exemplo para as demais instruções._

6. Para rodar as migrations, execute com o servidor rodando em outro terminal:

```bash
pnpm migration
```

7. Voilá! O servidor está rodando.

## Workflows:

### `cd_main.yml`:

- Faz o deploy da branch `main` no Dokku a cada push;
- Requer duas variáveis de ambiente _no repositório_: `PRIVATE_KEY` e `HOST`.

### `lint.yml`:

- Roda o ESLint, Typescript e o builder em todos os pull requests e em pushes na develop e main;

### `test.yml`:

- Roda os testes de integração em todos os pull requests e em pushes na develop e main;
