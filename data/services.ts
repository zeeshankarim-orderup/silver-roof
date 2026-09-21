import { 
  AppWindow, 
  Blinds, 
  Building2, 
  DoorOpen, 
  Home, 
  Layers, 
  PencilRuler, 
  Sofa, 
  Wrench, 
} from 'lucide-react'; 
import type { Service } from '@/types'; 
 
/** 
 * The `span` and `aspect` values are what stop this reading as a nine-up card 
 * grid: widths alternate 7/5, 4/4/4, 5/7, 6/6 down the page. Reorder freely - 
 * the layout follows the data. 
 */ 
export const services: Service[] = [ 
  { 
    id: 'windows', 
    icon: AppWindow, 
    image: '/images/services/windows.jpg', 
    span: 'lg:col-span-7', 
    aspect: 'aspect-[4/3] lg:aspect-[4/3]', 
  }, 
  { 
    id: 'doors', 
    icon: DoorOpen, 
    image: '/images/services/doors.jpg', 
    span: 'lg:col-span-5', 
    aspect: 'aspect-[4/3] lg:aspect-[4/3]', 
  }, 
  { 
    id: 'shutters', 
    icon: Blinds, 
    image: '/images/services/shutter.jpg', 
    span: 'lg:col-span-5', 
    aspect: 'aspect-[4/3] lg:aspect-[4/3]', 
  }, 
  { 
    id: 'interior', 
    icon: Sofa, 
    image: '/images/services/interior.jpg', 
    span: 'lg:col-span-7', 
    aspect: 'aspect-[4/3] lg:aspect-[4/3]', 
  }, 
  { 
    id: 'glass', 
    icon: Layers, 
    image: '/images/services/glass.jpg', 
    span: 'lg:col-span-4', 
    aspect: 'aspect-[4/3] lg:aspect-[4/3]', 
  }, 
   
  { 
    id: 'painting', 
    icon: PencilRuler, 
    image: '/images/services/painting.jpg', 
    span: 'lg:col-span-4', 
    aspect: 'aspect-[4/3] lg:aspect-[4/3]', 
  }, 
  { 
    id: 'maintenance', 
    icon: Wrench, 
    image: '/images/services/installation_maintenance.jpg', 
    span: 'lg:col-span-4', 
    aspect: 'aspect-[4/3] lg:aspect-[4/3]', 
  }, 
]; 