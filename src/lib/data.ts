import { unstable_noStore as noStore } from 'next/cache';
import type { MenuItem, Category, Customer, Booking, Admin } from './types';
import { db } from './db';
import { categories, menuItems, customers, bookings, admins } from '../db/schema';
import { eq } from 'drizzle-orm';

// --- Category Functions ---

export async function getCategories(): Promise<Category[]> {
  noStore();
  return await db.select().from(categories);
}

export async function getCategoryById(id: string): Promise<Category | null> {
    noStore();
    const result = await db.select().from(categories).where(eq(categories.id, id));
    return result[0] || null;
}

export async function addCategory(categoryData: Omit<Category, 'id'>): Promise<Category> {
  const id = crypto.randomUUID();
  await db.insert(categories).values({
    id,
    ...categoryData
  });
  return { id, ...categoryData };
}

export async function updateCategory(id: string, categoryData: Partial<Omit<Category, 'id'>>): Promise<Category | null> {
  await db.update(categories).set(categoryData).where(eq(categories.id, id));
  return await getCategoryById(id);
}

export async function deleteCategory(id: string): Promise<boolean> {
  try {
    // Delete associated menu items first
    await db.delete(menuItems).where(eq(menuItems.categoryId, id));
    await db.delete(categories).where(eq(categories.id, id));
    return true;
  } catch (error) {
    console.error("Failed to delete category:", error);
    return false;
  }
}


// --- Menu Item Functions ---

export async function getMenuItems(): Promise<MenuItem[]> {
  noStore();
  return await db.select().from(menuItems);
}

export async function getMenuItemById(id: string): Promise<MenuItem | null> {
    noStore();
    const result = await db.select().from(menuItems).where(eq(menuItems.id, id));
    return result[0] || null;
}


export async function addMenuItem(itemData: Omit<MenuItem, 'id' | 'imageUrl' | 'imageHint'> & { imageUrl?: string | null }): Promise<MenuItem> {
  const id = crypto.randomUUID();
  const imageUrl = itemData.imageUrl || 'https://picsum.photos/seed/food/600/400';
  const newItem = {
    id,
    name: itemData.name,
    description: itemData.description,
    price: itemData.price,
    itemType: itemData.itemType,
    categoryId: itemData.categoryId,
    imageUrl: imageUrl,
    imageHint: 'food item',
  };
  await db.insert(menuItems).values(newItem);
  return newItem;
}

export async function updateMenuItem(id: string, itemData: Partial<Omit<MenuItem, 'id' | 'imageHint'>>): Promise<MenuItem | null> {
  await db.update(menuItems).set(itemData as any).where(eq(menuItems.id, id));
  return await getMenuItemById(id);
}

export async function deleteMenuItem(id: string): Promise<boolean> {
  try {
    await db.delete(menuItems).where(eq(menuItems.id, id));
    return true;
  } catch (error) {
    return false;
  }
}

// --- Customer Functions ---

export async function getCustomers(): Promise<Customer[]> {
  noStore();
  return await db.select().from(customers);
}

export async function addCustomer(customerData: Omit<Customer, 'id'>): Promise<Customer> {
  const id = crypto.randomUUID();
  await db.insert(customers).values({
    id,
    ...customerData
  });
  return { id, ...customerData };
}

export async function updateCustomer(id: string, customerData: Partial<Omit<Customer, 'id'>>): Promise<Customer | null> {
  await db.update(customers).set(customerData).where(eq(customers.id, id));
  const result = await db.select().from(customers).where(eq(customers.id, id));
  return result[0] || null;
}

export async function deleteCustomer(id: string): Promise<boolean> {
  try {
    // Also delete bookings associated with this customer
    await db.delete(bookings).where(eq(bookings.customerId, id));
    await db.delete(customers).where(eq(customers.id, id));
    return true;
  } catch (error) {
    return false;
  }
}

// --- Booking Functions ---

export async function getBookings(): Promise<Booking[]> {
    noStore();
    const result = await db.select().from(bookings);
    return result.map(b => ({
      ...b,
      checkIn: b.checkIn.toISOString().split('T')[0],
      checkOut: b.checkOut.toISOString().split('T')[0],
      status: b.status as any
    }));
}

export async function addBooking(bookingData: Omit<Booking, 'id'>): Promise<Booking> {
  const id = crypto.randomUUID();
  const newBooking = {
    id,
    customerId: bookingData.customerId,
    roomId: bookingData.roomId,
    checkIn: new Date(bookingData.checkIn),
    checkOut: new Date(bookingData.checkOut),
    status: bookingData.status,
  };
  await db.insert(bookings).values(newBooking);
  return {
    ...newBooking,
    checkIn: newBooking.checkIn.toISOString().split('T')[0],
    checkOut: newBooking.checkOut.toISOString().split('T')[0],
    status: newBooking.status as any
  };
}

export async function updateBooking(id: string, bookingData: Partial<Omit<Booking, 'id'>>): Promise<Booking | null> {
  const data: any = { ...bookingData };
  if (bookingData.checkIn) data.checkIn = new Date(bookingData.checkIn);
  if (bookingData.checkOut) data.checkOut = new Date(bookingData.checkOut);

  await db.update(bookings).set(data).where(eq(bookings.id, id));
  
  const result = await db.select().from(bookings).where(eq(bookings.id, id));
  const booking = result[0];
  if (!booking) return null;

  return {
    ...booking,
    checkIn: booking.checkIn.toISOString().split('T')[0],
    checkOut: booking.checkOut.toISOString().split('T')[0],
    status: booking.status as any
  };
}

export async function deleteBooking(id: string): Promise<boolean> {
  try {
    await db.delete(bookings).where(eq(bookings.id, id));
    return true;
  } catch (error) {
    return false;
  }
}

// --- Admin Functions ---

export async function getAdmins(): Promise<Admin[]> {
  noStore();
  const result = await db.select().from(admins);
  return result.map(admin => {
    const { password, ...rest } = admin;
    return rest as Admin;
  });
}

export async function getAdminByUsername(username: string): Promise<Admin | null> {
  noStore();
  const result = await db.select().from(admins).where(eq(admins.username, username));
  const admin = result[0];
  if (!admin) return null;
  const { password, ...rest } = admin;
  return rest as Admin;
}

export async function addAdmin(adminData: Omit<Admin, 'id'>): Promise<Admin> {
  const id = crypto.randomUUID();
  await db.insert(admins).values({
    id,
    username: adminData.username,
    password: adminData.password!,
    role: adminData.role,
  });
  const { password, ...rest } = { id, ...adminData };
  return rest as Admin;
}

export async function updateAdmin(id: string, adminData: Partial<Omit<Admin, 'id'>>): Promise<Admin | null> {
  await db.update(admins).set(adminData).where(eq(admins.id, id));
  const result = await db.select().from(admins).where(eq(admins.id, id));
  const admin = result[0];
  if (!admin) return null;
  const { password, ...rest } = admin;
  return rest as Admin;
}

export async function deleteAdmin(id: string): Promise<boolean> {
  try {
    await db.delete(admins).where(eq(admins.id, id));
    return true;
  } catch (error) {
    return false;
  }
}
