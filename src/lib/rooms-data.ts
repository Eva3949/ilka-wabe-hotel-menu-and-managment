import type { Room } from './types';
import { placeholderImages } from './placeholder-images.json';

// In-memory store
let rooms: Room[] = [
    {
        id: '1',
        name: 'Standard Queen Room',
        description: 'A comfortable room with a queen-sized bed, perfect for solo travelers or couples. Includes a work desk and a city view.',
        pricePerNight: 150,
        capacity: 2,
        bedType: 'Queen',
        imageUrl: placeholderImages.find(p => p.id === 'room-1')?.imageUrl || 'https://picsum.photos/seed/room1/600/400',
        imageHint: 'hotel room'
    },
    {
        id: '2',
        name: 'Deluxe King Suite',
        description: 'Experience luxury in our spacious Deluxe King Suite, featuring a king-sized bed, a separate seating area, and panoramic city views.',
        pricePerNight: 250,
        capacity: 2,
        bedType: 'King',
        imageUrl: placeholderImages.find(p => p.id === 'room-2')?.imageUrl || 'https://picsum.photos/seed/room2/600/400',
        imageHint: 'luxury suite'
    },
    {
        id: '3',
        name: 'Family Suite',
        description: 'Ideal for families, this suite offers two queen beds and a comfortable living area. Enjoy the extra space and modern amenities.',
        pricePerNight: 320,
        capacity: 4,
        bedType: '2 Queens',
        imageUrl: placeholderImages.find(p => p.id === 'room-3')?.imageUrl || 'https://picsum.photos/seed/room3/600/400',
        imageHint: 'hotel suite'
    },
    {
        id: '4',
        name: 'Twin Room',
        description: 'Perfect for friends traveling together, this room features two comfortable twin beds and all the essential amenities for a pleasant stay.',
        pricePerNight: 170,
        capacity: 2,
        bedType: 'Twin',
        imageUrl: placeholderImages.find(p => p.id === 'room-4')?.imageUrl || 'https://picsum.photos/seed/room4/600/400',
        imageHint: 'twin room'
    },
];

// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export async function getRooms(): Promise<Room[]> {
  await delay(50);
  return [...rooms];
}

export async function getRoomById(id: string): Promise<Room | undefined> {
    await delay(50);
    return rooms.find(r => r.id === id);
}

export async function addRoom(roomData: Omit<Room, 'id' | 'imageHint'>): Promise<Room> {
  await delay(200);
  const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
  const newRoom: Room = {
    id: (rooms.length + 1 + Math.random()).toString(),
    ...roomData,
    imageUrl: roomData.imageUrl || randomImage.imageUrl,
    imageHint: 'hotel room', // generic hint
  };
  rooms.push(newRoom);
  return newRoom;
}

export async function updateRoom(id: string, roomData: Partial<Omit<Room, 'id' | 'imageHint'>>): Promise<Room | null> {
  await delay(200);
  const index = rooms.findIndex(r => r.id === id);
  if (index === -1) return null;
  rooms[index] = { ...rooms[index], ...roomData };
  return rooms[index];
}

export async function deleteRoom(id: string): Promise<boolean> {
  await delay(200);
  const initialLength = rooms.length;
  rooms = rooms.filter(r => r.id !== id);
  return rooms.length < initialLength;
}

export { rooms as roomsData };
