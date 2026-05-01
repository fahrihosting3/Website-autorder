import * as React from 'react'
import { cn } from '@/lib/utils'

export interface NeoInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const NeoInput = React.forwardRef<HTMLInputElement, NeoInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full bg-input px-4 py-2 text-sm font-medium neo-border-2 neo-shadow-sm transition-all placeholder:text-muted-foreground focus:outline-none focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[4px_4px_0px_0px_var(--border)] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
NeoInput.displayName = 'NeoInput'

export { NeoInput }
