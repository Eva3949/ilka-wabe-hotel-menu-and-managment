import { Header } from '@/components/layout/header';
import { MenuDisplay } from '@/components/menu/menu-display';
import { getCategories, getMenuItems } from '@/lib/data';

export default async function Home() {
  const categories = await getCategories();
  const menuItems = await getMenuItems();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline text-primary tracking-widest">
            Haile Restaurant and Spa
          </h2>
          <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-foreground mt-2">
            Our Menu
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover a curated selection of our finest dishes, drinks, and desserts, crafted with love and the freshest ingredients.
          </p>
        </div>
        <MenuDisplay categories={categories} items={menuItems} />
      </main>
      <footer className="py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Haile Restaurant and Spa. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
