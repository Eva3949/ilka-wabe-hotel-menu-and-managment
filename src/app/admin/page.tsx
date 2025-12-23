import { Header } from '@/components/layout/header';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { getCategories, getMenuItems, getBookings, getCustomers } from '@/lib/data';
import { getRooms } from '@/lib/rooms-data';

export default async function AdminPage() {
  const categories = await getCategories();
  const menuItems = await getMenuItems();
  const rooms = await getRooms();
  const bookings = await getBookings();
  const customers = await getCustomers();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-headline font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your hotel's operations from one central place.</p>
        </div>
        <AdminDashboard 
          initialCategories={categories} 
          initialMenuItems={menuItems}
          initialRooms={rooms}
          initialBookings={bookings}
          initialCustomers={customers}
        />
      </main>
    </div>
  );
}
