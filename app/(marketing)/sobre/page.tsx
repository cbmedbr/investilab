import type { Metadata } from 'next'
import { APP_NAME } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Sobre',
  description: `Conheça o ${APP_NAME} — plataforma educacional de investimentos.`,
}

export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl prose dark:prose-invert">
      <h1>Sobre o {APP_NAME}</h1>
      <p>
        O {APP_NAME} é uma plataforma educacional que ajuda investidores
        brasileiros a entender, calcular e comparar investimentos de forma
        informada e independente.
      </p>
      <h2>Nosso propósito</h2>
      <p>
        Acreditamos que decisões de investimento melhores começam com
        conhecimento. Por isso, oferecemos conteúdo didático, calculadoras
        práticas e um comparador de risco × retorno — tudo gratuito e sem
        recomendações de compra/venda.
      </p>
      <h2>O que o {APP_NAME} não é</h2>
      <ul>
        <li>Não somos consultoria ou assessoria de investimento.</li>
        <li>Não fazemos recomendações de compra, venda ou alocação.</li>
        <li>
          Os resultados das calculadoras são estimativas simplificadas e não
          substituem a análise de um profissional certificado.
        </li>
      </ul>
    </div>
  )
}
