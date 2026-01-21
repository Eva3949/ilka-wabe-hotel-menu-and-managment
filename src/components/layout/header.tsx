'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bed, Utensils, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useEffect, useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Use sessionStorage to persist login state only for the session
    setIsAuthenticated(sessionStorage.getItem('isAuthenticated') === 'true');
  }, [pathname]);


  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    router.push('/login');
  };
  
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 w-full py-2">
      <div className="container">
        <div className="flex h-16 items-center justify-between rounded-full border border-border/40 bg-background/95 px-6 shadow-lg backdrop-blur-lg">
            <Link href="/" className="flex items-center gap-2">
            <Bed className="h-6 w-6 text-primary" />
            <span className="text-xl font-headline font-bold text-foreground">
                ilka Wabe Hotel
            </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
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
            {isAdminPage && isAuthenticated && (
                <Button onClick={handleLogout} variant="ghost" className="font-bold text-destructive hover:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            )}
            </nav>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              {isClient && (
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
                            {isAdminPage && isAuthenticated && (
                                <Button onClick={handleLogout} variant="ghost" className="font-bold justify-start text-destructive hover:text-destructive">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Button>
                            )}
                        </nav>
                    </div>
                    </SheetContent>
                </Sheet>
              )}
            </div>
        </div>
      </div>
    </header>
  );
}
