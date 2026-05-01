'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bot, LayoutDashboard, Package, ShoppingCart, Settings, User, LogOut, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NeoButton } from '@/components/ui/neo-button'
import { logoutAction } from '@/actions/auth.actions'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/products', label: 'Produk', icon: Package },
  { href: '/dashboard/orders', label: 'Pesanan', icon: ShoppingCart },
  { href: '/dashboard/profile', label: 'Profil', icon: User },
  { href: '/dashboard/settings', label: 'Pengaturan Bot', icon: Settings },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-72 bg-sidebar neo-border-4 flex flex-col transition-transform duration-200 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-sidebar-border">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary neo-border-2 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-black text-lg uppercase tracking-tight">SewaBot</span>
          </Link>
          <button onClick={onClose} className="lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/dashboard' && pathname.startsWith(item.href))
              const Icon = item.icon
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 font-bold uppercase text-sm tracking-wide transition-all neo-border-2',
                      isActive
                        ? 'bg-primary text-primary-foreground neo-shadow-sm'
                        : 'bg-sidebar hover:bg-sidebar-accent neo-hover'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t-4 border-sidebar-border">
          <form action={logoutAction}>
            <NeoButton type="submit" variant="destructive" className="w-full">
              <LogOut className="w-5 h-5" />
              Keluar
            </NeoButton>
          </form>
        </div>
      </aside>
    </>
  )
}
