import type { LucideIcon } from 'lucide-react';

export type Locale = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

/** Keys resolve into the translation dictionaries, so content stays bilingual. */
export interface Service {
  id: string;
  icon: LucideIcon;
  image: string;
  /** Tailwind column/row spans - this is what makes the services grid asymmetric. */
  span: string;
  /** Taller cards get a portrait crop; wide ones a landscape crop. */
  aspect: string;
}

export interface Project {
  id: string;
  image: string;
  /** Category key, translated at render time. No client or project names. */
  category: string;
  span: string;
  aspect: string;
  width: number;
  height: number;
}

export interface ProcessStep {
  id: string;
  icon: LucideIcon;
}

export interface Advantage {
  id: string;
  icon: LucideIcon;
}

export interface NavItem {
  id: string;
  href: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured';
