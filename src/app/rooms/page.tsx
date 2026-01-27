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
        <RoomsDisplay rooms={rooms} />
      </main>
      <Footer />
    </div>
  );
}
