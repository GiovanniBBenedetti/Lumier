# Lumier - Portal de Blog Escolar

O **Lumier** é uma plataforma desenvolvida para facilitar a comunicação escolar por meio de um **portal institucional de notícias**. Ele permite que administradores publiquem blogs e eventos escolares, enquanto alunos podem visualizar conteúdos, recomendar notícias e acompanhar atividades escolares de forma acessível e interativa.

![image](https://github.com/user-attachments/assets/502b24a5-c3d4-4548-8a4c-15ddb2aa03ff)


---

## 🚀 Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** – Framework React para renderização SSR/CSR e rotas dinâmicas.
- **[Node.js](https://nodejs.org/)** + **[Express](https://expressjs.com/)** – Back-end leve e rápido, com rotas e lógica de API.
- **[MySQL](https://www.mysql.com/)** – Banco de dados relacional para armazenar usuários, notícias, eventos, recados, etc.
- **Microsoft Azure AI Services**
  - **Azure OpenAI** – Para suporte à leitura com inteligência artificial.
  - **Azure Speech** – Transforma o conteúdo do blog em áudio para acessibilidade.

---

## 🎯 Objetivo

A plataforma centraliza a comunicação escolar digital em um ambiente moderno e acessível.  
Ela substitui murais físicos e redes sociais informais com:

- Publicação de **notícias escolares**;
- Gerenciamento de **eventos e feiras**;
- Sistema de **recados por turma**;
- Recurso de **recomendações de conteúdo**;
- **Acessibilidade** por áudio via Azure.

---

## ⚙️ Como iniciar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/lumier.git
cd lumier
```

### 2. Configurar o Banco de Dados (MySQL)

- Crie um banco chamado `lumier`.
- Importe o script `MySqlLumierFinal.sql` que está na pasta do projeto:

```bash
mysql -u root -p lumier < ./database/MySqlLumierFinal.sql
```

### 3. Iniciar o Backend

```bash
cd backend
npm install
node app.js
```

> O backend será executado em `http://localhost:3200`

### 4. Iniciar o Frontend

```bash
cd frontend
npm install
npm run dev
```

> O frontend será executado em `http://localhost:3000`

### 5. Integração com Azure

Configure as variáveis de ambiente no backend:

```env
AZURE_SPEECH_KEY=your_azure_speech_key
AZURE_SPEECH_REGION=your_azure_region
```

---

## 📁 Estrutura do Projeto

- `frontend/` – Projeto Next.js com rotas e componentes visuais.
- `backend/` – API com Express, autenticação JWT e integração com Azure.
- `database/` – Script SQL com estrutura e dados iniciais.

---



