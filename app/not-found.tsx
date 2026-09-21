import Link from 'next/link';
import { defaultLocale } from '@/i18n/config';
import '@/styles/globals.css';

/**
 * Root 404. Every real route lives under /[locale], which owns the <html>
 * element - so this file has to provide its own document shell.
 */
export default function RootNotFound() {
  return (
    <html lang={defaultLocale} dir="ltr">
      <body className="bg-bone">
        <div className="flex min-h-screen items-center">
          <div className="shell text-center">
            <p className="text-6xl font-light text-graphite-900">404</p>
            <p className="mt-4 text-graphite-500">This page could not be found.</p>
            <Link
              href={`/${defaultLocale}`}
              className="mt-8 inline-flex h-12 items-center rounded-frame bg-graphite-900 px-6 text-bone transition-colors hover:bg-graphite-700"
            >
              Back to home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
