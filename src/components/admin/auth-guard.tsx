'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/layout/header';
import { logoutAction } from '@/app/actions';

export function AuthGuard({ children, requiredRole }: { children: React.ReactNode, requiredRole?: 'owner' | 'receptionist' }) {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'unauthorized'>('checking');

  const handleLogout = useCallback(async () => {
    await logoutAction();
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('lastActivity');
    router.push('/login');
    router.refresh();
  }, [router]);

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
      const userRole = sessionStorage.getItem('userRole') as 'owner' | 'receptionist' | null;
      const lastActivity = sessionStorage.getItem('lastActivity');
      
      const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes in ms

      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      // Check for inactivity
      if (lastActivity) {
        const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
        if (timeSinceLastActivity > INACTIVITY_LIMIT) {
          handleLogout();
          return;
        }
      }

      if (requiredRole && userRole !== requiredRole && userRole !== 'owner') {
        setAuthStatus('unauthorized');
      } else {
        setAuthStatus('authenticated');
        // Update activity on mount
        sessionStorage.setItem('lastActivity', Date.now().toString());
      }
    };

    checkAuth();

    // Listen for activity
    const updateActivity = () => {
      sessionStorage.setItem('lastActivity', Date.now().toString());
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, updateActivity));

    // Periodic check for inactivity (every minute)
    const interval = setInterval(checkAuth, 60000);

    return () => {
      events.forEach(event => window.removeEventListener(event, updateActivity));
      clearInterval(interval);
    };
  }, [router, requiredRole, handleLogout]);

  if (authStatus === 'checking') {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
              <div className="mb-8">
                <Skeleton className="h-10 w-1/2 mb-2" />
                <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="w-full h-10 mb-4" />
            <Skeleton className="w-full h-[400px]" />
        </main>
      </div>
    );
  }

  if (authStatus === 'unauthorized') {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
          <p className="text-muted-foreground mb-8">You do not have permission to view this page.</p>
          <button 
            onClick={() => router.push('/admin')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Back to Dashboard
          </button>
        </main>
      </div>
    );
  }

  return <>{children}</>;
}
