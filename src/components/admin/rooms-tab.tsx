'use client';

import { useState } from 'react';
import type { Room } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { RoomsTable } from './rooms-table';
import { RoomFormDialog } from './room-form-dialog';

interface RoomsTabProps {
  rooms: Room[];
}

export function RoomsTab({ rooms }: RoomsTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Room
        </Button>
      </div>
      <RoomFormDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <RoomsTable rooms={rooms} />
    </div>
  );
}
