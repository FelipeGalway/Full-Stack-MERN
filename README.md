# 📋 Gerenciador de Registros com MERN Stack

Este projeto é um sistema de gerenciamento de registros desenvolvido com a stack MERN (MongoDB, Express, React, Node.js). Ele permite **criar, editar, listar e excluir registros de pessoas** com atributos como **nome, cargo e nível**. Ideal para aprender ou praticar aplicações full stack com persistência de dados em banco NoSQL.

---

## 🚀 Funcionalidades

🔹 **1. Back-End com Express + MongoDB**

- Conexão com MongoDB Atlas (ou local).

- API RESTful com rotas para **CRUD completo**.

- Suporte a atualizações parciais via `PATCH`.

- Validação de dados recebidos (campos obrigatórios, níveis válidos).

🔹 **2. Front-End com React**

- Interface web moderna com React e React Router.

- Componentes para criar, listar e editar registros.

- Botões de ação (editar/excluir) diretamente na tabela.

- Validações de formulário: todos os campos obrigatórios no cadastro.

🔹 **3. Integração Front-End ↔ Back-End**

- Requisições `fetch` para as rotas da API.

- Operações de CRUD completas conectando interface e banco de dados.

- Interface e servidor desacoplados.

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
├── backend/
│   ├── db/
│   │   └── conn.mjs              # Conexão com MongoDB
│   ├── routes/
│   │   └── record.mjs            # Rotas da API (GET, POST, PATCH, DELETE)
│   ├── .env                      # Variáveis de ambiente
│   ├── loadEnvironment.mjs
│   ├── server.mjs                # Inicialização do servidor
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── header.js         # Cabeçalho com avatar
│       │   ├── footer.js         # Rodapé fixo com avatar
│       │   ├── recordList.js     # Lista de registros
│       │   ├── create.js         # Formulário de criação
│       │   ├── edit.js           # Formulário de edição
│       │   └── styles.css        # Estilo global de header/footer
│       ├── App.js
│       └── index.js
│
├── .gitignore
└── README.md
```

---

## 📥 Como Rodar o Projeto

### ✅ Passo 1: Clonar o repositório

```bash
git clone https://github.com/seu-usuario/mern-records-app.git
cd mern-registros
```

### ✅ Passo 2: Configurar variáveis de ambiente

- Crie um arquivo `.env` na pasta `backend/` com o seguinte conteúdo:

```bash
ATLAS_URI=mongodb://localhost:27017/meubanco  # ou URL do MongoDB Atlas
PORT=5050
```
⚠️ Use sua URL do MongoDB Atlas se for utilizar o banco em nuvem.

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

- 📋 Visualizar lista de registros em tabela

- ➕ Criar novos registros (com validação)

- ✏️ Editar registros (atualização parcial ou total)

- ❌ Excluir registros

- 🔄 Navegação sem recarregar a página (SPA)

- ✅ Validação de campos obrigatórios e níveis válidos

---

## ✅ Rotas da API

| Método | Rota          | Descrição                   |
|--------|---------------|-----------------------------|
| GET    | `/records`     | Lista todos os registros    |
| GET    | `/records/:id` | Retorna um registro por ID  |
| POST   | `/records`     | Cria um novo registro       |
| PATCH  | `/records/:id` | Atualiza um registro por ID |
| DELETE | `/records/:id` | Remove um registro por ID   |

---

## 🛠️ Observações

- O campo nível deve ser um dos seguintes: Júnior, Pleno, Sênior.

- O front-end está 100% em português (inclusive os campos).

- Os nomes dos campos na API foram adaptados: nome, cargo, nivel.

- O projeto possui cabeçalho e rodapé fixos com avatar.

- A navegação é feita com React Router e todas as páginas são SPA.