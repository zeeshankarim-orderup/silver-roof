import { Info } from 'lucide-react';
import { ProjectGallery } from './ProjectGallery';
import { FadeIn } from '@/components/animations';
import { SectionIntro } from '@/components/ui/SectionIntro';
import type { Dictionary } from '@/i18n/dictionaries';

export function Projects({ dict }: { dict: Dictionary }) {
  return (
    <section id="projects" className="relative scroll-mt-24 bg-bone py-20 lg:py-32">
      <div className="shell">
        <SectionIntro
          label={dict.projects.label}
          heading={dict.projects.heading}
          intro={dict.projects.intro}
          className="max-w-3xl"
          headingClassName="text-display-md"
        />

        <div className="mt-14 lg:mt-20">
          <ProjectGallery dict={dict} />
        </div>

        {/* Stated plainly rather than hidden - these are not the company's photos. */}
        <FadeIn y={12} delay={0.1} className="mt-8">
          <p className="flex items-start gap-2.5 text-sm text-graphite-400">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {dict.projects.placeholderNote}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
