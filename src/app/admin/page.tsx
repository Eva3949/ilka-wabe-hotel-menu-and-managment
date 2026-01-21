'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { getCategories, getMenuItems, getBookings, getCustomers } from '@/lib/data';
import { getRooms } from '@/lib/rooms-data';
import type { Category, MenuItem, Room, Booking, Customer } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminPage() {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated'>('checking');
  const [data, setData] = useState<{
    categories: Category[];
    menuItems: MenuItem[];
    rooms: Room[];
    bookings: Booking[];
    customers: Customer[];
  } | null>(null);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      setAuthStatus('authenticated');
      Promise.all([
          getCategories(),
          getMenuItems(),
          getRooms(),
          getBookings(),
          getCustomers(),
      ]).then(([categories, menuItems, rooms, bookings, customers]) => {
          setData({ categories, menuItems, rooms, bookings, customers });
      });
    } else {
      router.push('/login');
    }
  }, [router]);

  if (authStatus !== 'authenticated' || !data) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                 <div className="mb-8">
                    <Skeleton className="h-10 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="w-full h-10 mb-4" />
                <Skeleton className="w-full h-[400px]" />
            </main>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-headline font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your hotel's operations from one central place.</p>
        </div>
        <AdminDashboard 
          initialCategories={data.categories} 
          initialMenuItems={data.menuItems}
          initialRooms={data.rooms}
          initialBookings={data.bookings}
          initialCustomers={data.customers}
        />
      </main>
    </div>
  );
}
