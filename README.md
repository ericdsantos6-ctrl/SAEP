# 🏥 SAEP Saúde

Sistema web desenvolvido para o projeto **SAEP Saúde**, com o objetivo de permitir o cadastro de usuários e o registro de atividades físicas, utilizando integração entre Front-End, Back-End e banco de dados MySQL.

## 📌 Sobre o projeto

O SAEP Saúde é uma aplicação web desenvolvida com **HTML, CSS e JavaScript** no Front-End e **Node.js, Express e MySQL** no Back-End.

O sistema permite:

* 👤 Cadastro de usuários
* 🔐 Login de usuários
* 🏃 Cadastro de atividades físicas
* 📋 Listagem de atividades
* ❤️ Sistema de curtidas
* 💬 Sistema de comentários
* 🏢 Cadastro e consulta de informações da empresa
* 🗄️ Integração com banco de dados MySQL

## 🛠️ Tecnologias utilizadas

### Front-End

* HTML5
* CSS3
* JavaScript

### Back-End

* Node.js
* Express
* CORS
* MySQL2

### Banco de dados

* MySQL

### Ferramentas

* Visual Studio Code
* Git
* GitHub
* Postman

## 📂 Estrutura do projeto

```text
SAEP/
│
├── backend/
│   ├── controllers/
│   │   ├── atividadesController.js
│   │   ├── comentariosController.js
│   │   ├── empresaController.js
│   │   ├── likesController.js
│   │   └── usuariosController.js
│   │
│   ├── models/
│   │   ├── atividadesModel.js
│   │   ├── comentariosModel.js
│   │   ├── empresaModel.js
│   │   ├── likesModel.js
│   │   └── usuariosModel.js
│   │
│   ├── routes/
│   │   ├── comentariosRoutes.js
│   │   ├── empresaRoutes.js
│   │   ├── loginRoutes.js
│   │   └── usuariosRoutes.js
│   │
│   ├── database.js
│   └── server.js
│
├── data/
│   └── atividades.csv
│
├── frontend/
│   ├── app.js
│   ├── index.html
│   └── style.css
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

## 🚀 Como executar o projeto

### 1. Instalar as dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

### 2. Configurar o banco de dados

Crie o banco de dados MySQL com o nome:

```text
saepsaude
```

Depois execute o arquivo SQL do projeto para criar as tabelas necessárias.

### 3. Configurar o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto e coloque as configurações do banco de dados.

Exemplo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=saepsaude
```

### 4. Iniciar o servidor

Execute:

```bash
node backend/server.js
```

O servidor será iniciado em:

```text
http://localhost:3000
```

## 🔗 Principais rotas da API

### Usuários

```text
GET    /usuarios
POST   /usuarios
```

### Login

```text
POST   /login
```

### Atividades

```text
GET    /atividades
POST   /atividades
```

### Curtidas

```text
GET    /likes
POST   /likes
DELETE /likes
```

### Comentários

```text
GET    /comentarios
POST   /comentarios
DELETE /comentarios
```

### Empresa

```text
GET    /empresa
POST   /empresa
```

### Teste do banco

```text
GET /teste-banco
```

## 🗄️ Banco de dados

O banco de dados utilizado no projeto é o **MySQL**, com as seguintes tabelas:

```text
usuarios
atividades
likes
comentarios
empresa
```

As tabelas possuem relacionamentos por meio de chaves estrangeiras.

## 🧪 Testes

As rotas da API podem ser testadas utilizando o **Postman**.

Exemplo de teste de cadastro de usuário:

```json
{
    "nome": "Eric das Mercês",
    "email": "ericteste@email.com",
    "senha": "123456"
}
```

Exemplo de cadastro de atividade:

```json
{
    "usuario_id": 1,
    "titulo": "Caminhada no parque",
    "descricao": "Atividade realizada ao ar livre.",
    "tipo": "caminhada",
    "data_atividade": "2026-08-31",
    "horario": "08:00",
    "distancia": 5.5,
    "duracao": "1 hora",
    "local": "Parque",
    "imagem": ""
}
```

## 🔐 Segurança

Informações sensíveis, como senhas do banco de dados, devem permanecer no arquivo `.env` e não devem ser enviadas para o GitHub.

O arquivo `.env` deve estar incluído no `.gitignore`.

## 👨‍💻 Desenvolvedor

**Eric das Mercês Santos**

Projeto desenvolvido para fins acadêmicos no **SENAI**.

## 📄 Licença

Projeto desenvolvido para fins educacionais.
