import { Header } from '@/components/layout/header';
import { Hero } from '@/components/layout/hero';
import { MenuDisplay } from '@/components/menu/menu-display';
import { getCategories, getMenuItems } from '@/lib/data';
import { ContactSection } from '@/components/layout/contact-section';

export default async function Home() {
  const categories = await getCategories();
  const menuItems = await getMenuItems();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-foreground mt-2">
            Our Menu
          </h2>
        </div>
        <MenuDisplay categories={categories} items={menuItems} />
      </main>
      <ContactSection />
      <footer className="py-6 text-center text-muted-foreground bg-secondary/50">
        <p>&copy; {new Date().getFullYear()} ilka Wabe Hotel. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
