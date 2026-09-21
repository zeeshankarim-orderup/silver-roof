'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'bone' | 'outline' | 'ghost' | 'whatsapp' | 'light';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-frame font-medium ' +
  'transition-[background-color,color,border-color,transform,box-shadow] duration-300 ' +
  'ease-architectural disabled:cursor-not-allowed disabled:opacity-60 ' +
  'active:translate-y-px whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary: 'bg-graphite-900 text-bone hover:bg-graphite-700 shadow-frame hover:shadow-lift',
  bone: 'bg-bone text-graphite-900 hover:bg-white shadow-frame hover:shadow-lift',
  outline:
    'border border-graphite-900/25 text-graphite-900 hover:border-graphite-900 hover:bg-graphite-900 hover:text-bone',
  ghost: 'text-graphite-900 hover:text-brass-600',
  whatsapp: 'bg-[#1FA855] text-white hover:bg-[#178C46] shadow-frame hover:shadow-lift',
  light:
    'border border-bone/35 bg-bone/5 text-bone backdrop-blur-sm hover:bg-bone hover:text-graphite-900 hover:border-bone',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-8 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Fires a dataLayer event on click. See lib/analytics.ts. */
  trackAs?: Parameters<typeof track>[0];
}

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof CommonProps> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = 'primary', size = 'md', className, children, trackAs, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ('href' in rest && typeof rest.href === 'string') {
    const { href, onClick, ...anchorProps } = rest as ComponentPropsWithoutRef<'a'> & {
      href: string;
    };
    const external = /^(https?:|tel:|mailto:|wa\.me)/.test(href);

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (trackAs) track(trackAs, { href });
      onClick?.(event);
    };

    // Anchors, tel:, mailto: and external URLs bypass the router.
    if (external || href.startsWith('#')) {
      return (
        <a
          href={href}
          className={classes}
          onClick={handleClick}
          {...(external && href.startsWith('http')
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={handleClick} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const { onClick, type = 'button', ...buttonProps } = rest as ComponentPropsWithoutRef<'button'>;

  return (
    <button
      type={type}
      className={classes}
      onClick={(event) => {
        if (trackAs) track(trackAs, {});
        onClick?.(event);
      }}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
