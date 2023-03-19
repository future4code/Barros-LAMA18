# Projeto de back-end: Labenu Music Awards (LAMA)

</br>

<div align="center">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width='40px' />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width='40px'/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain.svg" width='40px'/>
</div>

</br>

> Este projeto tem como objetivo criar uma API para um festival de música fictício: O Labenu Music Awards, ou LAMA. Um festival que reúne bandas para a formatura dos alunos; o sistema deve controlar o cadastro de bandas e de shows que devem acontecer durante um final de semana das 09h as 23h.

## Endpoints criados:

- **Cadastrar um novo usuário no sistema:** do tipo normal ou administrador, retorna um token de validação,
- **Efetuar login:** autentica a senha e retorna um token de validação,
- **Registrar uma banda no sistema:** não aceita nomes de bandas repetidas,
- **Ver detalhes de uma banda**: busca pelo nome completo, por partes do nome ou pelo id,
- **Endpoint de adicionar um show em um dia do evento:** só é possível se já não existir outro show ocupando o mesmo horário,
- **Edpoint de pegar todos os show de uma data:** retorna todos os shows de um dia do fim de semana: sexta, sábado ou domingo

## Endpoints a ser criados no futuro:

- Criar um ingresso,
- Comprar um ingresso para um show,
- Adicionar fotos na galeria de um show,
- Pegar todas as fotos de um show

## Tecnologias utilizadas:

- Node.JS,
- Typescript,
- Express
- Knex,
- MySql
- UUID,
- Jason Web Token,
- Bcryptjs,
- Dotenv,
- Render.com

## Conceitos empregados:

- Programação orientada a objetos,
- Arquitetura em 3 camadas,
- Validação e autenticação

## Documentação:

> Os exemplos de uso dos endpoints podem ser encontrados no arquivo requests.rest

## Instruções para rodar o arquivo localmente

> Baixar o projeto e instalar as dependências

```
git clone https://github.com/future4code/Barros-LAMA18.git
npm install
```

> Configurar um arquivo .env com as seguintes varáveis:

```
DB_USER = 
DB_PASSWORD = 
DB_HOST = 
DB_PORT = 
DB_DATABASE_NAME = 

JWT_KEY = 
ACCESS_TOKEN_EXPIRES_IN = 
```
* Preencher as variáveis com informações do seu banco de dados, uma palavra-passe e um tempo de duração do token.

> Executar as queries do arquivo queries.sql para criar as tabelas