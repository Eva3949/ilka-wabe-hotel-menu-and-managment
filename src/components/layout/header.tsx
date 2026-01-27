'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bed, Utensils, Menu, LogOut, ShieldCheck, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { logoutAction } from '@/app/actions';
import { useI18n } from '@/lib/i18n/i18n-context';
import type { Language } from '@/lib/i18n/translations';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useI18n();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Use sessionStorage to persist login state only for the session
    setIsAuthenticated(sessionStorage.getItem('isAuthenticated') === 'true');
    setUserRole(sessionStorage.getItem('userRole'));
  }, [pathname]);


  const handleLogout = async () => {
    await logoutAction();
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
    router.push('/login');
    router.refresh();
  };
  
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 w-full py-2">
      <div className="container">
        <div className="flex h-16 items-center justify-between rounded-full border border-border/40 bg-background/95 px-6 shadow-lg shadow-yellow-400/50 backdrop-blur-lg">
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
                {t('nav.menu')}
                </Link>
            </Button>
            <Button asChild variant="ghost" className="font-bold">
                <Link href="/rooms">
                <Bed className="mr-2 h-4 w-4" />
                {t('nav.rooms')}
                </Link>
            </Button>
            
            {isClient && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="font-bold">
                    <Languages className="h-4 w-4" />
                    <span className="sr-only">{t('nav.switchLanguage')}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-accent' : ''}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('am')} className={language === 'am' ? 'bg-accent' : ''}>
                    አማርኛ (Amharic)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('om')} className={language === 'om' ? 'bg-accent' : ''}>
                    Afaan Oromoo
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {isAdminPage && isAuthenticated && (
                <Button onClick={handleLogout} variant="ghost" className="font-bold text-destructive hover:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('nav.logout')}
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
                        <SheetHeader className="sr-only">
                            <SheetTitle>Navigation Menu</SheetTitle>
                            <SheetDescription>
                                Access hotel menu, rooms, and language settings.
                            </SheetDescription>
                        </SheetHeader>
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
                                {t('nav.menu')}
                                </Link>
                            </Button>
                            <Button asChild variant="ghost" className="font-bold justify-start">
                                <Link href="/rooms">
                                <Bed className="mr-2 h-4 w-4" />
                                {t('nav.rooms')}
                                </Link>
                            </Button>
                            
                            <div className="pt-4 mt-4 border-t border-border">
                              <p className="text-xs font-semibold text-muted-foreground px-4 mb-2">Language / ቋንቋ</p>
                              <div className="flex gap-2 px-2">
                                <Button 
                                  variant={language === 'en' ? 'default' : 'outline'} 
                                  size="sm" 
                                  onClick={() => setLanguage('en')}
                                  className="flex-1"
                                >
                                  English
                                </Button>
                                <Button 
                                  variant={language === 'am' ? 'default' : 'outline'} 
                                  size="sm" 
                                  onClick={() => setLanguage('am')}
                                  className="flex-1"
                                >
                                  አማርኛ
                                </Button>
                                <Button 
                                  variant={language === 'om' ? 'default' : 'outline'} 
                                  size="sm" 
                                  onClick={() => setLanguage('om')}
                                  className="flex-1"
                                >
                                  Oromoo
                                </Button>
                              </div>
                            </div>

                            {isAdminPage && isAuthenticated && (
                                <Button onClick={handleLogout} variant="ghost" className="font-bold justify-start text-destructive hover:text-destructive">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    {t('nav.logout')}
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
