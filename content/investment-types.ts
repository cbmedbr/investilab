export interface InvestmentTypeContent {
  title: string
  subtitle: string
  category: string
  sections: { heading: string; body: string }[]
  whatToAnalyze?: string[]
}

export const investmentTypes: Record<string, InvestmentTypeContent> = {
  'tesouro-selic': {
    title: 'Tesouro Selic',
    subtitle: 'O investimento mais seguro do Brasil, ideal para reserva de emergência.',
    category: 'Renda Fixa',
    sections: [
      {
        heading: 'O que é',
        body: 'O Tesouro Selic é um título público federal pós-fixado, emitido pelo Tesouro Nacional. Sua rentabilidade acompanha a taxa Selic, a taxa básica de juros da economia brasileira.',
      },
      {
        heading: 'Como funciona',
        body: 'Você empresta dinheiro ao governo federal e recebe de volta com juros. O rendimento é diário e acompanha a Selic. Tem liquidez diária (D+1 útil) e é considerado o investimento de menor risco no Brasil, pois é garantido pelo Tesouro Nacional.',
      },
      {
        heading: 'Riscos',
        body: 'O risco de crédito é o menor possível (governo federal). Não há risco de mercado relevante para resgates no vencimento. Em resgates antecipados, a marcação a mercado é mínima (diferente do Tesouro IPCA+ ou Prefixado).',
      },
      {
        heading: 'Tributação',
        body: 'Incide IR regressivo sobre o rendimento: 22,5% (até 180 dias), 20% (181-360), 17,5% (361-720), 15% (acima de 720 dias). IOF incide se o resgate ocorrer em menos de 30 dias. Há também a taxa de custódia da B3 (0,20% a.a. sobre valores acima de R$ 10 mil).',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Ideal para reserva de emergência, objetivos de curto prazo ou para quem busca segurança máxima. É o benchmark contra o qual outros investimentos de renda fixa são comparados.',
      },
    ],
    whatToAnalyze: [
      'Taxa Selic atual e expectativa de mercado (Boletim Focus)',
      'Prazo do investimento vs. tabela regressiva de IR',
      'Taxa de custódia da B3 (isenta até R$ 10 mil para Tesouro Selic)',
      'Comparação com CDBs de liquidez diária que podem pagar mais de 100% do CDI',
    ],
  },
  'tesouro-prefixado': {
    title: 'Tesouro Prefixado',
    subtitle: 'Taxa fixa definida no momento da compra — você sabe exatamente quanto vai receber no vencimento.',
    category: 'Renda Fixa',
    sections: [
      {
        heading: 'O que é',
        body: 'O Tesouro Prefixado é um título público com taxa de juros fixa, definida no momento da compra. No vencimento, cada unidade vale exatamente R$ 1.000,00.',
      },
      {
        heading: 'Como funciona',
        body: 'Ao comprar, você trava a rentabilidade. Se comprou a 12% a.a., receberá essa taxa até o vencimento, independente da Selic subir ou cair. Existe a versão com juros semestrais (cupons) e sem cupons.',
      },
      {
        heading: 'Riscos',
        body: 'Se vender antes do vencimento, o preço varia conforme a marcação a mercado. Quando as taxas de juros sobem, o preço do título cai (e vice-versa). No vencimento, não há esse risco. Há também o risco de inflação corroer o rendimento real.',
      },
      {
        heading: 'Tributação',
        body: 'IR regressivo sobre o rendimento (22,5% a 15%) e IOF se resgate em menos de 30 dias.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para quem acredita que as taxas de juros vão cair (ganho na marcação a mercado) ou quer travar uma taxa atrativa para um objetivo com data definida.',
      },
    ],
    whatToAnalyze: [
      'Nível atual da taxa prefixada vs. expectativa de Selic futura',
      'Prazo até o vencimento — carregar até o fim elimina risco de mercado',
      'Cenário de inflação — taxa real (prefixado menos inflação) pode ser negativa',
      'Marcação a mercado — se precisar vender antes, pode ter prejuízo',
    ],
  },
  'tesouro-ipca': {
    title: 'Tesouro IPCA+',
    subtitle: 'Proteção contra inflação + juros reais — ideal para objetivos de longo prazo.',
    category: 'Renda Fixa',
    sections: [
      {
        heading: 'O que é',
        body: 'O Tesouro IPCA+ é um título híbrido: paga a variação do IPCA (inflação) mais uma taxa de juros real fixa. Garante poder de compra no vencimento.',
      },
      {
        heading: 'Como funciona',
        body: 'A rentabilidade é composta: IPCA + taxa real (ex: IPCA + 6,5% a.a.). No vencimento, você recebe a correção integral pela inflação mais os juros reais. Existe a versão com juros semestrais.',
      },
      {
        heading: 'Riscos',
        body: 'A marcação a mercado pode ser significativa em prazos longos. Se as taxas reais subirem, o preço do título cai (e vice-versa). No vencimento, não há esse risco.',
      },
      {
        heading: 'Tributação',
        body: 'IR regressivo sobre o rendimento total (22,5% a 15%). IOF se resgate em menos de 30 dias.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para objetivos de longo prazo (aposentadoria, faculdade dos filhos), onde proteger o poder de compra é essencial. Quanto maior o prazo, maior a volatilidade na marcação a mercado, mas também maior o benefício fiscal (IR de 15%).',
      },
    ],
    whatToAnalyze: [
      'Taxa real oferecida (IPCA+) — acima de 6% é historicamente atrativo',
      'Prazo de vencimento vs. seu horizonte de investimento',
      'Volatilidade da marcação a mercado em títulos longos',
      'Se pretende carregar até o vencimento ou pode precisar vender antes',
    ],
  },
  cdb: {
    title: 'CDB',
    subtitle: 'Certificado de Depósito Bancário — empreste para o banco e receba juros.',
    category: 'Renda Fixa',
    sections: [
      {
        heading: 'O que é',
        body: 'O CDB é um título de renda fixa emitido por bancos. Ao investir, você empresta dinheiro ao banco e recebe juros. Pode ser pré, pós (% do CDI) ou indexado ao IPCA.',
      },
      {
        heading: 'Como funciona',
        body: 'Os CDBs mais comuns pagam um percentual do CDI (ex: 110% do CDI). Alguns têm liquidez diária, outros têm carência. O investimento é garantido pelo FGC até R$ 250 mil por CPF por instituição.',
      },
      {
        heading: 'Riscos',
        body: 'Risco de crédito do banco emissor. Bancos menores pagam taxas maiores justamente por terem maior risco. O FGC protege até R$ 250 mil por CPF/instituição (teto de R$ 1 milhão em 4 anos).',
      },
      {
        heading: 'Tributação',
        body: 'IR regressivo sobre o rendimento (22,5% a 15%). IOF se resgate em menos de 30 dias.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para quem busca rendimento acima do Tesouro Selic com proteção do FGC. CDBs de liquidez diária são alternativa para reserva de emergência; CDBs de prazo mais longo pagam taxas melhores.',
      },
    ],
    whatToAnalyze: [
      'Rating de crédito do banco emissor',
      'Cobertura do FGC (até R$ 250 mil por CPF/instituição)',
      'Tipo: pré, pós (% do CDI) ou IPCA+',
      'Prazo e liquidez (diária ou com carência)',
      'Rentabilidade líquida (após IR) vs. alternativas',
    ],
  },
  'lci-lca': {
    title: 'LCI / LCA',
    subtitle: 'Isentas de IR para pessoa física — letras de crédito imobiliário e do agronegócio.',
    category: 'Renda Fixa',
    sections: [
      {
        heading: 'O que é',
        body: 'LCI (Letra de Crédito Imobiliário) e LCA (Letra de Crédito do Agronegócio) são títulos emitidos por bancos, lastreados em créditos imobiliários ou do agronegócio. O grande diferencial é a isenção de IR para pessoa física.',
      },
      {
        heading: 'Como funciona',
        body: 'Funcionam como um CDB, mas com isenção de IR. Geralmente pagam um percentual do CDI (ex: 90% do CDI isento, que pode equivaler a mais de 100% do CDI tributado). Costumam ter carência mínima de 90 dias (LCI) ou 90 dias (LCA).',
      },
      {
        heading: 'Riscos',
        body: 'Risco de crédito do banco emissor, mitigado pelo FGC (até R$ 250 mil). Menor liquidez que CDBs — geralmente têm carência.',
      },
      {
        heading: 'Tributação',
        body: 'Isenta de IR e IOF para pessoa física. Este é o principal atrativo.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para quem busca rendimento líquido superior ao CDB e pode abrir mão de liquidez durante o período de carência. Compare sempre a taxa líquida: 90% do CDI isento pode render mais que 110% do CDI tributado.',
      },
    ],
    whatToAnalyze: [
      'Comparar rentabilidade líquida (isenta) com CDB tributado no mesmo prazo',
      'Prazo de carência — geralmente sem liquidez diária',
      'Rating e solidez do banco emissor',
      'Cobertura do FGC',
    ],
  },
  lc: {
    title: 'LC (Letra de Câmbio)',
    subtitle: 'Título de renda fixa emitido por financeiras — geralmente com taxas atrativas.',
    category: 'Renda Fixa',
    sections: [
      {
        heading: 'O que é',
        body: 'A Letra de Câmbio (LC) é um título de renda fixa emitido por sociedades de crédito, financiamento e investimento (financeiras). Apesar do nome, não tem relação com câmbio de moedas.',
      },
      {
        heading: 'Como funciona',
        body: 'Funciona de forma similar ao CDB, mas é emitida por financeiras (não bancos). Por isso, costuma oferecer taxas maiores. Pode ser pré, pós ou indexada ao IPCA. Também é coberta pelo FGC.',
      },
      {
        heading: 'Riscos',
        body: 'Risco de crédito da financeira emissora (geralmente maior que grandes bancos). FGC protege até R$ 250 mil.',
      },
      {
        heading: 'Tributação',
        body: 'IR regressivo sobre o rendimento (22,5% a 15%). IOF se resgate em menos de 30 dias.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para quem busca taxas acima da média e aceita o risco de crédito de financeiras, com a proteção do FGC.',
      },
    ],
    whatToAnalyze: [
      'Solidez da financeira emissora',
      'Taxa oferecida vs. CDBs de bancos maiores',
      'Prazo e liquidez',
      'Cobertura do FGC',
    ],
  },
  'cri-cra': {
    title: 'CRI / CRA',
    subtitle: 'Certificados de recebíveis — isentos de IR, mas sem FGC.',
    category: 'Renda Fixa',
    sections: [
      {
        heading: 'O que é',
        body: 'CRI (Certificado de Recebíveis Imobiliários) e CRA (Certificado de Recebíveis do Agronegócio) são títulos de crédito privado lastreados em recebíveis desses setores. São emitidos por securitizadoras.',
      },
      {
        heading: 'Como funciona',
        body: 'Funcionam como uma renda fixa com isenção de IR para PF, similar a LCI/LCA, mas sem cobertura do FGC. Geralmente oferecem taxas maiores para compensar o risco adicional. Podem ser indexados ao CDI, IPCA ou prefixados.',
      },
      {
        heading: 'Riscos',
        body: 'Risco de crédito do emissor/devedores dos recebíveis, sem proteção do FGC. Menor liquidez no mercado secundário. Importante analisar o rating e a estrutura da operação.',
      },
      {
        heading: 'Tributação',
        body: 'Isento de IR para pessoa física.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para investidores com mais experiência que buscam rentabilidade líquida superior e aceitam o risco de crédito privado sem FGC.',
      },
    ],
    whatToAnalyze: [
      'Rating de crédito da operação e do devedor',
      'Ausência de cobertura do FGC — risco é do investidor',
      'Estrutura da operação (garantias, subordinação)',
      'Liquidez no mercado secundário',
      'Taxa líquida vs. alternativas com FGC',
    ],
  },
  debentures: {
    title: 'Debêntures',
    subtitle: 'Títulos de dívida de empresas — comuns ou incentivadas (isentas de IR).',
    category: 'Renda Fixa',
    sections: [
      {
        heading: 'O que é',
        body: 'Debêntures são títulos de dívida emitidos por empresas (S.A.) para captar recursos. As debêntures incentivadas (Lei 12.431) financiam projetos de infraestrutura e são isentas de IR para PF.',
      },
      {
        heading: 'Como funciona',
        body: 'A empresa emite debêntures e paga juros ao investidor. Podem ser prefixadas, pós-fixadas ou indexadas ao IPCA. As incentivadas têm isenção de IR; as comuns seguem a tabela regressiva.',
      },
      {
        heading: 'Riscos',
        body: 'Risco de crédito da empresa emissora. Sem cobertura do FGC. Liquidez pode ser limitada no mercado secundário.',
      },
      {
        heading: 'Tributação',
        body: 'Debêntures comuns: IR regressivo (22,5% a 15%). Debêntures incentivadas: isentas de IR para pessoa física.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para investidores que querem diversificar em crédito privado. Incentivadas são atrativas pela isenção de IR; comuns precisam oferecer spread relevante sobre títulos públicos.',
      },
    ],
    whatToAnalyze: [
      'Rating de crédito da empresa emissora',
      'Se é incentivada (isenta de IR) ou comum',
      'Spread sobre o benchmark (CDI ou IPCA)',
      'Garantias e cláusulas de proteção (covenants)',
      'Liquidez no mercado secundário',
    ],
  },
  poupanca: {
    title: 'Poupança',
    subtitle: 'O investimento mais popular do Brasil — simples, mas geralmente com rendimento inferior.',
    category: 'Renda Fixa',
    sections: [
      {
        heading: 'O que é',
        body: 'A caderneta de poupança é a aplicação financeira mais tradicional do Brasil. É isenta de IR para pessoa física e tem proteção do FGC.',
      },
      {
        heading: 'Como funciona',
        body: 'Com Selic acima de 8,5% a.a., rende 0,5% ao mês + TR. Com Selic igual ou abaixo de 8,5%, rende 70% da Selic + TR. O rendimento é creditado na "data de aniversário" (mensal). Se sacar antes, perde o rendimento daquele mês.',
      },
      {
        heading: 'Riscos',
        body: 'Risco mínimo (FGC + garantia do governo para bancos públicos). O maior risco é a perda de poder de compra: frequentemente rende menos que a inflação.',
      },
      {
        heading: 'Tributação',
        body: 'Isenta de IR e IOF para pessoa física.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Pela simplicidade, é acessível a todos. Porém, na maioria dos cenários, o Tesouro Selic ou CDBs de liquidez diária oferecem rendimento superior. Compare sempre.',
      },
    ],
    whatToAnalyze: [
      'Comparar rendimento líquido com Tesouro Selic e CDB de liquidez diária',
      'Regra de aniversário — sacar antes da data perde o rendimento do mês',
      'Nível da Selic (regra muda abaixo de 8,5% a.a.)',
    ],
  },
  'fundos-di-rf': {
    title: 'Fundos DI / Renda Fixa',
    subtitle: 'Fundos que investem em títulos de renda fixa — praticidade com gestão profissional.',
    category: 'Renda Fixa',
    sections: [
      {
        heading: 'O que é',
        body: 'Fundos DI e de Renda Fixa são fundos de investimento que aplicam predominantemente em títulos públicos, CDBs e outros ativos de renda fixa. Fundos DI buscam acompanhar o CDI.',
      },
      {
        heading: 'Como funciona',
        body: 'Você compra cotas do fundo e um gestor profissional administra a carteira. O rendimento é diário e reflete a valorização dos ativos do fundo, descontada a taxa de administração.',
      },
      {
        heading: 'Riscos',
        body: 'Risco baixo (especialmente fundos DI simples). A taxa de administração pode corroer a rentabilidade. Fundos de crédito privado têm risco de crédito adicional.',
      },
      {
        heading: 'Tributação',
        body: 'IR regressivo sobre o rendimento (22,5% a 15%). Come-cotas: antecipação semestral de IR (maio e novembro) à menor alíquota da faixa do fundo (15% para longo prazo, 20% para curto prazo). IOF se resgate em menos de 30 dias.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para quem quer praticidade e gestão profissional. Atenção à taxa de administração: fundos com taxa acima de 0,5% a.a. tendem a perder do CDI líquido. Fundos de taxa zero podem ser alternativa ao Tesouro Selic.',
      },
    ],
    whatToAnalyze: [
      'Taxa de administração — impacta diretamente o rendimento líquido',
      'Come-cotas — antecipação semestral de IR reduz o efeito dos juros compostos',
      'Composição da carteira (títulos públicos vs. crédito privado)',
      'Histórico de rendimento vs. CDI',
      'Prazo de resgate (D+0, D+1, D+30, etc.)',
    ],
  },
  acoes: {
    title: 'Ações',
    subtitle: 'Seja sócio de empresas listadas na bolsa — potencial de valorização e dividendos.',
    category: 'Renda Variável',
    sections: [
      {
        heading: 'O que é',
        body: 'Ações são frações do capital social de uma empresa. Ao comprar ações, você se torna sócio e participa dos resultados (lucros e prejuízos). São negociadas na B3 (bolsa brasileira).',
      },
      {
        heading: 'Como funciona',
        body: 'O retorno vem de duas fontes: valorização do preço da ação e proventos (dividendos e JCP). O preço varia conforme oferta e demanda, que refletem expectativas sobre os resultados da empresa, setor e economia.',
      },
      {
        heading: 'Riscos',
        body: 'Risco de mercado (volatilidade), risco do negócio (empresa pode ir mal), risco de liquidez (ações pouco negociadas). Em teoria, você pode perder todo o capital investido. Diversificação ajuda a mitigar.',
      },
      {
        heading: 'Tributação',
        body: 'Swing trade: 15% sobre o ganho de capital. Isenção se o total vendido no mês for até R$ 20 mil (não vale para ETF). Day trade: 20% sobre o ganho, sem isenção. Dividendos: isentos. JCP: 15% retido na fonte. Prejuízos podem ser compensados.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para quem tem horizonte de longo prazo, tolera volatilidade e quer participar do crescimento de empresas. Exige estudo e acompanhamento.',
      },
    ],
    whatToAnalyze: [
      'Setor e modelo de negócio da empresa',
      'Fundamentos: P/L, P/VP, ROE, margem, dívida líquida/EBITDA',
      'Dividend yield e payout',
      'Governança corporativa (Novo Mercado é o nível mais alto)',
      'Liquidez (volume diário negociado)',
      'Valuation: preço atual vs. valor justo estimado',
    ],
  },
  fiis: {
    title: 'FIIs (Fundos Imobiliários)',
    subtitle: 'Invista em imóveis de forma acessível e receba rendimentos mensais isentos de IR.',
    category: 'Renda Variável',
    sections: [
      {
        heading: 'O que é',
        body: 'FIIs são fundos que investem em imóveis (tijolo), títulos de crédito imobiliário (papel) ou outros FIIs (FoF). As cotas são negociadas na B3 como ações.',
      },
      {
        heading: 'Como funciona',
        body: 'Os FIIs são obrigados a distribuir pelo menos 95% do lucro semestral aos cotistas. Na prática, a maioria distribui mensalmente. O rendimento por cota é depositado diretamente na sua conta da corretora.',
      },
      {
        heading: 'Riscos',
        body: 'Vacância (imóveis sem inquilino), inadimplência, risco de mercado (preço da cota varia), risco de crédito (FIIs de papel), concentração em poucos imóveis/inquilinos, risco de gestão.',
      },
      {
        heading: 'Tributação',
        body: 'Rendimentos mensais: isentos de IR para pessoa física (se o FII tiver mais de 50 cotistas, for negociado em bolsa e o investidor tiver menos de 10% das cotas). Ganho na venda de cotas: 20% sobre o lucro, sem isenção.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para quem busca renda passiva mensal isenta de IR, exposição ao mercado imobiliário sem comprar imóvel físico, e diversificação. Exige análise do portfólio do fundo.',
      },
    ],
    whatToAnalyze: [
      'Tipo: tijolo, papel ou FoF',
      'P/VP (preço / valor patrimonial) — abaixo de 1 pode indicar desconto',
      'Dividend yield (mensal e anualizado)',
      'Vacância física e financeira',
      'Qualidade dos imóveis e localização',
      'Diversificação de inquilinos',
      'Gestão e taxa de administração',
      'Liquidez (volume diário negociado)',
    ],
  },
  etfs: {
    title: 'ETFs',
    subtitle: 'Fundos de índice negociados em bolsa — diversificação simples e barata.',
    category: 'Renda Variável',
    sections: [
      {
        heading: 'O que é',
        body: 'ETFs (Exchange Traded Funds) são fundos que replicam um índice de referência (como Ibovespa, S&P 500, etc.) e são negociados na bolsa como ações.',
      },
      {
        heading: 'Como funciona',
        body: 'Ao comprar uma cota de ETF, você investe em todas as ações ou ativos que compõem o índice, de forma proporcional. A gestão é passiva (replica o índice) e a taxa de administração é geralmente baixa.',
      },
      {
        heading: 'Riscos',
        body: 'Risco de mercado (acompanha o índice, para cima e para baixo). Risco cambial em ETFs internacionais. Tracking error (diferença entre o ETF e o índice).',
      },
      {
        heading: 'Tributação',
        body: '15% sobre o ganho de capital (swing trade), 20% (day trade). Não há isenção de R$ 20 mil para ETFs de ações. ETFs de renda fixa seguem a tabela regressiva do IR.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para quem quer diversificação ampla com baixo custo e não quer analisar empresa por empresa. Estratégia de investimento passivo e de longo prazo.',
      },
    ],
    whatToAnalyze: [
      'Índice de referência que o ETF replica',
      'Taxa de administração',
      'Liquidez (volume diário)',
      'Tracking error (aderência ao índice)',
      'Não há isenção de R$ 20 mil — toda venda com lucro é tributada',
    ],
  },
  bdrs: {
    title: 'BDRs',
    subtitle: 'Invista em empresas estrangeiras sem sair da B3.',
    category: 'Renda Variável',
    sections: [
      {
        heading: 'O que é',
        body: 'BDRs (Brazilian Depositary Receipts) são certificados que representam ações de empresas estrangeiras, negociados na B3 em reais. Permitem investir em Apple, Google, Amazon etc. sem abrir conta no exterior.',
      },
      {
        heading: 'Como funciona',
        body: 'Um banco depositário compra as ações no exterior e emite os BDRs no Brasil. O preço do BDR reflete o preço da ação original + variação cambial. Dividendos são repassados aos investidores.',
      },
      {
        heading: 'Riscos',
        body: 'Risco de mercado, risco cambial (variação do dólar afeta o preço), risco do depositário, e menor liquidez que ações locais.',
      },
      {
        heading: 'Tributação',
        body: '15% sobre o ganho de capital. Dividendos de BDRs são tributados (diferente de ações brasileiras). Não há isenção de R$ 20 mil.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para quem quer exposição internacional e diversificação geográfica sem a complexidade de abrir conta no exterior.',
      },
    ],
    whatToAnalyze: [
      'Empresa representada e seus fundamentos',
      'Exposição cambial (dólar/real)',
      'Liquidez do BDR na B3',
      'Taxa do depositário',
      'Tributação diferente de ações brasileiras',
    ],
  },
  'fundos-multimercado': {
    title: 'Fundos Multimercado',
    subtitle: 'Fundos com estratégias diversificadas — podem investir em múltiplas classes de ativos.',
    category: 'Renda Variável',
    sections: [
      {
        heading: 'O que é',
        body: 'Fundos multimercado podem investir em diversas classes de ativos: renda fixa, ações, câmbio, derivativos, commodities. A alocação depende da estratégia e mandato do fundo.',
      },
      {
        heading: 'Como funciona',
        body: 'O gestor tem liberdade para alocar entre diferentes ativos conforme sua estratégia. Isso pode incluir posições compradas e vendidas, hedge, alavancagem. O benchmark geralmente é o CDI.',
      },
      {
        heading: 'Riscos',
        body: 'Varia muito conforme a estratégia. Pode ir de conservador (renda fixa com pequena parcela em ações) a agressivo (alavancado, concentrado). Risco de gestão é relevante.',
      },
      {
        heading: 'Tributação',
        body: 'IR regressivo (22,5% a 15%) com come-cotas semestral. A classificação de "curto prazo" ou "longo prazo" afeta a alíquota do come-cotas.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para quem busca diversificação e gestão profissional ativa, e entende que o retorno pode variar significativamente. Analise o histórico, a estratégia e as taxas.',
      },
    ],
    whatToAnalyze: [
      'Estratégia e mandato do fundo',
      'Taxas de administração e performance',
      'Histórico de retorno vs. CDI e volatilidade',
      'Prazo de resgate (pode ser longo: D+30, D+60)',
      'Come-cotas reduz efeito de juros compostos',
    ],
  },
  opcoes: {
    title: 'Opções',
    subtitle: 'Derivativos de alta complexidade — contratos de compra/venda com prazo definido.',
    category: 'Renda Variável',
    sections: [
      {
        heading: 'O que é',
        body: 'Opções são contratos que dão ao titular o direito (não a obrigação) de comprar (call) ou vender (put) um ativo a um preço pré-determinado (strike) até uma data de vencimento.',
      },
      {
        heading: 'Como funciona',
        body: 'O comprador paga um prêmio pelo contrato. Se o mercado se mover a seu favor, exerce o direito. Caso contrário, perde apenas o prêmio pago. O vendedor (lançador) recebe o prêmio mas assume a obrigação.',
      },
      {
        heading: 'Riscos',
        body: 'Altíssimo risco, especialmente para o lançador descoberto (prejuízo potencialmente ilimitado). O valor das opções decai com o tempo (theta). Complexidade operacional e conceitual elevada.',
      },
      {
        heading: 'Tributação',
        body: '15% sobre o ganho (operações normais), 20% (day trade). As regras de apuração são complexas e dependem do tipo de operação (titular vs. lançador, exercício vs. encerramento).',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para investidores experientes que entendem derivativos, gestão de risco e as gregas (delta, gamma, theta, vega). Não recomendado para iniciantes.',
      },
    ],
    whatToAnalyze: [
      'Entender completamente as gregas e a dinâmica de precificação',
      'Risco de perda total do prêmio (comprador) ou ilimitada (vendedor descoberto)',
      'Liquidez das opções do ativo escolhido',
      'Vencimento e decaimento temporal (theta)',
      'Volatilidade implícita vs. histórica',
    ],
  },
  bitcoin: {
    title: 'Bitcoin',
    subtitle: 'A primeira e maior criptomoeda — ativo digital descentralizado e escasso.',
    category: 'Criptoativos',
    sections: [
      {
        heading: 'O que é',
        body: 'Bitcoin (BTC) é uma moeda digital descentralizada, criada em 2009. Funciona em uma rede peer-to-peer usando tecnologia blockchain. Tem oferta limitada a 21 milhões de unidades.',
      },
      {
        heading: 'Como funciona',
        body: 'Transações são verificadas por mineradores e registradas na blockchain. Não depende de bancos centrais ou governos. Pode ser comprado em corretoras (exchanges) ou P2P. É divisível até 8 casas decimais (satoshis).',
      },
      {
        heading: 'Riscos',
        body: 'Alta volatilidade (variações de 20-30% em semanas são comuns). Risco regulatório (governos podem restringir). Risco de custódia (perda de chaves privadas = perda dos bitcoins). Risco de mercado.',
      },
      {
        heading: 'Tributação',
        body: 'Ganho de capital com isenção se as alienações (vendas) no mês forem até R$ 35 mil. Acima, alíquotas progressivas: 15% (até R$ 5 mi), 17,5% (R$ 5-10 mi), 20% (R$ 10-30 mi), 22,5% (acima de R$ 30 mi). DARF mensal via GCAP.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para quem entende a tese de escassez digital, aceita alta volatilidade e tem horizonte de longo prazo. Alocação geralmente sugerida como pequena parcela da carteira (1-5%).',
      },
    ],
    whatToAnalyze: [
      'Tese de investimento: reserva de valor digital, escassez programada',
      'Market cap e dominância no mercado cripto',
      'Volatilidade histórica — esteja preparado para quedas de 50%+',
      'Segurança e custódia (exchange vs. carteira própria)',
      'Ambiente regulatório no Brasil e no mundo',
      'Ciclos de halving e seu impacto histórico no preço',
    ],
  },
  'ethereum-altcoins': {
    title: 'Ethereum e Altcoins',
    subtitle: 'Plataformas de contratos inteligentes e criptomoedas alternativas.',
    category: 'Criptoativos',
    sections: [
      {
        heading: 'O que é',
        body: 'Ethereum (ETH) é a segunda maior criptomoeda e a principal plataforma de contratos inteligentes (smart contracts). Altcoins são todas as criptomoedas que não são Bitcoin — incluem milhares de projetos com diferentes propostas.',
      },
      {
        heading: 'Como funciona',
        body: 'Ethereum permite criar aplicações descentralizadas (dApps), tokens e protocolos DeFi. Altcoins variam enormemente: algumas têm utilidade real, outras são puramente especulativas. Pesquise cada projeto individualmente.',
      },
      {
        heading: 'Riscos',
        body: 'Todos os riscos do Bitcoin, amplificados. Altcoins menores podem perder 90%+ do valor ou ir a zero. Risco de projetos fraudulentos (rug pulls). Complexidade técnica.',
      },
      {
        heading: 'Tributação',
        body: 'Mesma regra do Bitcoin: isenção se alienações no mês até R$ 35 mil; acima, alíquotas progressivas de ganho de capital.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para quem estuda o ecossistema cripto em profundidade, entende os riscos e investe apenas o que pode perder integralmente.',
      },
    ],
    whatToAnalyze: [
      'Tese e utilidade do projeto — resolve que problema?',
      'Market cap, volume e liquidez',
      'Tokenomics: oferta total, emissão, distribuição',
      'Equipe, governança e comunidade',
      'Risco de projetos fraudulentos — DYOR (Do Your Own Research)',
    ],
  },
  stablecoins: {
    title: 'Stablecoins',
    subtitle: 'Criptomoedas atreladas a moedas fiduciárias — menor volatilidade no mundo cripto.',
    category: 'Criptoativos',
    sections: [
      {
        heading: 'O que é',
        body: 'Stablecoins são criptomoedas projetadas para manter paridade com uma moeda fiduciária (geralmente o dólar americano). Exemplos: USDT (Tether), USDC (Circle), DAI (descentralizada).',
      },
      {
        heading: 'Como funciona',
        body: 'Mantêm o valor estável através de reservas (dólares, títulos) ou mecanismos algorítmicos. São usadas como "porto seguro" dentro do mercado cripto e para transferências internacionais.',
      },
      {
        heading: 'Riscos',
        body: 'Risco do emissor (as reservas existem de fato?). Risco regulatório. Risco de descolamento do peg (perder a paridade). Stablecoins algorítmicas têm risco adicional (caso TerraUSD/Luna em 2022).',
      },
      {
        heading: 'Tributação',
        body: 'Mesma regra de cripto para ganho de capital. A conversão entre criptomoedas pode gerar fato gerador de imposto.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para quem opera no mercado cripto e precisa de um ativo estável para proteger posições, ou para quem quer exposição ao dólar de forma descentralizada.',
      },
    ],
    whatToAnalyze: [
      'Tipo de lastro (reservas em dólar, títulos, algorítmica)',
      'Auditoria das reservas — são transparentes?',
      'Market cap e histórico de estabilidade do peg',
      'Risco regulatório — regulamentação de stablecoins está em discussão globalmente',
      'Emissor e jurisdição',
    ],
  },
  'staking-defi': {
    title: 'Staking / DeFi',
    subtitle: 'Rendimentos em criptoativos — staking, empréstimos e pools de liquidez.',
    category: 'Criptoativos',
    sections: [
      {
        heading: 'O que é',
        body: 'Staking é o processo de travar criptomoedas em uma rede para validar transações e receber recompensas. DeFi (Finanças Descentralizadas) são protocolos que oferecem serviços financeiros (empréstimos, trocas, rendimentos) sem intermediários.',
      },
      {
        heading: 'Como funciona',
        body: 'No staking, você trava seus tokens em um validador e recebe recompensas proporcionais. Em DeFi, você pode fornecer liquidez a pools, emprestar ativos ou fazer yield farming. Os rendimentos (APY) podem ser atrativos mas variam muito.',
      },
      {
        heading: 'Riscos',
        body: 'Risco de smart contract (bugs, hacks). Impermanent loss em pools de liquidez. Risco de protocolo (pode ser explorado). Complexidade técnica alta. Rendimentos altos geralmente indicam risco alto.',
      },
      {
        heading: 'Tributação',
        body: 'Rendimentos de staking são tributáveis. A Receita Federal ainda não tem orientação 100% clara, mas o entendimento é que rendimentos devem ser declarados. Ganho de capital segue as regras de cripto.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Para usuários avançados de cripto que entendem os riscos técnicos e estão dispostos a estudar cada protocolo em detalhes. Não é adequado para iniciantes.',
      },
    ],
    whatToAnalyze: [
      'Segurança do smart contract — foi auditado?',
      'APY oferecido vs. risco real — desconfie de APYs muito altos',
      'Lock-up period — por quanto tempo seus ativos ficam travados?',
      'Risco de impermanent loss em pools de liquidez',
      'Histórico e reputação do protocolo',
      'Complexidade da tributação — mantenha registros detalhados',
    ],
  },
}
