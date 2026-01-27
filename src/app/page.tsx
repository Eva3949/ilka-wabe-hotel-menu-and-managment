import { Header } from '@/components/layout/header';
import { Hero } from '@/components/layout/hero';
import { MenuDisplay } from '@/components/menu/menu-display';
import { getCategories, getMenuItems } from '@/lib/data';
import { Footer } from '@/components/layout/footer';

export default async function Home() {
  const categories = await getCategories();
  const menuItems = await getMenuItems();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <main id="menu" className="flex-1 container mx-auto px-4 py-8">
        <MenuDisplay categories={categories} items={menuItems} />
      </main>
      <Footer />
    </div>
  );
}
