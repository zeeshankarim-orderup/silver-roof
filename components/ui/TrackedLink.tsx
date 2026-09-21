'use client';

import type { ReactNode } from 'react';
import { track } from '@/lib/analytics';

interface TrackedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Conversion event name - see lib/analytics.ts. */
  event: Parameters<typeof track>[0];
  source?: string;
}

/**
 * A plain anchor that also reports a conversion event. Exists so Server
 * Components can keep rendering contact details while still feeding Ads.
 */
export function TrackedLink({ href, children, className, event, source }: TrackedLinkProps) {
  const external = href.startsWith('http');

  return (
    <a
      href={href}
      className={className}
      onClick={() => track(event, { href, source })}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
