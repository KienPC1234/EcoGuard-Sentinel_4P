'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { FieldDetailsDialog } from '@/components/fields/FieldDetailsDialog';
import { PlusCircle } from 'lucide-react';
import { fields } from '@/lib/data';
import type { Field } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const FieldMap = dynamic(() => import('@/components/dashboard/FieldMap').then(mod => mod.FieldMap), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted animate-pulse" />
});

export default function FieldsPage() {
  const [selectedField, setSelectedField] = useState<Field | null>(null);

  const handleFieldSelect = (field: Field) => {
    setSelectedField(field);
  };

  const handleDialogClose = () => {
    setSelectedField(null);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">My Fields</h1>
        <Link href="/fields/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Field
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fields Map</CardTitle>
          <CardDescription>Click on a field to view its details and manage irrigation.</CardDescription>
        </CardHeader>
        <CardContent className="h-[60vh] w-full p-0">
          <FieldMap fields={fields} onFieldClick={handleFieldSelect} />
        </CardContent>
      </Card>

      {selectedField && (
        <FieldDetailsDialog
          field={selectedField}
          isOpen={!!selectedField}
          onClose={handleDialogClose}
        />
      )}
    </div>
  );
}
