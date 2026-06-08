import type { Metadata } from 'next'
import { APP_NAME, TAX_REFERENCE_LABEL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Termos de uso e isenção de responsabilidade.',
}

export default function AvisoLegalPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl prose dark:prose-invert">
      <h1>Aviso legal</h1>

      <h2>Natureza do conteúdo</h2>
      <p>
        Todo o conteúdo disponibilizado pelo {APP_NAME} tem caráter
        exclusivamente <strong>educacional e informativo</strong>. Nenhuma
        informação aqui apresentada constitui oferta, recomendação,
        aconselhamento ou consultoria de investimentos, nos termos da Resolução
        CVM nº 20/2021.
      </p>

      <h2>Resultados de calculadoras</h2>
      <p>
        Os resultados apresentados pelas calculadoras e pelo comparador são
        <strong> estimativas simplificadas</strong> baseadas em premissas
        informadas pelo usuário. Podem divergir dos valores reais devido a
        variações de mercado, regras específicas de cada emissor, custos
        operacionais e outras variáveis não contempladas.
      </p>

      <h2>Rentabilidade</h2>
      <p>
        <strong>Rentabilidade passada não garante rentabilidade futura.</strong>{' '}
        Todo investimento envolve riscos, incluindo a possibilidade de perda do
        capital investido.
      </p>

      <h2>Tributação</h2>
      <p>
        As alíquotas e regras tributárias utilizadas refletem a legislação
        vigente na data de referência ({TAX_REFERENCE_LABEL}). Alterações na
        legislação podem tornar essas informações desatualizadas. Consulte a
        Receita Federal ou um profissional habilitado para orientação fiscal
        específica.
      </p>

      <h2>Recomendação</h2>
      <p>
        Antes de tomar qualquer decisão de investimento, consulte um
        profissional certificado (planejador financeiro, analista CNPI ou
        consultor CVM). Cada investidor tem perfil de risco, objetivos e
        situação financeira distintos.
      </p>

      <h2>Privacidade</h2>
      <p>
        O {APP_NAME} não coleta dados financeiros sensíveis. Os cenários e
        cálculos salvos são armazenados de forma segura e vinculados
        exclusivamente à conta do usuário, conforme a LGPD (Lei nº
        13.709/2018).
      </p>
    </div>
  )
}
