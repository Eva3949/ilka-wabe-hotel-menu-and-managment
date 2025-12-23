'use client';

import type { Category, MenuItem, Room } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuItemsTab } from './menu-items-tab';
import { CategoriesTab } from './categories-tab';
import { RoomsTab } from './rooms-tab';
import { SuggestItemTool } from './suggest-item-tool';
import { AnalyticsTab } from './analytics-tab';
import { List, LayoutGrid, Sparkles, BarChart2, BedDouble } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AdminDashboardProps {
  initialCategories: Category[];
  initialMenuItems: MenuItem[];
  initialRooms: Room[];
}

export function AdminDashboard({ initialCategories, initialMenuItems, initialRooms }: AdminDashboardProps) {
  return (
    <Tabs defaultValue="items" className="w-full">
      <div className="md:hidden">
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <TabsList className="grid-cols-none w-max">
            <TabsTrigger value="items"><LayoutGrid className="mr-2 h-4 w-4" />Menu Items</TabsTrigger>
            <TabsTrigger value="categories"><List className="mr-2 h-4 w-4" />Categories</TabsTrigger>
            <TabsTrigger value="rooms"><BedDouble className="mr-2 h-4 w-4" />Rooms</TabsTrigger>
            <TabsTrigger value="suggestions"><Sparkles className="mr-2 h-4 w-4" />AI Suggestions</TabsTrigger>
            <TabsTrigger value="analytics"><BarChart2 className="mr-2 h-4 w-4" />Analytics</TabsTrigger>
          </TabsList>
        </ScrollArea>
      </div>
      <TabsList className="hidden md:grid w-full grid-cols-5">
        <TabsTrigger value="items"><LayoutGrid className="mr-2 h-4 w-4" />Menu Items</TabsTrigger>
        <TabsTrigger value="categories"><List className="mr-2 h-4 w-4" />Categories</TabsTrigger>
        <TabsTrigger value="rooms"><BedDouble className="mr-2 h-4 w-4" />Rooms</TabsTrigger>
        <TabsTrigger value="suggestions"><Sparkles className="mr-2 h-4 w-4" />AI Suggestions</TabsTrigger>
        <TabsTrigger value="analytics"><BarChart2 className="mr-2 h-4 w-4" />Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="items" className="mt-4">
        <MenuItemsTab menuItems={initialMenuItems} categories={initialCategories} />
      </TabsContent>
      <TabsContent value="categories" className="mt-4">
        <CategoriesTab categories={initialCategories} />
      </TabsContent>
      <TabsContent value="rooms" className="mt-4">
        <RoomsTab rooms={initialRooms} />
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
