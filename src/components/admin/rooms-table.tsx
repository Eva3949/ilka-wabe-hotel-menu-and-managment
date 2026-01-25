import type { Room } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RoomActions } from './room-actions';
import Image from 'next/image';
import { BedDouble, Users } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface RoomsTableProps {
  rooms: Room[];
}

export function RoomsTable({ rooms }: RoomsTableProps) {
  if (rooms.length === 0) {
    return (
       <div className="text-center p-8 text-muted-foreground">
          No rooms found. Add one to get started!
      </div>
    );
  }

  return (
    <>
      {/* Desktop View */}
      <Card className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Bed Type</TableHead>
              <TableHead className="text-right">Price/Night</TableHead>
              <TableHead className="text-right w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>
                  <Image
                    src={room.imageUrl || 'https://picsum.photos/seed/placeholder/600/400'}
                    alt={room.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                    data-ai-hint={room.imageHint}
                  />
                </TableCell>
                <TableCell className="font-medium">{room.name}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>{room.bedType}</TableCell>
                <TableCell className="text-right">{formatCurrency(room.pricePerNight)} Birr</TableCell>
                <TableCell className="text-right">
                  <RoomActions room={room} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      {/* Mobile View */}
      <div className="md:hidden grid gap-4">
        {rooms.map((room) => (
          <Card key={room.id}>
             <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <RoomActions room={room} />
                </div>
             </CardHeader>
             <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" /> <span>Capacity: {room.capacity}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BedDouble className="h-4 w-4" /> <span>{room.bedType}</span>
                </div>
             </CardContent>
             <CardFooter>
                 <div className="font-bold text-primary">{formatCurrency(room.pricePerNight)} Birr / night</div>
             </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
