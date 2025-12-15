import Link from "next/link";
import { UtensilsCrossed, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="text-xl font-headline font-bold text-foreground">
            MenuCentral
          </span>
        </Link>
        <nav>
          <Button asChild variant="ghost" className="font-bold">
            <Link href="/admin">
              <UserCog className="mr-2 h-4 w-4" />
              Admin Panel
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
