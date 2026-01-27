'use server';

import { Header } from '@/components/layout/header';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { getCategories, getMenuItems, getBookings, getCustomers, getAdmins } from '@/lib/data';
import { getRooms } from '@/lib/rooms-data';
import { AuthGuard } from '@/components/admin/auth-guard';
import { type Category, type MenuItem, type Room, type Booking, type Customer, type Admin } from '@/lib/types';
import { cookies } from 'next/headers';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const sessionData = cookieStore.get('admin_session')?.value;
  const session = sessionData ? JSON.parse(sessionData) : null;

  const [categories, menuItems, rooms, bookings, customers, workers]: [Category[], MenuItem[], Room[], Booking[], Customer[], Admin[]] = await Promise.all([
      getCategories(),
      getMenuItems(),
      getRooms(),
      getBookings(),
      getCustomers(),
      getAdmins(),
  ]);

  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <AdminDashboard 
            initialCategories={categories} 
            initialMenuItems={menuItems}
            initialRooms={rooms}
            initialBookings={bookings}
            initialCustomers={customers}
            initialWorkers={workers}
            userRole={session?.role || 'receptionist'}
            username={session?.username}
          />
        </main>
      </div>
    </AuthGuard>
  );
}
