# 🌱 AgroTech Enterprise

> Plataforma de inteligência agrícola para produtores rurais brasileiros.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

<img width="1919" height="873" alt="Captura de tela 2025-12-12 204120" src="https://github.com/user-attachments/assets/688716a3-9fe3-46af-acd6-2ede4c247692" />


## 📋 Índice

- [Sobre](#-sobre)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [API](#-api)
- [Testes](#-testes)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## 🎯 Sobre

O **AgroTech Enterprise** é uma plataforma completa de gestão agrícola que transforma dados em insights visuais para produtores rurais. Com interface moderna e intuitiva, oferece:

- Dashboard interativo com visão geral da fazenda
- Monitoramento climático em tempo real
- Cotações de commodities atualizadas
- Gestão de safras e maquinário
- Assistente de IA agrícola (AgroGPT)
- Análise financeira detalhada

## ✨ Funcionalidades

### 📊 Dashboard
- Visão consolidada de todas as métricas da fazenda
- Cards interativos com clima, mercado e safras
- Seleção de múltiplas fazendas
- Gráficos de evolução de preços

### 🌤️ Clima
- Temperatura, umidade e vento em tempo real
- Previsão para os próximos 5 dias
- Integração com OpenWeatherMap API
- Alertas climáticos

### 📈 Mercado
- Cotações de commodities (Soja, Milho, Café, Algodão, etc.)
- Variação percentual diária
- Histórico de preços
- Fonte: CEPEA/ESALQ

### 🌾 Safras
- Gerenciamento de culturas ativas
- Progresso de plantio e colheita
- Estimativas de produção
- Calendário agrícola

### 🚜 Maquinário
- Inventário de máquinas
- Status de operação e manutenção
- Nível de combustível
- Horas de uso

### 💰 Finanças
- Receitas e despesas
- ROI por safra
- Gráficos comparativos
- Relatórios exportáveis

### 🤖 AgroGPT
- Assistente de IA especializado em agricultura
- Recomendações de plantio baseadas em clima
- Análise de mercado e tendências
- Suporte 24/7

## 🛠️ Tecnologias

### Frontend
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS 4** - Estilização
- **Framer Motion** - Animações
- **Recharts** - Gráficos
- **Radix UI** - Componentes acessíveis
- **Zustand** - Gerenciamento de estado
- **TanStack Query** - Cache de dados
- **Wouter** - Roteamento

### Backend
- **Node.js** - Runtime
- **Express** - Framework HTTP
- **Drizzle ORM** - ORM TypeScript
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas
- **OpenAI API** - Inteligência artificial
- **OpenWeatherMap API** - Dados climáticos

### Testes
- **Vitest** - Framework de testes
- **Testing Library** - Testes de componentes

## 📦 Pré-requisitos

- **Node.js** >= 18.x
- **npm** >= 9.x
- **PostgreSQL** >= 14 (opcional, funciona com dados mock)

## 🚀 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/agrotech.git
cd agrotech
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Acesse a aplicação**
```
http://localhost:5000
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados (opcional - funciona com dados mock)
DATABASE_URL=postgresql://user:password@localhost:5432/agrotech

# Autenticação JWT
JWT_SECRET=sua-chave-secreta-super-segura-aqui

# OpenAI API (opcional - usa respostas mock sem a chave)
OPENAI_API_KEY=sk-...

# OpenWeatherMap API (opcional - usa dados mock sem a chave)
OPENWEATHER_API_KEY=sua-api-key-aqui

# Porta do servidor
PORT=5000
```

### Obter API Keys

| Serviço | URL | Uso |
|---------|-----|-----|
| OpenAI | [platform.openai.com](https://platform.openai.com/api-keys) | Chat IA (AgroGPT) |
| OpenWeatherMap | [openweathermap.org](https://openweathermap.org/api) | Dados climáticos |

> **Nota:** A aplicação funciona sem as API keys usando dados mock.

## 📖 Uso

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run check` | Verifica tipos TypeScript |
| `npm run test` | Executa testes em modo watch |
| `npm run test:run` | Executa testes uma vez |
| `npm run db:push` | Sincroniza schema com banco |

### Navegação

- **/** - Dashboard principal
- **/weather** - Página de clima
- **/market** - Cotações de mercado
- **/crops** - Gestão de safras
- **/machinery** - Maquinário
- **/finance** - Finanças

## 🔌 API

### Autenticação

```bash
# Registro
POST /api/auth/register
{
  "username": "produtor",
  "email": "produtor@fazenda.com",
  "password": "senha123",
  "name": "João da Silva"
}

# Login
POST /api/auth/login
{
  "username": "produtor",
  "password": "senha123"
}

# Usuário atual (autenticado)
GET /api/auth/me
Authorization: Bearer <token>
```

### Clima

```bash
# Clima atual
GET /api/weather/current?location=Sorriso,%20MT

# Previsão 5 dias
GET /api/weather/forecast?location=Sorriso,%20MT
```

### Mercado

```bash
# Todas as cotações
GET /api/market/prices

# Cotação específica
GET /api/market/prices/soja

# Histórico de preços
GET /api/market/history/soja?days=30
```

### Chat IA

```bash
POST /api/chat
{
  "message": "Qual o melhor momento para plantar soja?",
  "context": {
    "farmName": "Fazenda Boa Vista",
    "farmLocation": "Sorriso, MT",
    "activeCrops": ["Soja", "Milho"]
  }
}
```

### Health Check

```bash
GET /api/health
```

## 🧪 Testes

```bash
# Executar todos os testes
npm run test:run

# Modo watch
npm run test

# Com coverage
npm run test -- --coverage
```

### Cobertura

- ✅ Autenticação (hash, JWT)
- ✅ Serviço de mercado
- ✅ Validação de schemas

## 📁 Estrutura do Projeto

```
agrotech/
├── client/                 # Frontend React
│   ├── public/            # Assets estáticos
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   │   ├── chat/      # AgroGPT
│   │   │   ├── dashboard/ # Cards do dashboard
│   │   │   ├── layout/    # Layout principal
│   │   │   └── ui/        # Componentes base (shadcn)
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilitários e stores
│   │   ├── pages/         # Páginas da aplicação
│   │   └── index.css      # Estilos globais
│   └── index.html         # Entry point HTML
├── server/                 # Backend Express
│   ├── middleware/        # Middlewares (auth)
│   ├── services/          # Serviços externos (AI, weather, market)
│   ├── db.ts              # Conexão Drizzle
│   ├── routes.ts          # Rotas da API
│   ├── storage.ts         # Camada de dados
│   └── index.ts           # Entry point
├── shared/                 # Código compartilhado
│   └── schema.ts          # Schemas Drizzle/Zod
├── tests/                  # Testes unitários
├── attached_assets/        # Imagens geradas
├── .env.example           # Template de variáveis
├── drizzle.config.ts      # Configuração Drizzle
├── vite.config.ts         # Configuração Vite
├── vitest.config.ts       # Configuração Vitest
├── tailwind.config.ts     # Configuração Tailwind
├── tsconfig.json          # Configuração TypeScript
└── package.json           # Dependências
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript strict mode
- Siga o ESLint config do projeto
- Escreva testes para novas funcionalidades
- Mantenha componentes pequenos e reutilizáveis

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

**Desenvolvido com 💚 para o agronegócio brasileiro**

[⬆ Voltar ao topo](#-agrotech-enterprise)

</div>
