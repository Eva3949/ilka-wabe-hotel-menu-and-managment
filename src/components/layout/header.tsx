import Link from 'next/link';
import { Bed, UserCog, Utensils, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Bed className="h-6 w-6 text-primary" />
          <span className="text-xl font-headline font-bold text-foreground">
            ilka Wabe Hotel
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost" className="font-bold">
            <Link href="/">
              <Utensils className="mr-2 h-4 w-4" />
              Menu
            </Link>
          </Button>
          <Button asChild variant="ghost" className="font-bold">
            <Link href="/rooms">
              <Bed className="mr-2 h-4 w-4" />
              Rooms
            </Link>
          </Button>
          <Button asChild variant="ghost" className="font-bold">
            <Link href="/admin">
              <UserCog className="mr-2 h-4 w-4" />
              Admin Panel
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 p-4">
                <Link href="/" className="flex items-center gap-2 mb-4">
                    <Bed className="h-6 w-6 text-primary" />
                    <span className="text-xl font-headline font-bold text-foreground">
                        ilka Wabe Hotel
                    </span>
                </Link>
                <nav className="flex flex-col gap-2">
                    <Button asChild variant="ghost" className="font-bold justify-start">
                        <Link href="/">
                        <Utensils className="mr-2 h-4 w-4" />
                        Menu
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="font-bold justify-start">
                        <Link href="/rooms">
                        <Bed className="mr-2 h-4 w-4" />
                        Rooms
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="font-bold justify-start">
                        <Link href="/admin">
                        <UserCog className="mr-2 h-4 w-4" />
                        Admin Panel
                        </Link>
                    </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
