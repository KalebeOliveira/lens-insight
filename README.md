# Lens Insights - Sistema de Análise Inteligente de Tickets

## 🧠 Visão Geral

O **Lens Insights** é um sistema de análise inteligente de tickets que utiliza IA para processar dados de tickets e gerar insights valiosos usando ChatGPT. O sistema oferece uma interface moderna e intuitiva para análise de dados de suporte técnico.

## ✨ Funcionalidades Principais

### 📊 Análises Inteligentes
1. **Tempo Médio de Resolução** - Avalia tempos de resolução e identifica tendências
2. **Distribuição por Categoria** - Analisa a distribuição de tickets por categoria
3. **Custos por Categoria** - Avalia eficiência e distribuição de custos
4. **Causas Raiz Identificadas** - Detecta padrões recorrentes e causas raiz
5. **Análise Preditiva** - Previsões de tendências futuras e necessidades de recursos
6. **Métricas de Performance** - Avalia performance da equipe e do sistema

### 🎯 Recursos do Sistema
- **Upload de dados CSV** - Importação fácil de dados de tickets
- **Análise com IA** - Insights gerados por ChatGPT
- **Dashboard interativo** - Interface com abas para diferentes análises
- **Autenticação** - Sistema de login seguro
- **Interface em espanhol argentino** - Localização completa
- **Design responsivo** - Funciona em desktop e mobile

## 🚀 Como Usar

### Pré-requisitos
1. **Chave da API OpenAI**: Configure a variável de ambiente `OPENAI_API_KEY`
2. **Formato de dados**: Arquivos CSV com campos obrigatórios
3. **Campos obrigatórios**: id, status, category, service, impact, urgency, resolutionTime, cost

### Passos para uso
1. **Fazer login** - Acesse com email e senha
2. **Fazer upload dos dados** - Use o recurso de upload para importar dados de tickets
3. **Gerar insights** - Clique em "Generar Insights con IA"
4. **Revisar resultados** - Navegue pela interface com abas
5. **Aplicar recomendações** - Use os insights para melhorar processos

### Exemplo de formato de dados
```csv
id,status,user,service,category,impact,urgency,resolutionTime,cost,shortDescription
TKT-001,Resolved,Juan Pérez,Email Service,Infrastructure,High,High,2.5,150,Email server down
TKT-002,In Progress,Ana López,Network Service,Infrastructure,Medium,Medium,0,0,Network connectivity issues
```

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **OpenAI GPT-4** - Análise com IA
- **Sonner** - Notificações toast
- **Recharts** - Gráficos e visualizações

## 📁 Estrutura do Projeto

```
lens-insight/
├── app/                    # Páginas e rotas Next.js
│   ├── api/               # Endpoints da API
│   ├── login/             # Página de login
│   └── layout.tsx         # Layout principal
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI
│   ├── ai-insights-panel.tsx
│   └── ticket-detail-modal.tsx
├── lib/                  # Utilitários e lógica
│   ├── ai-analytics.ts   # Funções de análise
│   └── utils.ts          # Utilitários gerais
├── config/               # Configurações
└── public/               # Arquivos estáticos
```

## 🔧 Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto:
```env
OPENAI_API_KEY=sua_chave_da_api_openai_aqui
```

### 3. Executar o projeto
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🎨 Interface

### Características do Design
- **Design moderno** - Interface limpa e profissional
- **Cores azuis** - Tema consistente com o ícone do cérebro
- **Favicon personalizado** - Ícone do cérebro como favicon
- **Responsivo** - Adaptável a diferentes tamanhos de tela
- **Acessibilidade** - Navegação por teclado e leitores de tela

### Componentes Principais
- **Painel de Insights de IA** - Exibe análises em abas organizadas
- **Gráficos dinâmicos** - Visualizações baseadas nos dados carregados
- **Sistema de notificações** - Feedback visual para ações do usuário
- **Modal de detalhes** - Visualização detalhada de tickets

## 🔒 Segurança

- **Validação de dados** - Verificação completa antes do processamento
- **Sanitização de entrada** - Prevenção contra ataques
- **Mensagens de erro seguras** - Não expõem informações sensíveis
- **Autenticação** - Sistema de login com proteção de rotas

## 🚀 Funcionalidades Futuras

### Planejadas
1. **Análise histórica** - Comparar insights ao longo do tempo
2. **Métricas customizadas** - Indicadores definidos pelo usuário
3. **Funcionalidade de exportação** - Gerar relatórios em múltiplos formatos
4. **Monitoramento em tempo real** - Atualizações ao vivo do dashboard
5. **Previsões avançadas** - Integração com modelos de machine learning

### Possíveis Integrações
1. **Sistemas de tickets** - Integração direta com ServiceNow, Jira, etc.
2. **Ferramentas de BI** - Exportação para Power BI, Tableau
3. **Sistemas de notificação** - Geração de alertas para insights críticos
4. **Automação de workflow** - Roteamento automático de tickets baseado em insights

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Problemas com API Key**
   - Verifique se `OPENAI_API_KEY` está configurada corretamente
   - Confirme permissões e cotas da API

2. **Erros de formato de dados**
   - Certifique-se de que o formato CSV está correto
   - Verifique se todos os campos obrigatórios estão presentes
   - Confirme tipos de dados (números para resolutionTime e cost)

3. **Problemas de performance**
   - Conjuntos grandes de dados podem demorar mais para processar
   - Considere amostragem de dados para testes iniciais

## 📞 Suporte

Para suporte técnico ou solicitações de funcionalidades, consulte a documentação do projeto ou entre em contato com a equipe de desenvolvimento.

---

**Lens Insights** - Transformando dados de tickets em insights inteligentes com IA 🧠✨
