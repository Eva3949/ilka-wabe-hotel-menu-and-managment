
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Footer } from '@/components/layout/footer';
import { loginAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/lib/i18n/i18n-context';

export default function LoginPage() {
  const { t } = useI18n();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const result = await loginAction(formData);

    if (result?.error) {
      toast({
        title: t('auth.loginFailed'),
        description: result.error,
        variant: "destructive",
      });
      setIsLoading(false);
    } else if (result?.success) {
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('userRole', result.role || '');
      sessionStorage.setItem('lastActivity', Date.now().toString());
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-muted/40 py-12">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">{t('auth.title')}</CardTitle>
            <CardDescription>{t('auth.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="username">{t('auth.username')}</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder={t('auth.usernamePlaceholder')}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('auth.passwordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t('auth.loggingIn') : t('auth.login')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
