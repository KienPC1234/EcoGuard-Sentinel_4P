"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Field } from "@/lib/types";
import { CropIcon } from "../CropIcon";

type FieldDetailsDialogProps = {
  field: Field;
  isOpen: boolean;
  onClose: () => void;
};

export function FieldDetailsDialog({ field, isOpen, onClose }: FieldDetailsDialogProps) {
  if (!field) return null;

  const hydrationValue = field.hydrationStatus === 'Hydrated' ? 100 : field.hydrationStatus === 'Normal' ? 60 : 20;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CropIcon name={field.crop.iconName} className="h-6 w-6" />
            {field.name}
          </DialogTitle>
          <DialogDescription>
            {field.acres} acres - {field.daysUntilHarvest} days until harvest
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">CROP HYDRATION</p>
                    <Badge variant={field.hydrationStatus === 'Hydrated' ? 'default' : field.hydrationStatus === 'Dehydrated' ? 'destructive' : 'secondary'}
                        className={cn(field.hydrationStatus === 'Hydrated' && 'bg-green-500/20 text-green-700 border-green-500/30')}
                    >
                        {field.hydrationStatus}
                    </Badge>
                </div>
                 <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">DAILY WATER</p>
                    <p className="font-bold text-lg">↑{field.dailyWaterUsage} gallons</p>
                </div>
            </div>

            <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">TASKS</p>
                <div className="space-y-2">
                {field.tasks.map((task, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`task-${index}`} defaultChecked={task === 'Water field'} />
                        <label htmlFor={`task-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {task}
                        </label>
                    </div>
                ))}
                </div>
            </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>View Schedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
