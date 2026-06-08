import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Landmark, TrendingUp, Bitcoin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Aprender sobre investimentos',
  description:
    'Entenda cada tipo de investimento no mercado brasileiro: renda fixa, ações, FIIs, cripto e mais.',
}

const categories = [
  {
    title: 'Renda Fixa',
    icon: Landmark,
    items: [
      { slug: 'tesouro-selic', label: 'Tesouro Selic' },
      { slug: 'tesouro-prefixado', label: 'Tesouro Prefixado' },
      { slug: 'tesouro-ipca', label: 'Tesouro IPCA+' },
      { slug: 'cdb', label: 'CDB' },
      { slug: 'lci-lca', label: 'LCI / LCA' },
      { slug: 'lc', label: 'LC (Letra de Câmbio)' },
      { slug: 'cri-cra', label: 'CRI / CRA' },
      { slug: 'debentures', label: 'Debêntures' },
      { slug: 'poupanca', label: 'Poupança' },
      { slug: 'fundos-di-rf', label: 'Fundos DI / RF' },
    ],
  },
  {
    title: 'Renda Variável',
    icon: TrendingUp,
    items: [
      { slug: 'acoes', label: 'Ações' },
      { slug: 'fiis', label: 'FIIs' },
      { slug: 'etfs', label: 'ETFs' },
      { slug: 'bdrs', label: 'BDRs' },
      { slug: 'fundos-multimercado', label: 'Fundos Multimercado' },
      { slug: 'opcoes', label: 'Opções', advanced: true },
    ],
  },
  {
    title: 'Criptoativos',
    icon: Bitcoin,
    items: [
      { slug: 'bitcoin', label: 'Bitcoin' },
      { slug: 'ethereum-altcoins', label: 'Ethereum e Altcoins' },
      { slug: 'stablecoins', label: 'Stablecoins' },
      { slug: 'staking-defi', label: 'Staking / DeFi' },
    ],
  },
]

export default function AprenderPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Aprenda sobre investimentos
        </h1>
        <p className="text-muted-foreground text-lg">
          Escolha uma classe de ativo para entender como funciona, quais os
          riscos, a tributação e o que analisar antes de investir.
        </p>
      </div>

      <div className="grid gap-8 max-w-4xl mx-auto">
        {categories.map((cat) => (
          <section key={cat.title}>
            <div className="flex items-center gap-2 mb-4">
              <cat.icon className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">{cat.title}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((item) => (
                <Link key={item.slug} href={`/aprender/${item.slug}`}>
                  <Card className="hover:shadow-md transition-shadow h-full">
                    <CardHeader className="py-4">
                      <CardTitle className="text-base flex items-center gap-2">
                        {item.label}
                        {'advanced' in item && item.advanced && (
                          <Badge variant="secondary" className="text-xs">
                            Avançado
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
