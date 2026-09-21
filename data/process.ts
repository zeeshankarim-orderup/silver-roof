import { FileText, KeyRound, Lightbulb, MessageCircle, Ruler, Wrench } from 'lucide-react';
import type { ProcessStep } from '@/types';

export const processSteps: ProcessStep[] = [
  { id: 'contact', icon: MessageCircle },
  { id: 'consultation', icon: Lightbulb },
  { id: 'measurement', icon: Ruler },
  { id: 'quote', icon: FileText },
  { id: 'installation', icon: Wrench },
  { id: 'handover', icon: KeyRound },
];
