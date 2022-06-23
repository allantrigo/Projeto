<h1 align="center">Projeto C214-L6 Grupo 1 - AdonisJS</h1> 

<p align="center">
<img src="https://github.com/allantrigo/projeto-c214-grupo-1/tree/master/docs/readme_images/logo_readme.png" height="300" width="300" >
</p>
<p align="center">Figura 1 - Logo do projeto</p>

A nossa aplicação trata-se de um sistema com a premissa de representar um estoque, o mesmo sendo desenvolvido usando o AdonisJS e Docker.

Desenvolvido para a matéria de Engenharia de Software-(C214), de modo a usar todos os conceitos aprendidos durante as aulas ministradas.

## 💻 Funcionalidades
- Login
- Cadastro de Usuário

# 🌳 Ambiente
Para executar o projeto é necessário possuir o [Node LTS](https://nodejs.org/en/download/) instalado assim como o [Docker](https://docs.docker.com/desktop/windows/install/).

# 🔧 Instalação
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

# 🔨 Preparando o banco
Com as dependências instaladas, é necessário preparar também o banco. Após abrir o Docker, use o seguinte comando para criar a imagem no Docker:
```
yarn db:up
```

Uma vez que o banco de dados estiver montado, é necessário criar o esquema com as migrações e inserir o usuário admin com o seeder. Isso pode ser feito utilizando o comando

```
yarn prepare:db
```

# 🚀 Iniciando o Server
Uma vez que o banco esteja devidamente configurado é possível iniciar o servidor localmente usando o comando
```
yarn dev
```

Com esse comando rodando é possível realizar chamadas na API. Para importar a API no Insomnia basta utilizar do import file e selecionar o arquivo .json que está na pasta docs.

![](/docs/readme_images/insomnia.png)

A partir disso, basta realizar o login com o administrador pela primeira vez e a partir disso é possível criar usuários que poderão utilizar o sistema.

# Estrutura
Segue o esboço em que está idealizado toda a estrutura de nosso projeto:

📂Projeto-C214-Grupo-1/

    📂app/
        📂Controllers/
            📂Http/
                📄AuthController.ts
                📄UsersController.ts
        📂Exceptions/
            📄Handler.ts
        📂Generic/
            📄GenericController.ts
            📄GenericValidator.ts
        📂Middleware/
            📄Auth.ts
            📄SilentAuth.ts
        📂Models/
            📄User.ts
        📂Validators/
            📄AuthValidator.ts
            📄UserValidator.ts
    📂commands/
        📄index.ts
    📂config/
        📄app.ts
        📄auth.ts
        📄bodyparser.ts
        📄cors.ts
        📄database.ts
        📄hash.ts
    📂contracts/
        📄auth.ts
        📄env.ts
        📄events.ts
        📄hash.ts
    📂database/
        📂migrations/
            📄1_users.ts
            📄2_api_tokens.ts
        📂seeders/
            📄User.ts
    📂docs/
        📂readme_images/
            📄insomnia.png
            📄logo_readme.png
        📄Insomnia_2022-05-12.json
    📂providers/
        📄AppProvider.ts
    📂start/
        📄kernel.ts
        📄routes.ts
    📄.adonisrc.json
    📄.editorconfig
    📄.eslintignore
    📄.eslintrc.json
    📄.gitignore
    📄.prettierignore
    📄.prettierrc
    📄ace
    📄ace-manifest.json
    📄docker-compose.yml
    📄env.ts
    📄package.json
    📄README.md
    📄server.ts
    📄tsconfig.json
    📄yarn.lock

# 🛠️ Construído com

**IDE**: [Visual Studio Code](https://code.visualstudio.com/)

**Linguagem**: [TypeScript](https://www.typescriptlang.org/), [AdonisJS](https://adonisjs.com/)

**Gerenciamento de dependências**: [yarn](https://yarnpkg.com/)

**Controle de versões**: [GitHub](https://github.com/)

**Framework de teste**: [JestJs](https://jestjs.io/pt-BR/)


# 💻 Desenvolvido por
## - [Allan Trigo](https://github.com/allantrigo/)
## - [Jessian Ribeiro](https://github.com/JessianCRB)
## - [Henrique Mateus](https://github.com/HenriqueMAlves)

