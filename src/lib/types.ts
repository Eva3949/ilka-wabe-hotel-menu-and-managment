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
    imageUrl: string;
    imageHint: string;
}
