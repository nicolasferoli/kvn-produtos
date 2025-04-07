# KVN Produtos - Regras de Desenvolvimento

Este documento estabelece as regras e padrões de desenvolvimento para o projeto KVN Produtos, utilizando Next.js com Supabase.

## 1. Estrutura e Organização

### 1.1 Estrutura de Pastas

- Seguir a estrutura definida no `PLANNING.md`
- Agrupar componentes por funcionalidade (dashboard, wizard, auth, etc.)
- Manter arquivos de utilidade em `utils/`
- Colocar tipos compartilhados em `shared/types/`
- Organizar hooks personalizados em `hooks/`
- Manter o cliente Supabase e funções relacionadas em `lib/supabase/`

### 1.2 Nomenclatura

- **Diretórios**: usar letras minúsculas com hífens (kebab-case) - Ex: `form-wizard/`
- **Componentes**: usar PascalCase - Ex: `WizardNavigation.tsx`
- **Utilitários e Hooks**: usar camelCase - Ex: `useWizardState.ts`, `formatCurrency.ts`
- **Arquivos de API**: usar kebab-case - Ex: `generate-content.ts`
- **Exports**: preferir exports nomeados ao invés de exports default

### 1.3 Convenções de Arquivos

- Um componente por arquivo
- Limitar arquivos a no máximo 500 linhas
- Dividir componentes grandes em componentes menores
- Manter interfaces e tipos no mesmo arquivo do componente, exceto se forem compartilhados

## 2. Estilo de Código

### 2.1 TypeScript

- Utilizar TypeScript em todo o código
- Preferir `interfaces` a `types` quando apropriado
- Evitar `enums`; usar objetos `const` com asserção `as const`
- Definir tipos para todos os props de componentes
- Usar tipos de retorno explícitos para todas as funções
- Implementar validação com Zod para todos os inputs e formulários

```typescript
// ✅ Bom
interface UserProps {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// ✅ Bom
const PRODUCT_TYPES = {
  MAIN: 'principal',
  ORDER_BUMP: 'order_bump',
  UPSELL: 'upsell',
  DOWNSELL: 'downsell'
} as const;
type ProductType = typeof PRODUCT_TYPES[keyof typeof PRODUCT_TYPES];
```

### 2.2 Componentes React

- Usar componentes funcionais (nunca classes)
- Definir componentes com a palavra-chave `function` e não como arrow functions
- Usar desestruturação para props
- Implementar memoização (useMemo, useCallback) quando apropriado
- Evitar renderizações desnecessárias

```tsx
// ✅ Bom
function ProductCard({ name, description, price, imageUrl }: ProductCardProps) {
  return (
    <div className="rounded-lg shadow-md p-4">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <h3 className="text-lg font-bold mt-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-xl font-bold mt-2">R$ {price}</p>
    </div>
  );
}
```

### 2.3 Estilização

- Usar Tailwind CSS para toda estilização
- Organizar classes Tailwind por categoria (layout, espaçamento, tipografia, cores)
- Usar Shadcn UI e Radix para componentes de interface
- Implementar tema escuro como padrão
- Garantir responsividade para todos os componentes

```tsx
// ✅ Bom
<div className="flex flex-col md:flex-row gap-4 p-4 bg-card text-card-foreground rounded-lg">
  {/* Conteúdo */}
</div>
```

### 2.4 Supabase e Banco de Dados

- Sempre usar o cliente Supabase através de uma abstração consistente
- Implementar Row Level Security (RLS) para todas as tabelas
- Nunca expor chaves de API no cliente
- Usar server actions ou API routes para operações de escrita
- Validar dados antes de enviá-los ao Supabase

```typescript
// ✅ Bom
async function createProject(data: CreateProjectInput) {
  const validated = createProjectSchema.parse(data);
  
  const { data: project, error } = await supabase
    .from('projects')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw new Error(`Erro ao criar projeto: ${error.message}`);
  return project;
}
```

## 3. Gestão de Estado

### 3.1 React Query

- Usar React Query para todas as consultas ao Supabase
- Implementar chaves de query consistentes
- Utilizar prefetching quando apropriado
- Configurar políticas de cache adequadas

```typescript
// ✅ Bom
function useProjects(userId: string) {
  return useQuery({
    queryKey: ['projects', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw new Error(error.message);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
```

### 3.2 Estado Local

- Usar React Context apenas para estado global necessário
- Preferir `useState` para estado local simples
- Implementar `useReducer` para estados complexos

### 3.3 Formulários

- Usar React Hook Form com Zod para validação
- Implementar feedback visual para erros de validação
- Criar componentes de formulário reutilizáveis

```typescript
// ✅ Bom
const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
  price: z.number().min(0, "Preço deve ser positivo")
});

function ProductForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 47
    }
  });
  
  // Resto da implementação...
}
```

## 4. Performance e Otimização

### 4.1 Carregamento e Renderização

- Implementar Server Components quando possível
- Usar Suspense para componentes com carregamento assíncrono
- Implementar lazy loading para componentes pesados
- Otimizar imagens com next/image
- Usar prefetch em links de navegação frequente

```tsx
// ✅ Bom
import { Suspense } from 'react';
import { ProductListSkeleton } from '@/components/skeletons';

export default function ProjectsPage() {
  return (
    <div>
      <h1>Seus Projetos</h1>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </div>
  );
}
```

### 4.2 API e Chamadas de Dados

- Minimizar chamadas à API
- Implementar estratégias de cache
- Otimizar consultas ao Supabase
- Implementar paginação para listas longas

