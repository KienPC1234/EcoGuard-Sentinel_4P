'use client';

import { Pie, PieChart, Cell, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';

type CropDistributionProps = {
  data: { name: string; value: number; fill: string }[];
  config: ChartConfig;
};

export function CropDistribution({ data, config }: CropDistributionProps) {
  const totalAcres = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Crop Distribution</CardTitle>
        <CardDescription>Distribution of crops across your fields</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  const percentage = ((data.value / totalAcres) * 100).toFixed(0);
                  return (
                    <div className="bg-background p-2 border rounded-md shadow-lg">
                      <p className="font-bold">{`${data.name}: ${data.value} Ac. (${percentage}%)`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={80}
              outerRadius={100}
              strokeWidth={2}
              paddingAngle={5}
              cornerRadius={5}
            >
              {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
              ))}
            </Pie>
            <foreignObject x="50%" y="50%" width="160" height="100" textAnchor="middle" dominantBaseline="middle" style={{transform: "translate(-80px, -40px)"}}>
                <div className='flex flex-col items-center justify-center text-center'>
                    <p className='text-3xl font-bold'>{totalAcres.toLocaleString()}</p>
                    <p className='text-sm text-muted-foreground'>acres</p>
                </div>
            </foreignObject>
            <Legend
                content={({ payload }) => (
                    <ul className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4">
                    {payload?.map((entry: any) => {
                        const item = data.find(d => d.name === entry.value);
                        if (!item) return null;
                        const percentage = ((item.value / totalAcres) * 100).toFixed(0);
                        return (
                        <li key={entry.value} className="flex items-center gap-2 text-sm">
                            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span>{entry.value}</span>
                            <span className="ml-auto text-muted-foreground">{`(${percentage}%) ${item.value.toLocaleString()} Ac.`}</span>
                        </li>
                        );
                    })}
                    </ul>
                )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
