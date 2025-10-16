'use client';

import dynamic from 'next/dynamic';
import { CropDistribution } from '@/components/dashboard/CropDistribution';
import { WeatherWidgets } from '@/components/dashboard/WeatherWidgets';
import { fields, cropDistributionData, cropDistributionConfig } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const FieldMap = dynamic(() => import('@/components/dashboard/FieldMap').then(mod => mod.FieldMap), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted animate-pulse" />
});

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl md:text-3xl">Welcome back, Christopher 👋</h1>
          <p className="text-muted-foreground">Saturday, October 5, 2024</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Paso Robles Farm
        </Button>
      </div>

      <WeatherWidgets />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 h-auto">
        <div className="lg:col-span-4">
          <CropDistribution data={cropDistributionData} config={cropDistributionConfig} />
        </div>
        <div className="lg:col-span-3">
          <Card className='h-full'>
            <CardHeader>
              <CardTitle>Fields Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] w-full p-0">
              <FieldMap fields={fields} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
