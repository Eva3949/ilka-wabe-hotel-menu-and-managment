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

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col group border-2 border-transparent shadow-lg shadow-primary/20 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300">
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden">
          <Image
            src={item.imageUrl || 'https://picsum.photos/seed/food/600/400'}
            alt={item.name}
            width={600}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={item.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-2xl mb-2">{item.name}</CardTitle>
            <Badge variant="secondary" className="whitespace-nowrap">{item.itemType}</Badge>
        </div>
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <p className="text-xl font-bold font-headline text-primary">
          {item.price.toFixed(2)} Birr
        </p>
      </CardFooter>
    </Card>
  );
}
