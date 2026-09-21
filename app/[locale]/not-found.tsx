import Link from 'next/link';
import { defaultLocale } from '@/i18n/config';

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] items-center bg-bone">
      <div className="shell text-center">
        <p className="font-display text-display-lg font-light text-graphite-900">404</p>
        <p className="mt-4 text-graphite-500">This page could not be found.</p>
        <Link
          href={`/${defaultLocale}`}
          className="mt-8 inline-flex h-12 items-center rounded-frame bg-graphite-900 px-6 text-bone transition-colors hover:bg-graphite-700"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
