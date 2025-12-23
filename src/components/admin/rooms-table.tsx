import type { Room } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { RoomActions } from './room-actions';
import Image from 'next/image';

interface RoomsTableProps {
  rooms: Room[];
}

export function RoomsTable({ rooms }: RoomsTableProps) {
  return (
    <Card>
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
              <TableCell className="text-right">${room.pricePerNight.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <RoomActions room={room} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {rooms.length === 0 && (
         <div className="text-center p-8 text-muted-foreground">
            No rooms found. Add one to get started!
        </div>
      )}
    </Card>
  );
}
