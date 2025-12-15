import { Header } from '@/components/layout/header';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { getCategories, getMenuItems } from '@/lib/data';

export default async function AdminPage() {
  const categories = await getCategories();
  const menuItems = await getMenuItems();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-headline font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your menu categories, items, and get AI-powered suggestions.</p>
        </div>
        <AdminDashboard initialCategories={categories} initialMenuItems={menuItems} />
      </main>
    </div>
  );
}
