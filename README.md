# 3Mop Backend

Esta aplicação é o backend de um gerenciador de contatos.

## Requisitos

Para executar esta aplicação é necessário ter os seguintes softwares
instalados em sua máquina:

- Node.js (versão LTS)
- Docker

A instalação do node pode ser feita seguindo passo à passo
na [documentação](https://nodejs.org/en/download) para o seu sistema operacional.

Para instalar o docker, também recomanda-se o passo à passo
da [documentação](https://docs.docker.com/get-docker/) para o seu sistema operacional.

## Instruções para uso

Após clonar e accessar a pasta com o repositório em sem computador,o primeiro
passo é criar um arquivo com as variáveis de ambiente da aplicação.

Em um máquina com Unix/Linux, rode o comando:

```bash
cp ./.example.env .development.env
```

Em uma máquina com Windows, rode o comando:

```bash
copy .\.example.env .development.env
```

Em seguida deve ser feita a instalação das dependências com o comando:

```bash
npm install
```

Antes de executar a aplicação, certifique-se de que o Docker está rodando
em sua máquina com o comando:

```bash
docker info
```

Em seguida, para iniciar o servidor rode o comando abaixo. Ao final, um Swagger
com a documentação dos recuros da API estará disponível em `http://localhost:4000/api/docs`.

```bash
task up
```

Para parar a execução da aplicação, pode-se rodar o comando:

```bash
task stop
```

Para conveniência, o banco de dados pode ser populado com dados
fake executando o comando:

```bash
task db:seed
```

Os dados do banco podem ser visualizados através do utilitário
[Mongo Express](https://github.com/mongo-express/mongo-express). Ele estará disponível em `http://localhost:8081`.
O usuário e senha para accesso estão no arquivo `.development.env`.

A aplicação também dispõe de um coleção do Postman com os recuros
da API para facilitar o uso local. A coleção está disponível em
`./docs/3mop-api.postman_collection.json`.

Para instalar o Postman, basta seguir as orientações da
[documetação](https://www.postman.com/downloads/). Este [passo à passo](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-and-exporting-overview/) contém orientações sobre como
importar um coleção no Postman.
