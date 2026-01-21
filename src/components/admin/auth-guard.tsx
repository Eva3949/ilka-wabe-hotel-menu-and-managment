'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/layout/header';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated'>('checking');

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      setAuthStatus('authenticated');
    } else {
      router.push('/login');
    }
  }, [router]);

  if (authStatus !== 'authenticated') {
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

  return <>{children}</>;
}
