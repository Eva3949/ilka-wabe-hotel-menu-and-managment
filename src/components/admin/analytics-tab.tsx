'use client';

import type { Category, MenuItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Pie, PieChart, Cell, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { useMemo } from 'react';

interface AnalyticsTabProps {
  categories: Category[];
  menuItems: MenuItem[];
}

const CHART_CONFIG = {
  items: {
    label: "Items",
    color: "hsl(var(--chart-1))",
  },
  veg: {
    label: "Veg",
    color: "hsl(var(--chart-2))",
  },
  "non-veg": {
    label: "Non-Veg",
    color: "hsl(var(--chart-5))",
  },
  vegan: {
    label: "Vegan",
    color: "hsl(var(--chart-3))",
  },
  alcoholic: {
    label: "Alcoholic",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--muted))",
  },
};

export function AnalyticsTab({ categories, menuItems }: AnalyticsTabProps) {

  const categoryItemCounts = useMemo(() => {
    return categories.map(category => ({
      name: category.name,
      items: menuItems.filter(item => item.categoryId === category.id).length,
    }));
  }, [categories, menuItems]);

  const itemTypeDistribution = useMemo(() => {
    const counts: { [key: string]: number } = {};
    menuItems.forEach(item => {
      const type = item.itemType.toLowerCase();
      counts[type] = (counts[type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value, fill: CHART_CONFIG[name as keyof typeof CHART_CONFIG]?.color || CHART_CONFIG.other.color }));
  }, [menuItems]);

  const priceDistribution = useMemo(() => {
    const bins = [
      { name: '$0-10', count: 0 },
      { name: '$10-15', count: 0 },
      { name: '$15-20', count: 0 },
      { name: '$20+', count: 0 },
    ];
    menuItems.forEach(item => {
      if (item.price <= 10) bins[0].count++;
      else if (item.price <= 15) bins[1].count++;
      else if (item.price <= 20) bins[2].count++;
      else bins[3].count++;
    });
    return bins;
  }, [menuItems]);

  const averagePrice = useMemo(() => {
    if (menuItems.length === 0) return 0;
    const total = menuItems.reduce((sum, item) => sum + item.price, 0);
    return total / menuItems.length;
  }, [menuItems]);

  return (
    <div className="space-y-6">
       <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Menu Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{menuItems.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Price</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">${averagePrice.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Number of Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{categories.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Items per Category</CardTitle>
            <CardDescription>Distribution of menu items across different categories.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={CHART_CONFIG}>
              <BarChart data={categoryItemCounts} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="items" fill="var(--color-items)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Item Type Distribution</CardTitle>
            <CardDescription>Breakdown of menu items by dietary type.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={CHART_CONFIG} className="h-[250px] w-full">
              <PieChart>
                 <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={itemTypeDistribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {itemTypeDistribution.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                    ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
       <Card>
          <CardHeader>
            <CardTitle>Price Range Distribution</CardTitle>
            <CardDescription>How many items fall into different price brackets.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={CHART_CONFIG}>
              <BarChart data={priceDistribution} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-items)" radius={4} name="Items"/>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

    </div>
  );
}
