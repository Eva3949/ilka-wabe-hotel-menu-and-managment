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
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-headline font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your hotel's operations from one central place.</p>
            </div>
            {session && (
              <div className="text-right hidden md:block">
                <p className="font-medium">Welcome, {session.username}</p>
                <p className="text-xs text-muted-foreground capitalize">{session.role}</p>
              </div>
            )}
          </div>
          <AdminDashboard 
            initialCategories={categories} 
            initialMenuItems={menuItems}
            initialRooms={rooms}
            initialBookings={bookings}
            initialCustomers={customers}
            initialWorkers={workers}
            userRole={session?.role || 'receptionist'}
          />
        </main>
      </div>
    </AuthGuard>
  );
}
