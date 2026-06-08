'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { APP_NAME } from '@/lib/config'
import { ThemeToggle } from './theme-toggle'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

const links = [
  { href: '/aprender', label: 'Aprender' },
  { href: '/calculadoras', label: 'Calculadoras' },
  { href: '/comparador', label: 'Comparador' },
  { href: '/conta', label: 'Conta' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <Link href="/" className="mr-6 flex items-center gap-2 font-bold text-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
          {APP_NAME}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground',
                pathname.startsWith(link.href)
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />

          {/* Mobile nav */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="md:hidden"
              render={<Button variant="ghost" size="icon" aria-label="Menu" />}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
              <nav className="flex flex-col gap-2 mt-8">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent',
                      pathname.startsWith(link.href)
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
