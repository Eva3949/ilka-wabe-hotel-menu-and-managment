'use client';

import type { Category, MenuItem, Room, Booking, Customer, Admin } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuItemsTab } from './menu-items-tab';
import { CategoriesTab } from './categories-tab';
import { RoomsTab } from './rooms-tab';
import { BookingsTab } from './bookings-tab';
import { CustomersTab } from './customers-tab';
import { AnalyticsTab } from './analytics-tab';
import { WorkersTab } from './workers-tab';
import { List, LayoutGrid, BarChart2, BedDouble, CalendarDays, Users, ShieldAlert } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useI18n } from '@/lib/i18n/i18n-context';

interface AdminDashboardProps {
  initialCategories: Category[];
  initialMenuItems: MenuItem[];
  initialRooms: Room[];
  initialBookings: Booking[];
  initialCustomers: Customer[];
  initialWorkers: Admin[];
  userRole: 'owner' | 'receptionist';
}

export function AdminDashboard({ 
  initialCategories, 
  initialMenuItems, 
  initialRooms, 
  initialBookings, 
  initialCustomers,
  initialWorkers,
  userRole,
  username
}: AdminDashboardProps & { username?: string }) {
  const { t } = useI18n();
  const isOwner = userRole === 'owner';

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold">{t('admin.title')}</h1>
          <p className="text-muted-foreground">{t('admin.description')}</p>
        </div>
        {username && (
          <div className="text-right hidden md:block">
            <p className="font-medium">{t('admin.welcome').replace('{name}', username)}</p>
            <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
          </div>
        )}
      </div>

      <Tabs defaultValue="bookings" className="w-full space-y-8">
      <div className="bg-card/50 backdrop-blur-md p-1.5 rounded-2xl border border-border/40 shadow-sm overflow-hidden">
        <div className="md:hidden">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="bg-transparent h-auto p-0 flex gap-1">
              <TabsTrigger value="analytics" className="px-4 py-2.5 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"><BarChart2 className="mr-2 h-4 w-4" />{t('admin.tabs.analytics')}</TabsTrigger>
              <TabsTrigger value="bookings" className="px-4 py-2.5 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"><CalendarDays className="mr-2 h-4 w-4" />{t('admin.tabs.bookings')}</TabsTrigger>
              <TabsTrigger value="rooms" className="px-4 py-2.5 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"><BedDouble className="mr-2 h-4 w-4" />{t('admin.tabs.rooms')}</TabsTrigger>
              <TabsTrigger value="customers" className="px-4 py-2.5 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"><Users className="mr-2 h-4 w-4" />{t('admin.tabs.customers')}</TabsTrigger>
              <TabsTrigger value="items" className="px-4 py-2.5 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"><LayoutGrid className="mr-2 h-4 w-4" />{t('admin.tabs.menu')}</TabsTrigger>
              <TabsTrigger value="categories" className="px-4 py-2.5 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"><List className="mr-2 h-4 w-4" />{t('admin.tabs.categories')}</TabsTrigger>
              {isOwner && (
                <TabsTrigger value="workers" className="px-4 py-2.5 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"><ShieldAlert className="mr-2 h-4 w-4" />{t('admin.tabs.workers')}</TabsTrigger>
              )}
            </TabsList>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </div>
        <TabsList className="hidden md:flex bg-transparent h-auto p-0 gap-1">
          <TabsTrigger value="analytics" className="flex-1 px-4 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all font-bold uppercase tracking-wider text-xs"><BarChart2 className="mr-2 h-4 w-4" />{t('admin.tabs.analytics')}</TabsTrigger>
          <TabsTrigger value="bookings" className="flex-1 px-4 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all font-bold uppercase tracking-wider text-xs"><CalendarDays className="mr-2 h-4 w-4" />{t('admin.tabs.bookings')}</TabsTrigger>
          <TabsTrigger value="rooms" className="flex-1 px-4 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all font-bold uppercase tracking-wider text-xs"><BedDouble className="mr-2 h-4 w-4" />{t('admin.tabs.rooms')}</TabsTrigger>
          <TabsTrigger value="customers" className="flex-1 px-4 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all font-bold uppercase tracking-wider text-xs"><Users className="mr-2 h-4 w-4" />{t('admin.tabs.customers')}</TabsTrigger>
          <TabsTrigger value="items" className="flex-1 px-4 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all font-bold uppercase tracking-wider text-xs"><LayoutGrid className="mr-2 h-4 w-4" />{t('admin.tabs.menu')}</TabsTrigger>
          <TabsTrigger value="categories" className="flex-1 px-4 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all font-bold uppercase tracking-wider text-xs"><List className="mr-2 h-4 w-4" />{t('admin.tabs.categories')}</TabsTrigger>
          {isOwner && (
            <TabsTrigger value="workers" className="flex-1 px-4 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all font-bold uppercase tracking-wider text-xs"><ShieldAlert className="mr-2 h-4 w-4" />{t('admin.tabs.workers')}</TabsTrigger>
          )}
        </TabsList>
      </div>
      
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <TabsContent value="analytics" className="mt-0 focus-visible:outline-none">
          <AnalyticsTab 
            categories={initialCategories} 
            menuItems={initialMenuItems}
            rooms={initialRooms}
            bookings={initialBookings}
          />
        </TabsContent>
        <TabsContent value="bookings" className="mt-0 focus-visible:outline-none">
          <BookingsTab bookings={initialBookings} rooms={initialRooms} customers={initialCustomers} />
        </TabsContent>
         <TabsContent value="rooms" className="mt-0 focus-visible:outline-none">
          <RoomsTab rooms={initialRooms} />
        </TabsContent>
        <TabsContent value="customers" className="mt-0 focus-visible:outline-none">
          <CustomersTab customers={initialCustomers} />
        </TabsContent>
        <TabsContent value="items" className="mt-0 focus-visible:outline-none">
          <MenuItemsTab menuItems={initialMenuItems} categories={initialCategories} />
        </TabsContent>
        <TabsContent value="categories" className="mt-0 focus-visible:outline-none">
          <CategoriesTab categories={initialCategories} />
        </TabsContent>
        {isOwner && (
          <TabsContent value="workers" className="mt-0 focus-visible:outline-none">
            <WorkersTab workers={initialWorkers} />
          </TabsContent>
        )}
      </div>
    </Tabs>
    </div>
  );
}
