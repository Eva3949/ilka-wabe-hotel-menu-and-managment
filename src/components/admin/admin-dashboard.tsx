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
  userRole
}: AdminDashboardProps) {
  const isOwner = userRole === 'owner';
  const gridCols = isOwner ? 'grid-cols-7' : 'grid-cols-6';

  return (
    <Tabs defaultValue="bookings" className="w-full">
      <div className="md:hidden">
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <TabsList>
            <TabsTrigger value="analytics"><BarChart2 className="mr-2 h-4 w-4" />Analytics</TabsTrigger>
            <TabsTrigger value="bookings"><CalendarDays className="mr-2 h-4 w-4" />Bookings</TabsTrigger>
            <TabsTrigger value="rooms"><BedDouble className="mr-2 h-4 w-4" />Rooms</TabsTrigger>
            <TabsTrigger value="customers"><Users className="mr-2 h-4 w-4" />Customers</TabsTrigger>
            <TabsTrigger value="items"><LayoutGrid className="mr-2 h-4 w-4" />Menu Items</TabsTrigger>
            <TabsTrigger value="categories"><List className="mr-2 h-4 w-4" />Categories</TabsTrigger>
            {isOwner && (
              <TabsTrigger value="workers"><ShieldAlert className="mr-2 h-4 w-4" />Workers</TabsTrigger>
            )}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <TabsList className={`hidden md:grid w-full ${gridCols}`}>
        <TabsTrigger value="analytics"><BarChart2 className="mr-2 h-4 w-4" />Analytics</TabsTrigger>
        <TabsTrigger value="bookings"><CalendarDays className="mr-2 h-4 w-4" />Bookings</TabsTrigger>
        <TabsTrigger value="rooms"><BedDouble className="mr-2 h-4 w-4" />Rooms</TabsTrigger>
        <TabsTrigger value="customers"><Users className="mr-2 h-4 w-4" />Customers</TabsTrigger>
        <TabsTrigger value="items"><LayoutGrid className="mr-2 h-4 w-4" />Menu Items</TabsTrigger>
        <TabsTrigger value="categories"><List className="mr-2 h-4 w-4" />Categories</TabsTrigger>
        {isOwner && (
          <TabsTrigger value="workers"><ShieldAlert className="mr-2 h-4 w-4" />Workers</TabsTrigger>
        )}
      </TabsList>
      
      <TabsContent value="analytics" className="mt-4">
        <AnalyticsTab 
          categories={initialCategories} 
          menuItems={initialMenuItems}
          rooms={initialRooms}
          bookings={initialBookings}
        />
      </TabsContent>
      <TabsContent value="bookings" className="mt-4">
        <BookingsTab bookings={initialBookings} rooms={initialRooms} customers={initialCustomers} />
      </TabsContent>
       <TabsContent value="rooms" className="mt-4">
        <RoomsTab rooms={initialRooms} />
      </TabsContent>
      <TabsContent value="customers" className="mt-4">
        <CustomersTab customers={initialCustomers} />
      </TabsContent>
      <TabsContent value="items" className="mt-4">
        <MenuItemsTab menuItems={initialMenuItems} categories={initialCategories} />
      </TabsContent>
      <TabsContent value="categories" className="mt-4">
        <CategoriesTab categories={initialCategories} />
      </TabsContent>
      {isOwner && (
        <TabsContent value="workers" className="mt-4">
          <WorkersTab workers={initialWorkers} />
        </TabsContent>
      )}
    </Tabs>
  );
}
