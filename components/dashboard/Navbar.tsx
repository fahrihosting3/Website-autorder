'use client'

import { Menu, Bell } from 'lucide-react'
import { NeoButton } from '@/components/ui/neo-button'
import type { SessionUser } from '@/types'

interface NavbarProps {
  user: SessionUser
  onMenuClick: () => void
}

export function Navbar({ user, onMenuClick }: NavbarProps) {
  return (
    <header className="bg-card neo-border-4 border-t-0 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <NeoButton
          variant="outline"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </NeoButton>
        
        <div className="hidden sm:block">
          <h2 className="font-bold text-lg">Selamat Datang!</h2>
          <p className="text-sm text-muted-foreground">{user.name}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <NeoButton variant="outline" size="icon">
          <Bell className="w-5 h-5" />
        </NeoButton>
        
        <div className="w-10 h-10 bg-secondary neo-border-2 flex items-center justify-center font-black text-secondary-foreground">
          {user.name.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  )
}
