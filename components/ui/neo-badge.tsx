import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const neoBadgeVariants = cva(
  'inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wide neo-border-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        accent: 'bg-accent text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        outline: 'bg-background text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface NeoBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof neoBadgeVariants> {}

function NeoBadge({ className, variant, ...props }: NeoBadgeProps) {
  return (
    <div className={cn(neoBadgeVariants({ variant }), className)} {...props} />
  )
}

export { NeoBadge, neoBadgeVariants }
