import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { AccountContent } from '@/components/auth/account-content'

export const metadata: Metadata = {
  title: 'Minha conta',
  description: 'Seus cenários e cálculos salvos.',
}

export default async function ContaPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null // middleware redireciona para login
  }

  const { data: profile } = await supabase
    .from('il_profiles')
    .select('display_name')
    .eq('id', user.id)
    .single()

  const { data: scenarios } = await supabase
    .from('il_scenarios')
    .select('id, name, description, updated_at')
    .order('updated_at', { ascending: false })

  const { data: calculations } = await supabase
    .from('il_calculations')
    .select('id, type, created_at')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <AccountContent
        user={{
          email: user.email ?? '',
          displayName: profile?.display_name ?? '',
        }}
        scenarios={scenarios ?? []}
        calculations={calculations ?? []}
      />
    </div>
  )
}
