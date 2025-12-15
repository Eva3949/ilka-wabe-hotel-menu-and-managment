'use client';

import type { Category, MenuItem } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuItemsTab } from './menu-items-tab';
import { CategoriesTab } from './categories-tab';
import { SuggestItemTool } from './suggest-item-tool';
import { AnalyticsTab } from './analytics-tab';
import { List, LayoutGrid, Sparkles, BarChart2 } from 'lucide-react';

interface AdminDashboardProps {
  initialCategories: Category[];
  initialMenuItems: MenuItem[];
}

export function AdminDashboard({ initialCategories, initialMenuItems }: AdminDashboardProps) {
  return (
    <Tabs defaultValue="items" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="items"><LayoutGrid className="mr-2 h-4 w-4" />Menu Items</TabsTrigger>
        <TabsTrigger value="categories"><List className="mr-2 h-4 w-4" />Categories</TabsTrigger>
        <TabsTrigger value="suggestions"><Sparkles className="mr-2 h-4 w-4" />AI Suggestions</TabsTrigger>
        <TabsTrigger value="analytics"><BarChart2 className="mr-2 h-4 w-4" />Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="items" className="mt-4">
        <MenuItemsTab menuItems={initialMenuItems} categories={initialCategories} />
      </TabsContent>
      <TabsContent value="categories" className="mt-4">
        <CategoriesTab categories={initialCategories} />
      </TabsContent>
      <TabsContent value="suggestions" className="mt-4">
        <SuggestItemTool />
      </TabsContent>
      <TabsContent value="analytics" className="mt-4">
        <AnalyticsTab categories={initialCategories} menuItems={initialMenuItems} />
      </TabsContent>
    </Tabs>
  );
}
