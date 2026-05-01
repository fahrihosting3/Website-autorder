'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bot, Mail, Lock, ArrowRight } from 'lucide-react'
import { NeoButton } from '@/components/ui/neo-button'
import { NeoInput } from '@/components/ui/neo-input'
import { NeoCard, NeoCardHeader, NeoCardTitle, NeoCardDescription, NeoCardContent, NeoCardFooter } from '@/components/ui/neo-card'
import { loginAction } from '@/actions/auth.actions'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    
    const result = await loginAction(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <NeoCard className="bg-card">
      <NeoCardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-primary neo-border flex items-center justify-center mb-4">
          <Bot className="w-8 h-8 text-primary-foreground" />
        </div>
        <NeoCardTitle>Masuk</NeoCardTitle>
        <NeoCardDescription>
          Masuk ke dashboard untuk mengelola bot Anda
        </NeoCardDescription>
      </NeoCardHeader>
      
      <NeoCardContent>
        <form action={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-destructive text-destructive-foreground p-3 neo-border-2 text-sm font-medium">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-bold uppercase tracking-wide">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <NeoInput
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                className="pl-11"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-bold uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <NeoInput
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="pl-11"
                required
              />
            </div>
          </div>
          
          <NeoButton type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? 'Memproses...' : 'Masuk'}
            <ArrowRight className="w-5 h-5" />
          </NeoButton>
        </form>
      </NeoCardContent>
      
      <NeoCardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Belum punya akun?{' '}
          <Link href="/register" className="font-bold text-primary hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </NeoCardFooter>
    </NeoCard>
  )
}
