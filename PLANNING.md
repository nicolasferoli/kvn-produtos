# KVN Produtos - Planejamento

## Visão Geral

KVN Produtos é uma plataforma inovadora desenvolvida para empreendedores digitais iniciantes que desejam criar produtos digitais lucrativos sem experiência prévia. A ferramenta combina inteligência artificial (GPT-4o mini e DALL-E 3) com conhecimento de marketing digital para guiar o usuário na criação de funis de vendas completos.

## Conceito Principal

Um sistema de fluxo guiado (wizard) que transforma uma simples ideia de nicho em um funil de vendas completo com produto principal, order bumps, upsell e downsell, além de estratégias de tráfego, conteúdo e lançamento.

## Stack Tecnológico

- **Frontend**: Next.js, React, TypeScript
- **Estilização**: Tailwind CSS, Shadcn UI, Radix UI
- **Backend**: Next.js API Routes, Supabase
- **Banco de Dados**: PostgreSQL (via Supabase)
- **Autenticação**: Supabase Auth
- **Armazenamento**: Supabase Storage
- **Gerenciamento de Estado**: React Query
- **Deploy**: Vercel

## Componentes do Sistema

### A. Interface Principal e Gerenciamento

1. **Tela de Boas-vindas e Dashboard**
    - Login/registro simplificado
    - Dashboard de projetos existentes
    - Botão destacado "Criar Meu Primeiro Produto"
    - Tour guiado para novos usuários

2. **Gerenciador de Projetos**
    - Lista de produtos criados com status
    - Miniaturas com informações básicas
    - Opções para continuar, duplicar, editar ou excluir
    - Exportação de projetos completos

3. **Sistema de Salvamento Automático**
    - Salvamento a cada etapa concluída
    - Opção para salvar manualmente
    - Recuperação de sessão interrompida
    - Indicador de progresso global

### B. Fluxo Linear do Wizard (11 Etapas)

1. **Definição de Nicho**
2. **Criação de Persona**
3. **Avaliação de Viabilidade**
4. **Criação do Produto Principal**
5. **Desenvolvimento de Order Bumps**
6. **Criação de Upsell**
7. **Desenvolvimento de Downsell**
8. **Estratégia de Tráfego**
9. **Plano de Conteúdo**
10. **Calendário de Lançamento**
11. **Resumo e Próximos Passos**

### C. Componentes de Suporte

1. **Sistema de Navegação do Wizard**
2. **Assistente Contextual**
3. **Exportador Multiformato**

### D. Recursos Avançados

1. **Sistema de Duplicação**
2. **Biblioteca de Recursos**
3. **Integração com Plataformas**

## Estrutura de Pastas

```
project/
├── app/                    # Diretório raiz do Next.js (App Router)
│   ├── api/                # Rotas da API Next.js
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/          # Dashboard principal
│   ├── wizard/             # Fluxo do wizard
│   │   ├── [id]/           # Projeto específico
│   │   │   ├── step-1/     # Etapa 1 - Nicho
│   │   │   ├── step-2/     # Etapa 2 - Persona
│   │   │   └── ...         # Outras etapas
│   │   └── new/            # Novo projeto
│   ├── components/         # Componentes React compartilhados
│   │   ├── ui/             # Componentes de UI reutilizáveis
│   │   ├── wizard/         # Componentes específicos do wizard
│   │   ├── dashboard/      # Componentes do dashboard
│   │   └── layout/         # Componentes de layout
│   ├── hooks/              # Hooks personalizados
│   │   ├── use-auth.ts
│   │   ├── use-wizard.ts
│   │   └── ...
│   ├── utils/              # Funções utilitárias
│   ├── types/              # Tipos TypeScript
│   ├── lib/                # Bibliotecas compartilhadas
│   │   ├── supabase/       # Cliente e funções do Supabase
│   │   └── ai/             # Integrações com AI (GPT-4o, DALL-E)
│   ├── styles/             # Estilos globais
│   └── layout.tsx          # Layout padrão da aplicação
├── public/                 # Arquivos públicos estáticos
├── shared/                 # Código compartilhado entre server e client
│   ├── types/              # Tipos TypeScript compartilhados
│   └── utils/              # Funções utilitárias compartilhadas
├── .eslintrc.js            # Configuração do ESLint
├── .prettierrc             # Configuração do Prettier
├── tsconfig.json           # Configuração do TypeScript
├── tailwind.config.js      # Configuração do Tailwind CSS
├── package.json            # Dependências e scripts do projeto
└── README.md               # Documentação do projeto
```

