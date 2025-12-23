export interface Room {
    id: string;
    name: string;
    description: string;
    pricePerNight: number;
    capacity: number;
    bedType: string;
    imageUrl: string;
    imageHint: string;
}

export const roomsData: Room[] = [
    {
        id: '1',
        name: 'Standard Queen Room',
        description: 'A comfortable room with a queen-sized bed, perfect for solo travelers or couples. Includes a work desk and a city view.',
        pricePerNight: 150,
        capacity: 2,
        bedType: 'Queen',
        imageUrl: 'https://picsum.photos/seed/room1/600/400',
        imageHint: 'hotel room'
    },
    {
        id: '2',
        name: 'Deluxe King Suite',
        description: 'Experience luxury in our spacious Deluxe King Suite, featuring a king-sized bed, a separate seating area, and panoramic city views.',
        pricePerNight: 250,
        capacity: 2,
        bedType: 'King',
        imageUrl: 'https://picsum.photos/seed/room2/600/400',
        imageHint: 'luxury suite'
    },
    {
        id: '3',
        name: 'Family Suite',
        description: 'Ideal for families, this suite offers two queen beds and a comfortable living area. Enjoy the extra space and modern amenities.',
        pricePerNight: 320,
        capacity: 4,
        bedType: '2 Queens',
        imageUrl: 'https://picsum.photos/seed/room3/600/400',
        imageHint: 'hotel suite'
    },
    {
        id: '4',
        name: 'Twin Room',
        description: 'Perfect for friends traveling together, this room features two comfortable twin beds and all the essential amenities for a pleasant stay.',
        pricePerNight: 170,
        capacity: 2,
        bedType: 'Twin',
        imageUrl: 'https://picsum.photos/seed/room4/600/400',
        imageHint: 'twin room'
    },
];
