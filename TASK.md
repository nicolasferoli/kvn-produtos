# KVN Produtos - Tarefas

Este documento serve como registro de tarefas para o desenvolvimento do projeto KVN Produtos. As tarefas são organizadas em três categorias: Em Progresso, Backlog e Concluídas.

## 📋 Em Progresso

### Autenticação
- [ ] Implementar sistema funcional de login/cadastro com Supabase
- [ ] Adicionar validação de email
- [ ] Implementar recuperação de senha

### Estrutura de Dados
- [x] Criar tabela de usuários estendida no Supabase
- [x] Criar tabela de projetos
- [x] Criar tabela de etapas do wizard
- [x] Configurar políticas de segurança (RLS)
- [x] Criar tabela de produtos
- [x] Criar tabela de planos de marketing

## 📚 Backlog

### Dashboard
- [ ] Criar layout principal
- [ ] Desenvolver componente de lista de projetos
- [ ] Implementar funcionalidade de criar novo projeto
- [ ] Adicionar opções de gerenciamento (editar, duplicar, excluir)
- [ ] Implementar página de detalhes do projeto
- [ ] Criar componente de estatísticas do usuário

### Wizard - Fluxo
- [ ] Criar estrutura base do wizard
- [ ] Implementar sistema de navegação entre etapas
- [ ] Desenvolver componente de barra de progresso
- [ ] Implementar sistema de salvamento automático
- [ ] Criar mecanismo de continuação de sessão interrompida

### Wizard - Etapas
- [ ] Etapa 1: Definição de Nicho
  - [ ] Interface de entrada de nicho
  - [ ] Integração com IA para análise
  - [ ] Geração de subnichos rentáveis
  - [ ] Seleção e salvamento de escolha
- [ ] Etapa 2: Criação de Persona
  - [ ] Geração automática baseada no nicho
  - [ ] Editor para customização
  - [ ] Validação de completude
- [ ] Etapa 3: Avaliação de Viabilidade
  - [ ] Cálculo automático de score
  - [ ] Visualização de fatores de sucesso/risco
  - [ ] Recomendações para melhorias
- [ ] Etapa 4: Criação do Produto Principal
  - [ ] Assistente de naming
  - [ ] Gerador de descrição
  - [ ] Criador de storytelling
  - [ ] Integração com DALL-E para imagem
  - [ ] Definição de preço sugerido
- [ ] Etapa 5: Desenvolvimento de Order Bumps
  - [ ] Criação guiada de 5 produtos complementares
  - [ ] Assistente de nomes e descrições
  - [ ] Geração de imagens
  - [ ] Recomendação de preços (R$17-37)
- [ ] Etapa 6: Criação de Upsell
  - [ ] Assistente para produto premium
  - [ ] Gerador de descrição avançada
  - [ ] Criação de oferta com elementos de escassez
  - [ ] Imagem premium gerada automaticamente
  - [ ] Preço sugerido (R$97-197)
- [ ] Etapa 7: Desenvolvimento de Downsell
  - [ ] Criação de alternativa acessível
  - [ ] Gerador de descrição essencial
  - [ ] Storytelling focado em não perder oportunidade
  - [ ] Imagem de capa
  - [ ] Preço sugerido (até R$27)
- [ ] Etapa 8: Estratégia de Tráfego
  - [ ] Análise dos melhores canais para o nicho
  - [ ] Recomendação de orçamento inicial
  - [ ] Geração de palavras-chave
  - [ ] Sugestões de segmentação para anúncios
- [ ] Etapa 9: Plano de Conteúdo
  - [ ] Calendário editorial de 30 dias
  - [ ] Ideias de conteúdo por plataforma
  - [ ] Sequência de emails pré-escritos
  - [ ] Lista de tópicos para conteúdo educativo
- [ ] Etapa 10: Calendário de Lançamento
  - [ ] Cronograma detalhado de 45 dias
  - [ ] Checklists por fase
  - [ ] Marcos críticos e deadlines
  - [ ] Planos de contingência
- [ ] Etapa Final: Resumo e Próximos Passos
  - [ ] Dashboard completo do projeto
  - [ ] Resumo de todos os elementos criados
  - [ ] Visualização de projeções financeiras
  - [ ] Guia de implementação passo a passo

### Integrações IA
- [ ] Configurar API do GPT-4o mini
- [ ] Implementar processos de geração de texto
- [ ] Integrar DALL-E 3 para geração de imagens
- [ ] Criar camada de abstração para chamadas de IA
- [ ] Implementar cache para otimizar chamadas repetidas

### Exportação e Compartilhamento
- [ ] Implementar exportação para PDF
- [ ] Criar exportador JSON
- [ ] Desenvolver opções de compartilhamento
- [ ] Criar visualizações para apresentação

### Recursos Avançados
- [ ] Sistema de duplicação de projetos
- [ ] Biblioteca de recursos por nicho
- [ ] Integrações com plataformas de produtos digitais
- [ ] Sistema de templates para acelerar criação

### Otimização e Performance
- [ ] Implementar prefetch em links de navegação
- [ ] Otimizar carregamento de assets
- [ ] Implementar estratégias de cache
- [ ] Otimizar chamadas de banco de dados
- [ ] Reduzir bundle size com code splitting

### Testes
- [ ] Implementar testes unitários para componentes críticos
- [ ] Criar testes e2e para fluxos principais
- [ ] Testar em diferentes dispositivos e navegadores
- [ ] Validar segurança e proteção de dados

## ✅ Concluídas

### Configuração do Ambiente
- [x] Inicializar o projeto Next.js com TypeScript
- [x] Configurar Tailwind CSS
- [x] Instalar Shadcn UI
- [x] Configurar ESLint e Prettier
- [x] Configurar projeto no Supabase (variáveis de ambiente)

### Autenticação
- [x] Criar estrutura básica da página de login
- [x] Criar estrutura básica da página de cadastro
- [x] Configurar middleware para autorização
- [x] Criar página de verificação de email

### Interface
- [x] Criar landing page
- [x] Criar estrutura básica do dashboard
- [x] Criar estrutura básica do formulário de novo projeto

---

## Descobertos Durante o Trabalho

- [x] Corrigir URL inválida no cliente do Supabase
- [ ] Implementar provedor de tema claro/escuro para alternância
- [ ] Adicionar validação para formulários com feedback visual
- [ ] Implementar componentes de UI adicionais do Shadcn
- [ ] Corrigir tipagem do cookies() no server.ts
- [ ] Otimizar tratamento de erros no middleware
- [ ] Implementar indicadores de loading durante operações assíncronas

---

## Notas

- Priorizar o fluxo completo do wizard antes de implementar recursos avançados
- Considerar feedback de usuários iniciais para ajustar funcionalidades
- Monitorar uso de recursos de IA para controle de custos 