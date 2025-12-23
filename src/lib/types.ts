export interface Category {
  id: string;
  name: string;
}

export interface MenuItem {
  id:string;
  name: string;
  description: string;
  price: number;
  itemType: string;
  categoryId: string;
  imageUrl: string;
  imageHint: string;
}

export interface Room {
    id: string;
    name: string;
    description: string;
    pricePerNight: number;
    capacity: number;
    bedType: string;
    imageUrl?: string;
    imageHint: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: string;
  customerId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  status: 'Confirmed' | 'Checked-In' | 'Checked-Out' | 'Cancelled';
}
