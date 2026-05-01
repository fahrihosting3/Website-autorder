import * as React from 'react'
import { cn } from '@/lib/utils'

export interface NeoSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const NeoSelect = React.forwardRef<HTMLSelectElement, NeoSelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          'flex h-11 w-full bg-input px-4 py-2 text-sm font-medium neo-border-2 neo-shadow-sm transition-all focus:outline-none focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[4px_4px_0px_0px_var(--border)] disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  }
)
NeoSelect.displayName = 'NeoSelect'

export { NeoSelect }
