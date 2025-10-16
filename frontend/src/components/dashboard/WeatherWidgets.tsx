import { Droplets, Wind, CloudRain, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const weatherData = [
  {
    icon: Sun,
    title: 'Weather',
    value: '21°C',
    description: 'Partly Cloudy',
    color: 'text-orange-500',
  },
  {
    icon: Droplets,
    title: 'Soil Moisture',
    value: '72%',
    description: 'High',
    color: 'text-blue-500',
  },
  {
    icon: CloudRain,
    title: 'Precipitation',
    value: '-2mm',
    description: 'Low',
    color: 'text-sky-500',
  },
  {
    icon: Wind,
    title: 'Wind Speed',
    value: '10km',
    description: 'Windy',
    color: 'text-gray-500',
  },
];

export function WeatherWidgets() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {weatherData.map((item, index) => (
        <Card key={index} className="flex items-center p-4 gap-4">
          <div className="p-3 bg-muted rounded-lg">
            <item.icon className={`h-6 w-6 ${item.color}`} />
          </div>
          <div className='flex flex-col'>
            <p className="text-sm text-muted-foreground">{item.title}</p>
            <p className="text-xl font-bold">{item.value}</p>
          </div>
          <Badge variant="outline" className="ml-auto">{item.description}</Badge>
        </Card>
      ))}
    </div>
  );
}
