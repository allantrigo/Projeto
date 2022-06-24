[![CI](https://github.com/allantrigo/projeto-c214-grupo-1/actions/workflows/node.js.yml/badge.svg)](https://github.com/allantrigo/projeto-c214-grupo-1/actions/workflows/node.js.yml)

<h1 align="center">Projeto C214-L6 Grupo 1 - AdonisJS</h1> 

Projeto desenvolvido usando o AdonisJS e Docker para representar um estoque.

## Funcionalidades
- Login
- Cadastro de Usuário

# Ambiente
Para executar o projeto é necessário possuir o [Node LTS](https://nodejs.org/en/download/) instalado assim como o [Docker](https://docs.docker.com/desktop/windows/install/).

# Instalação
Para instalar o projeto, primeiro é necessário realizar a clonagem dele. Para cloná-lo basta executar o comando de clonagem:
```
git clone https://github.com/allantrigo/projeto-c214-grupo-1.git
```

Este projeto usa o ```yarn``` ao invés do npm, por isso, com o projeto clonado basta então executar o seguinte comando para instalar as dependências.
```
yarn
```

Também é necessário criar um arquivo .env na pasta root do projeto. Ele deve ter o seguinte conteúdo, ou variações dele. A maioria será usada para conectar ao banco.
```
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=Sd84vuP7IzmTCvi0ud-2LgrHvhrU7CGC
DB_CONNECTION=pg
POSTGRES_HOST=localhost
POSTGRES_PORT=5436
POSTGRES_USER=postgres-admin
POSTGRES_PASSWORD=postgres-admin
POSTGRES_DB=postgres_testing
POSTGRES_DB_NAME=postgres
VARCHAR_MAX_LENGTH=255
```

# Preparando o banco
Com as dependências instaladas, é necessário preparar também o banco. Após abrir o Docker, use o seguinte comando para criar a imagem no Docker:
```
yarn db:up
```

Uma vez que o banco de dados estiver montado, é necessário criar o esquema com as migrações e inserir o usuário admin com o seeder. Isso pode ser feito utilizando o comando

```
yarn prepare:db
```

# Iniciando o Server
Uma vez que o banco esteja devidamente configurado é possível iniciar o servidor localmente usando o comando
```
yarn dev
```

Com esse comando rodando é possível realizar chamadas na API. Para importar a API no Insomnia basta utilizar do import file e selecionar o arquivo .json que está na pasta docs.

![](/docs/readme_images/insomnia.png)

A partir disso, basta realizar o login com o administrador pela primeira vez e a partir disso é possível criar usuários que poderão utilizar o sistema.

# Desenvolvido por
## - [Allan Trigo](https://github.com/allantrigo/)
## - [Jessian Ribeiro](https://github.com/JessianCRB)
## - [Henrique Mateus](https://github.com/HenriqueMAlves)

