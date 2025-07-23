# 📋 Gerenciador de Registros com MERN Stack

Este projeto é um sistema de gerenciamento de registros desenvolvido com a stack MERN (MongoDB, Express, React, Node.js). Ele permite criar, editar, listar e excluir registros de pessoas com atributos como nome, cargo e nível. Ideal para aprender ou praticar aplicações full stack com persistência de dados em banco NoSQL.

---

## 🚀 Funcionalidades

🔹 **1. Back-End com Express + MongoDB**

- Conexão com MongoDB Atlas ou local.

- Rotas RESTful para criar, ler, atualizar e deletar registros.

- Uso do MongoDB nativo com ObjectId para consultas por ID.

- Middleware express.json() para processar dados via API.

🔹 **2. Front-End com React**

- Interface web moderna com React e React Router.

- Lista registros em tabela com botões de ação (editar/excluir).

- Formulários para criação e edição de registros com validações básicas.

- Navegação por rotas usando react-router-dom.

🔹 **3. Integração Front-End ↔ Back-End**

- Requisições fetch para as rotas da API.

- Operações de CRUD completas conectando interface e banco de dados.

- Separação entre camadas para facilitar manutenção e extensão do projeto.

---

## 🧰 Tecnologias Utilizadas

🟢 **Node.js** – ambiente de execução JavaScript

⚙️ **Express.js** – servidor backend e API

🍃 **MongoDB** – banco de dados NoSQL

🌐 **React** – biblioteca front-end para SPA

🧭 **React Router** – roteamento de páginas

🎨 **Bootstrap** – estilos visuais e componentes prontos

📦 **dotenv** – gerenciamento de variáveis de ambiente

🛠️ **fetch API** – comunicação front ↔ back

---

## 📁 Estrutura do Projeto

```bash
full-stack-mern/
│
├── backend/
│   └── db/           
│       └── conn.mjs           # Conexão com MongoDB
│   └── routes/
│       └── record.mjs         # Rotas da API (GET, POST, PATCH, DELETE)
│   ├── .env                   # Variáveis de ambiente 
│   ├── loadEnvironment.mjs
│   ├── package-lock.json
│   ├── package.json
│   └── server.mjs             # Arquivo principal do servidor Express
│   
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── navbar.js
│   │   │   ├── recordList.js
│   │   │   ├── create.js
│   │   │   └── edit.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/      
│   ├── .gitignore
│   ├── package-lock.json                    
│   ├── package.json
│   └── README.md
```

---

## 📥 Como Rodar o Projeto

### ✅ Passo 1: Clonar o repositório

```bash
git clone https://github.com/seu-usuario/mern-records-app.git
cd mern-records-app
```

### ✅ Passo 2: Configurar variáveis de ambiente

- Crie um arquivo .env na pasta backend com o seguinte conteúdo:

```bash
ATLAS_URI=mongodb://localhost:27017/meubanco  # ou URL do MongoDB Atlas
DB_NAME=meubanco
PORT=5050
```

### ✅ Passo 3: Instalar dependências

- Back-end:
```bash
cd backend
npm install
```

- Front-end:
```bash
cd ../frontend
npm install
```

### ✅ Passo 4: Iniciar o servidor back-end

```bash
cd backend
node server.mjs
```

- A API estará disponível em: http://localhost:5050

### ✅ Passo 5: Iniciar o front-end React

```bash
cd frontend
npm start
```

- A interface será carregada em: http://localhost:

---

## 🧪 Funcionalidades da Interface Web

- ✅ Visualizar lista de registros em uma tabela.

- ✏️ Editar qualquer registro existente.

- ➕ Criar novos registros.

- ❌ Excluir registros diretamente da tabela.

- Navegação sem recarregar a página.

---

## ✅ Rotas da API

| Método | Rota          | Descrição                   |
|--------|---------------|-----------------------------|
| GET    | `/record`     | Lista todos os registros    |
| GET    | `/record/:id` | Retorna um registro por ID  |
| POST   | `/record`     | Cria um novo registro       |
| PATCH  | `/record/:id` | Atualiza um registro por ID |
| DELETE | `/record/:id` | Remove um registro por ID   |

---

## 🛠️ Observações

- O projeto espera uma instância MongoDB em execução (local ou Atlas).

- O front-end React consome a API em http://localhost:5050/record.

- Você pode customizar os campos facilmente adicionando mais propriedades nos componentes e na API.