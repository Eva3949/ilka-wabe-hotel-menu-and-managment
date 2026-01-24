import { Header } from '@/components/layout/header';
import { RoomsDisplay } from '@/components/rooms/rooms-display';
import { getRooms } from '@/lib/rooms-data';
import { Footer } from '@/components/layout/footer';

export default async function RoomsPage() {
  const rooms = await getRooms();
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
        <RoomsDisplay rooms={rooms} />
      </main>
      <Footer />
    </div>
  );
}
