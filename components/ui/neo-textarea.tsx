import * as React from 'react'
import { cn } from '@/lib/utils'

export interface NeoTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const NeoTextarea = React.forwardRef<HTMLTextAreaElement, NeoTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[120px] w-full bg-input px-4 py-3 text-sm font-medium neo-border-2 neo-shadow-sm transition-all placeholder:text-muted-foreground focus:outline-none focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[4px_4px_0px_0px_var(--border)] disabled:cursor-not-allowed disabled:opacity-50 resize-none',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
NeoTextarea.displayName = 'NeoTextarea'

export { NeoTextarea }
