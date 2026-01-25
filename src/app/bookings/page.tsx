import { Header } from '@/components/layout/header';
import { getBookings, getCustomers } from '@/lib/data';
import { getRooms } from '@/lib/rooms-data';
import { Footer } from '@/components/layout/footer';
import { BookingsClient } from '@/components/bookings/bookings-client';

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const roomId = typeof resolvedParams.roomId === 'string' ? resolvedParams.roomId : null;

  const [bookings, rooms, customers] = await Promise.all([
    getBookings(),
    getRooms(),
    getCustomers(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <BookingsClient 
          initialBookings={bookings}
          rooms={rooms}
          customers={customers}
          initialRoomId={roomId}
        />
      </main>
      <Footer />
    </div>
  );
}
