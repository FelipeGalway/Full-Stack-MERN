# 📋 Gerenciador de Registros com MERN Stack

Este projeto é um sistema de gerenciamento de registros desenvolvido com a stack MERN (MongoDB, Express, React, Node.js). Ele permite **criar, editar, listar e excluir registros de pessoas** com atributos como **nome, cargo e nível**. Consta com **validações robustas** usando **Joi** no back-end e **Zod** no front-end, oferecendo uma experiência mais segura e consistente. Ideal para aprender ou praticar aplicações full stack com persistência de dados em banco NoSQL.

---

## 🚀 Funcionalidades

🔹 **1. Back-End com Express + MongoDB + Joi**

- Conexão com MongoDB Atlas (ou local).

- API RESTful com rotas para **CRUD completo**.

- Suporte a atualizações parciais via `PATCH`.

- Validação de dados com Joi: garante campos obrigatórios, tipos corretos e níveis permitidos.

🔹 **2. Front-End com React + Zod**

- Interface web moderna com React e React Router.

- Componentes para criar, listar e editar registros.

- Botões de ação (editar/excluir) diretamente na tabela.

- Validação de formulários com Zod: feedback imediato para o usuário.

🔹 **3. Integração Front-End ↔ Back-End**

- Requisições `fetch` para as rotas da API.

- Operações de CRUD completas conectando interface e banco de dados.

- Interface e servidor desacoplados.

---

## 🧰 Tecnologias Utilizadas

| Categoria     | Tecnologias                         |
| ------------- | ----------------------------------- |
| **Back-End**  | Node.js, Express.js, MongoDB, Joi   |
| **Front-End** | React, React Router, Zod, Bootstrap |
| **Geral**     | dotenv, fetch API, CSS Modules      |


---

## 📁 Estrutura do Projeto

```bash
full-stack-mern/
├── backend/
│   ├── db/
│   │   └── conn.mjs               # Conexão com MongoDB
│   │
│   ├── routes/
│   │   └── record.mjs             # Rotas da API (GET, POST, PATCH, DELETE)
│   │
│   ├── validation/
│   │   └── recordSchema.mjs       # Esquemas Joi para validação de registros
│   │
│   ├── .env                       # Variáveis de ambiente
│   ├── loadEnvironment.mjs        # Carregamento de variáveis com dotenv
│   └── server.mjs                 # Inicialização do servidor Express
│
├── frontend/
│   ├── public/                    # Arquivos públicos
│   └── src/
│       ├── components/
│       │   ├── header.js          # Cabeçalho fixo com avatar
│       │   ├── footer.js          # Rodapé fixo com avatar
│       │   ├── recordList.js      # Lista de registros em tabela
│       │   ├── create.js          # Formulário de criação com validação Zod
│       │   ├── edit.js            # Formulário de edição com validação Zod
│       │   └── styles.css         # Estilo global de header/footer
│       │
│       ├── validators/
│       │   └── recordValidator.js # Validação de formulário com Zod
│       │
│       ├── App.js                 # Componente principal com rotas
│       └── index.js               # Ponto de entrada da aplicação React
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

- ➕ Criar novos registros com validação via Zod

- ✏️ Editar registros (atualização parcial ou total)

- ❌ Excluir registros

- 🔄 Navegação sem recarregar a página (SPA)

- ✅ Feedback instantâneo de erros no formulário

---

## 🔐 Validações de Dados

### ✅ Back-End (Joi)

- Validações no corpo das requisições:

    - Campos obrigatórios: nome, cargo, nivel

    - Tipos corretos e tamanhos mínimos

    - O campo nivel aceita apenas: Júnior, Pleno, Sênior

### ✅ Front-End (Zod)

- Validação de formulário antes de enviar ao servidor:

    - Campos obrigatórios e mensagens personalizadas

    - Integração com o estado do React para exibição de erros

---

## 📡 Rotas da API

| Método | Rota          | Descrição                   |
|--------|---------------|-----------------------------|
| GET    | `/records`     | Lista todos os registros    |
| GET    | `/records/:id` | Retorna um registro por ID  |
| POST   | `/records`     | Cria um novo registro       |
| PATCH  | `/records/:id` | Atualiza um registro por ID |
| DELETE | `/records/:id` | Remove um registro por ID   |

---

## 📝 Observações Finais

- O front-end está completamente em português.

- O projeto inclui cabeçalho e rodapé com avatar.

- Ideal para aprender CRUD completo com stack moderna.

- Código limpo, modular e de fácil manutenção.