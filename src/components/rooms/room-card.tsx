import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Room } from "@/lib/types";
import { BedDouble, Users } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/i18n-context";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const { t } = useI18n();
  return (
    <Card className="overflow-hidden flex flex-col group border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2">
      <CardHeader className="p-0 relative">
        <div className="aspect-[16/10] overflow-hidden">
          <Image
            src={room.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop'}
            alt={room.name}
            width={600}
            height={400}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000"
            data-ai-hint={room.imageHint}
          />
        </div>
        <div className="absolute top-4 right-4">
          <Badge className="bg-white/90 hover:bg-white text-primary font-bold px-4 py-1.5 shadow-xl backdrop-blur-md border-none text-base">
            {formatCurrency(room.pricePerNight)} {t('menu.currency')} <span className="text-[10px] text-muted-foreground ml-1 font-normal">/{t('rooms.perNight')}</span>
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
          <CardTitle className="font-headline text-2xl font-bold drop-shadow-md">
            {room.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1 space-y-4">
        <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full text-primary">
            <Users className="h-4 w-4" />
            <span>{t('rooms.upToGuests').replace('{count}', room.capacity.toString())}</span>
          </div>
          <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full text-primary">
            <BedDouble className="h-4 w-4" />
            <span>{room.bedType}</span>
          </div>
        </div>
        <CardDescription className="line-clamp-3 text-base leading-relaxed text-muted-foreground/80 italic">
          "{room.description}"
        </CardDescription>
      </CardContent>
    </Card>
  );
}
