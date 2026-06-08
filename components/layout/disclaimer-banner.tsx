import Link from 'next/link'

export function DisclaimerBanner() {
  return (
    <div className="bg-muted/60 border-t text-xs text-muted-foreground text-center py-2 px-4">
      Este conteúdo é educacional e informativo, não constitui recomendação de
      investimento.{' '}
      <Link href="/aviso-legal" className="underline hover:text-foreground">
        Saiba mais
      </Link>
    </div>
  )
}
