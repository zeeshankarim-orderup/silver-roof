import { Frame, HardHat, Headset, Ruler, Settings2, ShieldCheck } from 'lucide-react';
import type { Advantage } from '@/types';

export const advantages: Advantage[] = [
  { id: 'materials', icon: ShieldCheck },
  { id: 'installation', icon: HardHat },
  { id: 'design', icon: Frame },
  { id: 'detail', icon: Ruler },
  { id: 'custom', icon: Settings2 },
  { id: 'service', icon: Headset },
];
