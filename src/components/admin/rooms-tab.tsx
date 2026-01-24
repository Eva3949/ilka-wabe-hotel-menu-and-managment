'use client';

import { useState, useMemo } from 'react';
import type { Room } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { RoomsTable } from './rooms-table';
import { RoomFormDialog } from './room-form-dialog';
import { Input } from '@/components/ui/input';

interface RoomsTabProps {
  rooms: Room[];
}

export function RoomsTab({ rooms }: RoomsTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.bedType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [rooms, searchQuery]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Room
        </Button>
      </div>
      <RoomFormDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <RoomsTable rooms={filteredRooms} />
    </div>
  );
}
