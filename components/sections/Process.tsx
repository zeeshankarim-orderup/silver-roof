import { ProcessTrack } from './ProcessTrack';
import { SectionIntro } from '@/components/ui/SectionIntro';
import type { Dictionary } from '@/i18n/dictionaries';

export function Process({ dict }: { dict: Dictionary }) {
  return (
    <section id="process" className="relative scroll-mt-24 bg-linen py-20 lg:py-32">
      <div className="shell">
        <SectionIntro
          label={dict.process.label}
          heading={dict.process.heading}
          intro={dict.process.intro}
          className="max-w-2xl"
        />

        <div className="mt-14 lg:mt-20">
          <ProcessTrack dict={dict} />
        </div>
      </div>
    </section>
  );
}
