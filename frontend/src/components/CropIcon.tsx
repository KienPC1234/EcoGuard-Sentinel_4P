'use client';

import { Wheat, Carrot, Leaf, Bot } from 'lucide-react';
import type { Crop } from '@/lib/types';

const iconMap = {
  Wheat,
  Carrot,
  Leaf,
  Bot,
};

type CropIconProps = {
  name: Crop['iconName'];
  className?: string;
};

export function CropIcon({ name, className }: CropIconProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    return null; // or a default icon
  }
  return <IconComponent className={className} />;
}