## 5. Autenticação com Supabase

### 5.1 Configuração

- Usar o cliente Supabase SSR para autenticação
- Implementar middleware para verificação de autenticação
- Criar wrappers e hooks consistentes para funcionalidades de auth

```typescript
// ✅ Bom - lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Pode ignorar se chamado de um Server Component
          }
        },
      },
    }
  )
}
```

### 5.2 Proteção de Rotas

- Implementar middleware para redirecionamento de usuários não autenticados
- Criar HOCs para proteção de páginas quando necessário
- Verificar permissões para operações sensíveis

## 6. Integração com IA

### 6.1 Chamadas às APIs

- Implementar abstração para APIs de IA
- Criar camada de cache para resultados de IA
- Implementar rate limiting para evitar uso excessivo
- Fornecer feedback visual durante processamento de IA

```typescript
// ✅ Bom
async function generateProductDescription(prompt: string) {
  try {
    const response = await fetch('/api/ai/generate-description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    
    if (!response.ok) throw new Error('Falha ao gerar descrição');
    return await response.json();
  } catch (error) {
    console.error('Erro ao gerar descrição:', error);
    throw error;
  }
}
```

## 7. Testes e Qualidade

### 7.1 Testes

- Escrever testes unitários para funções de utilidade
- Implementar testes de componentes para funcionalidades críticas
- Criar testes e2e para fluxos principais
- Manter cobertura de código adequada

### 7.2 Linting e Formatação

- Seguir configuração ESLint do projeto
- Usar Prettier para formatação consistente
- Corrigir warnings e erros antes de commits

## 8. Deploy e CI/CD

- Usar Vercel para deploy
- Configurar previews para PRs
- Implementar verificações automatizadas
- Manter secrets e variáveis de ambiente seguras

## 9. Uso do Git

### 9.1 Convenções de Commit

Usar prefixos para mensagens de commit:

- `feat:` para novas funcionalidades
- `fix:` para correções de bugs
- `docs:` para mudanças na documentação
- `style:` para ajustes de formatação
- `refactor:` para refatorações de código
- `test:` para adição ou correção de testes
- `chore:` para tarefas de manutenção

```
feat(wizard): adicionar etapa de criação de persona
```

### 9.2 Branches

- Usar `main` como branch principal
- Criar branches por feature: `feature/nome-da-feature`
- Criar branches para bugs: `fix/descricao-do-bug`
- Fazer merge via Pull Requests

## 10. Documentação

- Manter README atualizado
- Documentar APIs e endpoints
- Usar JSDoc para funções e componentes importantes
- Criar documentação para processos complexos

---

## Exemplos de Código

### Exemplo de Componente

```tsx
interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isNextDisabled?: boolean;
}

function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isNextDisabled = false
}: StepNavigationProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-4">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          disabled={currentStep === 1}
        >
          Anterior
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={isNextDisabled}
        >
          {currentStep === totalSteps ? 'Finalizar' : 'Próximo'}
        </Button>
      </div>
    </div>
  );
}
```

### Exemplo de Hook

```typescript
function useWizardState(projectId: string) {
  const [currentStep, setCurrentStep] = useState(1);
  
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*, wizard_steps(*)')
        .eq('id', projectId)
        .single();
        
      if (error) throw new Error(error.message);
      return data;
    }
  });
  
  useEffect(() => {
    if (project?.current_step) {
      setCurrentStep(project.current_step);
    }
  }, [project]);
  
  const saveStep = useMutation({
    mutationFn: async (stepData: any) => {
      const { data, error } = await supabase
        .from('wizard_steps')
        .upsert({
          project_id: projectId,
          step_number: currentStep,
          data: stepData,
          completed: true,
          updated_at: new Date().toISOString()
        })
        .select();
        
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      // Atualizar o passo atual no projeto
      supabase
        .from('projects')
        .update({ current_step: currentStep + 1 })
        .eq('id', projectId);
    }
  });
  
  const goToNextStep = useCallback(() => {
    setCurrentStep(prev => prev + 1);
  }, []);
  
  const goToPreviousStep = useCallback(() => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  }, []);
  
  return {
    currentStep,
    project,
    isLoading,
    saveStep,
    goToNextStep,
    goToPreviousStep
  };
}
```

### Exemplo de API Route

```typescript
// app/api/ai/generate-product/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const inputSchema = z.object({
  niche: z.string().min(3),
  targetAudience: z.string().min(3),
  priceRange: z.enum(['low', 'medium', 'high']),
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Verificar autenticação
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    // Validar input
    const body = await request.json();
    const validatedInput = inputSchema.safeParse(body);
    
    if (!validatedInput.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validatedInput.error.format() },
        { status: 400 }
      );
    }
    
    const { niche, targetAudience, priceRange } = validatedInput.data;
    
    // Chamada para API de IA
    const completion = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        prompt: `Gere um produto digital para o nicho ${niche}, focado na audiência ${targetAudience}, com preço ${priceRange}.`,
        max_tokens: 500
      })
    });
    
    const aiResponse = await completion.json();
    
    return NextResponse.json({
      product: {
        name: aiResponse.choices[0].text.split('\n')[0],
        description: aiResponse.choices[0].text,
        suggestedPrice: priceRange === 'low' ? 47 : priceRange === 'medium' ? 97 : 197
      }
    });
  } catch (error) {
    console.error('Erro ao gerar produto:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar solicitação' },
      { status: 500 }
    );
  }
}
``` 