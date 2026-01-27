'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { BookingsTable } from '@/components/admin/bookings-table';
import { BookingFormDialog } from '@/components/admin/booking-form-dialog';
import type { Booking, Room, Customer } from '@/lib/types';
import { useI18n } from '@/lib/i18n/i18n-context';

interface BookingsClientProps {
  initialBookings: Booking[];
  rooms: Room[];
  customers: Customer[];
  initialRoomId?: string | null;
}

export function BookingsClient({ 
  initialBookings, 
  rooms, 
  customers, 
  initialRoomId 
}: BookingsClientProps) {
  const { t } = useI18n();
  const [isDialogOpen, setIsDialogOpen] = useState(!!initialRoomId);
  
  const initialBookingData = initialRoomId ? { roomId: initialRoomId } : undefined;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
          <div>
              <h1 className="text-4xl font-headline font-bold">{t('bookings.title')}</h1>
              <p className="text-muted-foreground">{t('bookings.description')}</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> {t('bookings.newBooking')}
          </Button>
      </div>
      <BookingFormDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          rooms={rooms}
          customers={customers}
          booking={initialBookingData}
      />
      <BookingsTable bookings={initialBookings} rooms={rooms} customers={customers} />
    </>
  );
}
