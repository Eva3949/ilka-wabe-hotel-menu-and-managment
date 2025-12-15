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
