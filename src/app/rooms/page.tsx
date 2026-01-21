import { Header } from '@/components/layout/header';
import { RoomCard } from '@/components/rooms/room-card';
import { roomsData } from '@/lib/rooms-data';
import { Footer } from '@/components/layout/footer';

export default function RoomsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-foreground mt-2">
            Our Rooms
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Comfort, elegance, and tranquility await. Choose the perfect space for your stay.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomsData.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