## Modelo de Dados (Supabase)

### Tabelas Principais

1. **users**
   - Gerenciada pelo Supabase Auth
   - Informações de perfil básicas

2. **projects**
   - id (PK)
   - user_id (FK para users)
   - name
   - description
   - created_at
   - updated_at
   - status (em_progresso, finalizado)
   - current_step
   - metadata (JSON)

3. **wizard_steps**
   - id (PK)
   - project_id (FK para projects)
   - step_number
   - step_name
   - completed
   - data (JSON)
   - created_at
   - updated_at

4. **products**
   - id (PK)
   - project_id (FK para projects)
   - name
   - description
   - type (principal, order_bump, upsell, downsell)
   - price
   - image_url
   - created_at
   - updated_at
   - metadata (JSON)

5. **marketing_plans**
   - id (PK)
   - project_id (FK para projects)
   - traffic_strategy (JSON)
   - content_plan (JSON)
   - launch_calendar (JSON)
   - created_at
   - updated_at

### Relacionamentos

- Um usuário pode ter muitos projetos
- Um projeto tem muitas etapas de wizard
- Um projeto tem muitos produtos
- Um projeto tem um plano de marketing

## Fluxo de Experiência do Usuário

1. **Primeiro Acesso**
   - Usuário cria conta ou faz login
   - Visualiza dashboard vazio com mensagem motivacional
   - Clica em "Criar Meu Primeiro Produto"
   - Recebe breve introdução sobre o processo

2. **Progresso pelo Wizard**
   - Segue sequencialmente pelas 11 etapas
   - Cada etapa é salva automaticamente
   - Pode pausar e retomar a qualquer momento
   - Recebe feedback e sugestões contextuais

3. **Conclusão**
   - Recebe parabéns ao finalizar
   - Visualiza dashboard completo do projeto
   - Recebe orientações sobre próximos passos
   - Opções para exportar ou implementar

4. **Gerenciamento**
   - Acessa dashboard com todos os produtos
   - Pode criar novo produto do zero
   - Pode duplicar e modificar existentes
   - Exporta ou compartilha conforme necessidade

## Objetivos da Versão 1.0

1. Implementar sistema completo de autenticação com Supabase
2. Desenvolver dashboard funcional para gerenciamento de projetos
3. Implementar o fluxo completo do wizard com todas as 11 etapas
4. Integrar GPT-4o mini para geração de conteúdo em cada etapa
5. Integrar DALL-E 3 para geração de imagens de produtos
6. Implementar sistema de salvamento automático e recuperação
7. Desenvolver exportador de projetos em PDF e JSON
8. Criar sistema básico de duplicação de projetos

## Prioridades de Desenvolvimento

1. Configuração do ambiente e infraestrutura (Next.js + Supabase)
2. Sistema de autenticação
3. Estruturas de dados principais
4. Dashboard básico
5. Fluxo do wizard - etapas principais
6. Integração com IA
7. Sistema de exportação
8. Recursos avançados

## Considerações de Desempenho e Segurança

1. Implementar prefetch em links de navegação frequente
2. Utilizar React Query para gerenciamento eficiente de estado e cache
3. Implementar validação de dados com Zod
4. Configurar políticas de segurança no Supabase (RLS)
5. Implementar autenticação segura com Supabase Auth
6. Otimizar chamadas à API de IA para minimizar custos
7. Configurar CDN para assets estáticos
8. Implementar rate limiting para APIs sensíveis

## Plano de Implementação

### Fase 1: Fundação
- Configuração do projeto Next.js
- Integração com Supabase
- Implementação do sistema de autenticação
- Criação da estrutura básica do banco de dados

### Fase 2: Core Features
- Dashboard de gerenciamento de projetos
- Estrutura base do wizard
- Implementação das primeiras 3 etapas do wizard
- Sistema de salvamento automático

### Fase 3: IA e Conteúdo
- Integração com GPT-4o mini
- Integração com DALL-E 3
- Implementação das etapas restantes do wizard
- Criação dos geradores de conteúdo

### Fase 4: Finalização
- Sistema de exportação
- Recursos avançados (duplicação, biblioteca)
- Otimizações de desempenho
- Testes e correções de bugs

## Próximos Passos

1. Configurar o projeto Next.js com TypeScript
2. Configurar Supabase para autenticação e banco de dados
3. Instalar Tailwind CSS e Shadcn UI
4. Criar modelos de dados iniciais no Supabase
5. Implementar fluxo básico de autenticação
6. Criar estrutura base do dashboard
7. Iniciar desenvolvimento do wizard 