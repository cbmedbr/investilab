import Link from 'next/link'
import { APP_NAME } from '@/lib/config'

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {APP_NAME}. Conteúdo educacional e
          informativo.
        </p>
        <div className="flex gap-4">
          <Link href="/sobre" className="hover:underline">
            Sobre
          </Link>
          <Link href="/aviso-legal" className="hover:underline">
            Aviso legal
          </Link>
        </div>
      </div>
    </footer>
  )
}
