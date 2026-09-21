import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { FadeIn, Reveal } from '@/components/animations';
import type { Dictionary } from '@/i18n/dictionaries';
import type { Locale } from '@/types';

interface LegalPageProps {
  locale: Locale;
  dict: Dictionary;
  title: string;
  body: string[];
}

export function LegalPage({ locale, dict, title, body }: LegalPageProps) {
  return (
    <article className="bg-bone pb-24 pt-36 lg:pb-32 lg:pt-44">
      <div className="shell max-w-3xl">
        <FadeIn y={12} duration={0.5}>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm text-graphite-500 transition-colors hover:text-graphite-900"
          >
            <ArrowLeft className="flip-rtl h-4 w-4" aria-hidden="true" />
            {dict.legal.backHome}
          </Link>
        </FadeIn>

        <h1 className="mt-8 font-display text-display-md font-light text-graphite-900">
          <Reveal>{title}</Reveal>
        </h1>

        <FadeIn y={16} delay={0.15}>
          <p className="mt-8 rounded-frame border border-brass-400/40 bg-brass-200/25 p-4 text-sm leading-relaxed text-graphite-600">
            {dict.legal.draftNotice}
          </p>
        </FadeIn>

        <div className="mt-10 space-y-6">
          {body.map((paragraph, index) => (
            <FadeIn key={`${index}-${paragraph.slice(0, 20)}`} y={16} delay={0.05 * index}>
              <p className="text-[1.05rem] leading-relaxed text-graphite-500">{paragraph}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </article>
  );
}
