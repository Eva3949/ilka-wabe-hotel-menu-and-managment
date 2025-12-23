'use client';

import { useState } from 'react';
import type { Booking, Room, Customer } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { BookingsTable } from './bookings-table';
import { BookingFormDialog } from './booking-form-dialog';

interface BookingsTabProps {
  bookings: Booking[];
  rooms: Room[];
  customers: Customer[];
}

export function BookingsTab({ bookings, rooms, customers }: BookingsTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Booking
        </Button>
      </div>
      <BookingFormDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        rooms={rooms}
        customers={customers}
      />
      <BookingsTable bookings={bookings} rooms={rooms} customers={customers} />
    </div>
  );
}
