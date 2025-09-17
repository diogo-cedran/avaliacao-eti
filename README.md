# Gerenciador de Receitas - Tema 2

CRUD completo para gerenciamento de receitas com ingredientes.

## Tecnologias
- Backend: NestJS
- Frontend: React
- Banco: PostgreSQL (Docker)

## Como Executar o Projeto:

### 1. Banco de Dados
Primeiro é necessário subir a base de dados (PostgreSQL)

```bash
cd backend
docker compose up -d
```


### 2. Backend
Inicie o projeto Backend
```bash
cd backend
npm install
npm run start:dev
```

### 3. Frontend
Inicie o projeto Frontend
```bash
cd frontend
npm install
npm start
```

## Acesso
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000