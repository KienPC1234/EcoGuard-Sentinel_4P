import { Leaf } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-primary ${className}`}>
        <Leaf className="h-7 w-7 text-sidebar-foreground" />
        <span className="text-xl font-bold text-sidebar-foreground">WaterWise</span>
    </div>
  );
}
