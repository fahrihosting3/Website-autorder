import type { LucideIcon } from 'lucide-react'
import { NeoCard } from '@/components/ui/neo-card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning'
  description?: string
}

export function StatsCard({ title, value, icon: Icon, variant = 'default', description }: StatsCardProps) {
  const bgColors = {
    default: 'bg-card',
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
  }

  const textColors = {
    default: 'text-card-foreground',
    primary: 'text-primary-foreground',
    secondary: 'text-secondary-foreground',
    accent: 'text-accent-foreground',
    success: 'text-success-foreground',
    warning: 'text-warning-foreground',
  }

  return (
    <NeoCard className={cn(bgColors[variant], textColors[variant])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide opacity-80">{title}</p>
          <p className="text-3xl font-black mt-1">{value}</p>
          {description && (
            <p className="text-xs mt-2 opacity-70">{description}</p>
          )}
        </div>
        <div className={cn(
          'w-12 h-12 neo-border-2 flex items-center justify-center',
          variant === 'default' ? 'bg-muted' : 'bg-white/20'
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </NeoCard>
  )
}
