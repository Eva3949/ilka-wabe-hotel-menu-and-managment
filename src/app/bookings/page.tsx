'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { BookingsTable } from '@/components/admin/bookings-table';
import { BookingFormDialog } from '@/components/admin/booking-form-dialog';
import type { Booking, Room, Customer } from '@/lib/types';
import { getBookings, getCustomers } from '@/lib/data';
import { getRooms } from '@/lib/rooms-data';
import { ContactSection } from '@/components/layout/contact-section';

export default function BookingsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');

  useEffect(() => {
    async function fetchData() {
      const [bookingsData, roomsData, customersData] = await Promise.all([
        getBookings(),
        getRooms(),
        getCustomers(),
      ]);
      setBookings(bookingsData);
      setRooms(roomsData);
      setCustomers(customersData);
    }
    fetchData();
    
    if (roomId) {
        setIsDialogOpen(true);
    }
  }, [roomId]);
  
  const initialBookingData = roomId ? { roomId } : undefined;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-4xl font-headline font-bold">My Bookings</h1>
                <p className="text-muted-foreground">View and manage your room reservations.</p>
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> New Booking
            </Button>
        </div>
        <BookingFormDialog
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            rooms={rooms}
            customers={customers}
            booking={initialBookingData}
        />
        <BookingsTable bookings={bookings} rooms={rooms} customers={customers} />
      </main>
       <ContactSection />
       <footer className="py-6 text-center text-muted-foreground bg-secondary/50">
        <p>&copy; {new Date().getFullYear()} ilka Wabe Hotel. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
