import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      Blackrobe is a product of{' '}
      <ExternalLink href="https://www.deepware.de/">Deepware</ExternalLink>
      {/* and{' '}
      <ExternalLink href="https://vercel.com/storage/kv">
        Vercel KV
      </ExternalLink> */}
      .
    </p>
  )
}
