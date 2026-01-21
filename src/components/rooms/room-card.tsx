import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Room } from "@/lib/rooms-data";
import { Button } from "../ui/button";
import { BedDouble, Users } from "lucide-react";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col group border-2 border-transparent shadow-lg hover:border-primary/50 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden">
          <Image
            src={room.imageUrl}
            alt={room.name}
            width={600}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={room.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <div className="flex justify-between items-start mb-2">
            <CardTitle className="font-headline text-2xl">{room.name}</CardTitle>
            <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1.5">
                    <Users className="h-3 w-3" />
                    <span>{room.capacity}</span>
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1.5">
                    <BedDouble className="h-3 w-3" />
                    <span>{room.bedType}</span>
                </Badge>
            </div>
        </div>
        <CardDescription>{room.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <div>
          <p className="text-xl font-bold font-headline text-primary">
            {room.pricePerNight.toFixed(2)} Birr
          </p>
          <p className="text-xs text-muted-foreground">per night</p>
        </div>
      </CardFooter>
    </Card>
  );
}
