import Image from "next/image";
import type { MenuItem } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/i18n-context";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { t } = useI18n();
  return (
    <Card className="overflow-hidden flex flex-col group border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop'}
            alt={item.name}
            width={600}
            height={400}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
            data-ai-hint={item.imageHint}
          />
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
          <Badge className="bg-primary/90 hover:bg-primary text-white font-bold px-3 py-1 shadow-lg backdrop-blur-md border-none">
            {formatCurrency(item.price)} {t('menu.currency')}
          </Badge>
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-md shadow-sm border-none font-medium">
            {item.itemType}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </CardHeader>
      <CardContent className="p-5 flex-1 space-y-3">
        <CardTitle className="font-headline text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
          {item.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm leading-relaxed text-muted-foreground/90">
          {item.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
