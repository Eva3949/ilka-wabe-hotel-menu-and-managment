import { unstable_noStore as noStore } from 'next/cache';
import type { MenuItem, Category, Customer, Booking, Room } from './types';
import { placeholderImages } from './placeholder-images.json';
import { roomsData } from './rooms-data';

// In-memory store
let categories: Category[] = [
  { id: '1', name: 'Appetizers' },
  { id: '2', name: 'Main Courses' },
  { id: '3', name: 'Desserts' },
  { id: '4', name: 'Drinks' },
];

let menuItems: MenuItem[] = [
  { id: '1', name: 'Bruschetta', description: 'Toasted bread with tomatoes, garlic, and basil.', price: 8.99, itemType: 'Veg', categoryId: '1', imageUrl: placeholderImages[0].imageUrl, imageHint: placeholderImages[0].imageHint },
  { id: '2', name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and basil.', price: 10.50, itemType: 'Veg', categoryId: '1', imageUrl: placeholderImages[1].imageUrl, imageHint: placeholderImages[1].imageHint },
  { id: '9', name: 'Fried Calamari', description: 'Crispy fried calamari rings served with a zesty marinara sauce.', price: 12.99, itemType: 'Non-Veg', categoryId: '1', imageUrl: placeholderImages[11].imageUrl, imageHint: placeholderImages[11].imageHint },
  { id: '10', name: 'Stuffed Mushrooms', description: 'Mushroom caps filled with seasoned breadcrumbs, garlic, and herbs.', price: 9.50, itemType: 'Veg', categoryId: '1', imageUrl: placeholderImages[12].imageUrl, imageHint: placeholderImages[12].imageHint },
  { id: '11', name: 'Garlic Bread with Cheese', description: 'Toasted baguette with garlic butter and melted mozzarella cheese.', price: 6.50, itemType: 'Veg', categoryId: '1', imageUrl: placeholderImages[13].imageUrl, imageHint: placeholderImages[13].imageHint },

  { id: '3', name: 'Spaghetti Carbonara', description: 'Pasta with eggs, cheese, pancetta, and pepper.', price: 15.99, itemType: 'Non-Veg', categoryId: '2', imageUrl: placeholderImages[2].imageUrl, imageHint: placeholderImages[2].imageHint },
  { id: '4', name: 'Margherita Pizza', description: 'Pizza with tomato sauce, mozzarella, and basil.', price: 14.50, itemType: 'Veg', categoryId: '2', imageUrl: placeholderImages[3].imageUrl, imageHint: placeholderImages[3].imageHint },
  { id: '12', name: 'Lasagna Bolognese', description: 'Layers of pasta, rich meat sauce, and creamy béchamel.', price: 17.50, itemType: 'Non-Veg', categoryId: '2', imageUrl: placeholderImages[14].imageUrl, imageHint: placeholderImages[14].imageHint },
  { id: '13', name: 'Chicken Parmesan', description: 'Breaded chicken breast topped with marinara and mozzarella, served with pasta.', price: 18.99, itemType: 'Non-Veg', categoryId: '2', imageUrl: placeholderImages[15].imageUrl, imageHint: placeholderImages[15].imageHint },
  { id: '14', name: 'Fettuccine Alfredo', description: 'Creamy parmesan sauce over tender fettuccine noodles.', price: 16.50, itemType: 'Veg', categoryId: '2', imageUrl: placeholderImages[16].imageUrl, imageHint: placeholderImages[16].imageHint },
  
  { id: '5', name: 'Tiramisu', description: 'Coffee-flavoured Italian dessert.', price: 7.50, itemType: 'Veg', categoryId: '3', imageUrl: placeholderImages[4].imageUrl, imageHint: placeholderImages[4].imageHint },
  { id: '6', name: 'Panna Cotta', description: 'Sweetened cream thickened with gelatin.', price: 6.99, itemType: 'Veg', categoryId: '3', imageUrl: placeholderImages[5].imageUrl, imageHint: placeholderImages[5].imageHint },
  { id: '15', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a gooey molten center, served with vanilla ice cream.', price: 8.50, itemType: 'Veg', categoryId: '3', imageUrl: placeholderImages[17].imageUrl, imageHint: placeholderImages[17].imageHint },
  { id: '16', name: 'Cannoli', description: 'Crisp pastry shells filled with sweet, creamy ricotta cheese.', price: 5.99, itemType: 'Veg', categoryId: '3', imageUrl: placeholderImages[18].imageUrl, imageHint: placeholderImages[18].imageHint },
  { id: '17', name: 'Lemon Sorbet', description: 'A refreshing and tangy lemon sorbet.', price: 4.50, itemType: 'Vegan', categoryId: '3', imageUrl: placeholderImages[19].imageUrl, imageHint: placeholderImages[19].imageHint },
  
  { id: '7', name: 'Espresso', description: 'Strong black coffee.', price: 3.00, itemType: 'Vegan', categoryId: '4', imageUrl: placeholderImages[6].imageUrl, imageHint: placeholderImages[6].imageHint },
  { id: '8', name: 'Latte', description: 'Espresso with steamed milk.', price: 4.50, itemType: 'Veg', categoryId: '4', imageUrl: placeholderImages[7].imageUrl, imageHint: placeholderImages[7].imageHint },
  { id: '18', name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice.', price: 5.50, itemType: 'Vegan', categoryId: '4', imageUrl: placeholderImages[20].imageUrl, imageHint: placeholderImages[20].imageHint },
  { id: '19', name: 'Iced Tea', description: 'Chilled black tea with a hint of lemon.', price: 3.50, itemType: 'Vegan', categoryId: '4', imageUrl: placeholderImages[21].imageUrl, imageHint: placeholderImages[21].imageHint },
  { id: '20', name: 'Bellini', description: 'A sparkling cocktail made with Prosecco and peach purée.', price: 9.00, itemType: 'Alcoholic', categoryId: '4', imageUrl: placeholderImages[22].imageUrl, imageHint: placeholderImages[22].imageHint },
];

let customers: Customer[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice.j@email.com', phone: '123-456-7890' },
    { id: '2', name: 'Bob Williams', email: 'bob.w@email.com', phone: '234-567-8901' },
    { id: '3', name: 'Charlie Brown', email: 'charlie.b@email.com', phone: '345-678-9012' },
];

let bookings: Booking[] = [
    { id: '1', customerId: '1', roomId: '2', checkIn: '2024-08-10', checkOut: '2024-08-15', status: 'Confirmed' },
    { id: '2', customerId: '2', roomId: '1', checkIn: '2024-08-12', checkOut: '2024-08-14', status: 'Checked-In' },
    { id: '3', customerId: '3', roomId: '4', checkIn: '2024-08-01', checkOut: '2024-08-05', status: 'Checked-Out' },
];


// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Category Functions ---

export async function getCategories(): Promise<Category[]> {
  noStore();
  await delay(100);
  return [...categories];
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
    noStore();
    await delay(100);
    return categories.find(c => c.id === id);
}

export async function addCategory(categoryData: Omit<Category, 'id'>): Promise<Category> {
  await delay(200);
  const newCategory: Category = {
    id: `cat_${Date.now()}`,
    ...categoryData,
  };
  categories.push(newCategory);
  return newCategory;
}

export async function updateCategory(id: string, categoryData: Partial<Omit<Category, 'id'>>): Promise<Category | null> {
  await delay(200);
  const index = categories.findIndex(c => c.id === id);
  if (index === -1) return null;
  categories[index] = { ...categories[index], ...categoryData };
  return categories[index];
}

export async function deleteCategory(id: string): Promise<boolean> {
  await delay(200);
  const initialLength = categories.length;
  categories = categories.filter(c => c.id !== id);
  // Also remove items associated with this category
  menuItems = menuItems.filter(item => item.categoryId !== id);
  return categories.length < initialLength;
}


// --- Menu Item Functions ---

export async function getMenuItems(): Promise<MenuItem[]> {
  noStore();
  await delay(100);
  return [...menuItems];
}

export async function getMenuItemById(id: string): Promise<MenuItem | undefined> {
    noStore();
    await delay(100);
    return menuItems.find(item => item.id === id);
}


export async function addMenuItem(itemData: Omit<MenuItem, 'id' | 'imageUrl' | 'imageHint'> & { imageUrl?: string | null }): Promise<MenuItem> {
  await delay(200);
  const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
  const newItem: MenuItem = {
    id: `item_${Date.now()}`,
    name: itemData.name,
    description: itemData.description,
    price: itemData.price,
    itemType: itemData.itemType,
    categoryId: itemData.categoryId,
    imageUrl: itemData.imageUrl || randomImage.imageUrl,
    imageHint: itemData.imageUrl ? '' : randomImage.imageHint,
  };
  menuItems.push(newItem);
  return newItem;
}

export async function updateMenuItem(id: string, itemData: Partial<Omit<MenuItem, 'id' | 'imageHint'>>): Promise<MenuItem | null> {
  await delay(200);
  const index = menuItems.findIndex(item => item.id === id);
  if (index === -1) return null;
  
  const oldImageUrl = menuItems[index].imageUrl;
  const updatedItem = { ...menuItems[index], ...itemData };

  if (itemData.imageUrl && itemData.imageUrl !== oldImageUrl) {
    updatedItem.imageHint = '';
  }

  if (itemData.imageUrl === '') {
    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    updatedItem.imageUrl = randomImage.imageUrl;
    updatedItem.imageHint = randomImage.imageHint;
  }
  
  menuItems[index] = updatedItem;
  return menuItems[index];
}

export async function deleteMenuItem(id: string): Promise<boolean> {
  await delay(200);
  const initialLength = menuItems.length;
  menuItems = menuItems.filter(item => item.id !== id);
  return menuItems.length < initialLength;
}

// --- Customer Functions ---

export async function getCustomers(): Promise<Customer[]> {
  noStore();
  await delay(100);
  return [...customers];
}

export async function addCustomer(customerData: Omit<Customer, 'id'>): Promise<Customer> {
  await delay(200);
  const newCustomer: Customer = {
    id: `cust_${Date.now()}`,
    ...customerData,
  };
  customers.push(newCustomer);
  return newCustomer;
}

export async function updateCustomer(id: string, customerData: Partial<Omit<Customer, 'id'>>): Promise<Customer | null> {
  await delay(200);
  const index = customers.findIndex(c => c.id === id);
  if (index === -1) return null;
  customers[index] = { ...customers[index], ...customerData };
  return customers[index];
}

export async function deleteCustomer(id: string): Promise<boolean> {
  await delay(200);
  const initialLength = customers.length;
  customers = customers.filter(c => c.id !== id);
  // Also delete bookings associated with this customer
  bookings = bookings.filter(b => b.customerId !== id);
  return customers.length < initialLength;
}

// --- Booking Functions ---

export async function getBookings(): Promise<Booking[]> {
    noStore();
    await delay(100);
    return [...bookings];
}

export async function addBooking(bookingData: Omit<Booking, 'id'>): Promise<Booking> {
    await delay(200);
    const newBooking: Booking = {
        id: `book_${Date.now()}`,
        ...bookingData,
    };
    bookings.push(newBooking);
    return newBooking;
}

export async function updateBooking(id: string, bookingData: Partial<Omit<Booking, 'id'>>): Promise<Booking | null> {
    await delay(200);
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;
    bookings[index] = { ...bookings[index], ...bookingData };
    return bookings[index];
}

export async function deleteBooking(id: string): Promise<boolean> {
    await delay(200);
    const initialLength = bookings.length;
    bookings = bookings.filter(b => b.id !== id);
    return bookings.length < initialLength;
}
