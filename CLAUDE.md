# Regras do projeto

@AGENTS.md

- Stack: Next.js (App Router) + TS strict, Tailwind + shadcn/ui, Supabase (@supabase/ssr), Recharts, react-hook-form + zod.
- Idioma e formatação sempre pt-BR; números via lib/format.ts (BRL, vírgula decimal).
- Toda lógica financeira em lib/finance/* como funções puras. Alíquotas e regras tributárias centralizadas em lib/finance/tax.ts com data de referência.
- Chaves server-only (SUPABASE_SERVICE_ROLE_KEY) nunca no client. Escrita de indicadores só na rota /api/indicators.
- RLS habilitado em todas as tabelas de usuário; cada usuário só acessa os próprios dados.
- App é educacional, não recomendação de investimento (Resolução CVM 20). Manter o aviso legal visível nas telas de cálculo/comparação.
- Ao terminar uma fase: build, commit com mensagem clara, resumo do que foi feito.
