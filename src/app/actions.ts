"use server";

import { revalidatePath } from "next/cache";
import {
  addCategory,
  updateCategory,
  deleteCategory,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  addBooking,
  updateBooking,
  deleteBooking,
} from "@/lib/data";
import { addRoom, updateRoom, deleteRoom } from "@/lib/rooms-data";
import type { Category, MenuItem, Room, Customer, Booking } from "@/lib/types";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters."),
});

const itemSchema = z.object({
  name: z.string().min(2, "Item name must be at least 2 characters."),
  description: z.string().min(5, "Description must be at least 5 characters."),
  price: z.coerce.number().positive("Price must be a positive number."),
  itemType: z.string().min(2, "Item type is required."),
  categoryId: z.string().min(1, "Category is required."),
  imageUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
});

const roomSchema = z.object({
  name: z.string().min(3, "Room name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  pricePerNight: z.coerce.number().positive("Price must be a positive number."),
  capacity: z.coerce.number().int().positive("Capacity must be a positive number."),
  bedType: z.string().min(3, "Bed type is required."),
  imageUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
});

const customerSchema = z.object({
  name: z.string().min(2, "Customer name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
});

const bookingSchema = z.object({
  customerId: z.string().min(1, "Customer is required."),
  roomId: z.string().min(1, "Room is required."),
  checkIn: z.string().min(1, "Check-in date is required."),
  checkOut: z.string().min(1, "Check-out date is required."),
  status: z.enum(['Confirmed', 'Checked-In', 'Checked-Out', 'Cancelled']),
});


export async function addCategoryAction(formData: FormData) {
  const validatedFields = categorySchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  await addCategory(validatedFields.data);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateCategoryAction(id: string, formData: FormData) {
  const validatedFields = categorySchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  await updateCategory(id, validatedFields.data);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteCategoryAction(id: string) {
  await deleteCategory(id);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function addMenuItemAction(formData: FormData) {
  const validatedFields = itemSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    itemType: formData.get("itemType"),
    categoryId: formData.get("categoryId"),
    imageUrl: formData.get("imageUrl"),
  });
  
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  await addMenuItem(validatedFields.data);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateMenuItemAction(id: string, formData: FormData) {
    const validatedFields = itemSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    itemType: formData.get("itemType"),
    categoryId: formData.get("categoryId"),
    imageUrl: formData.get("imageUrl"),
  });
  
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  await updateMenuItem(id, validatedFields.data);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteMenuItemAction(id: string) {
  await deleteMenuItem(id);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function addRoomAction(formData: FormData) {
  const validatedFields = roomSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    pricePerNight: formData.get("pricePerNight"),
    capacity: formData.get("capacity"),
    bedType: formData.get("bedType"),
    imageUrl: formData.get("imageUrl"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  await addRoom(validatedFields.data);
  revalidatePath("/rooms");
  revalidatePath("/admin");
}

export async function updateRoomAction(id: string, formData: FormData) {
  const validatedFields = roomSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    pricePerNight: formData.get("pricePerNight"),
    capacity: formData.get("capacity"),
    bedType: formData.get("bedType"),
    imageUrl: formData.get("imageUrl"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  await updateRoom(id, validatedFields.data);
  revalidatePath("/rooms");
  revalidatePath("/admin");
}

export async function deleteRoomAction(id: string) {
  await deleteRoom(id);
  revalidatePath("/rooms");
  revalidatePath("/admin");
}

// Customer Actions
export async function addCustomerAction(formData: FormData) {
  const validatedFields = customerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }
  await addCustomer(validatedFields.data);
  revalidatePath("/admin");
}

export async function updateCustomerAction(id: string, formData: FormData) {
  const validatedFields = customerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }
  await updateCustomer(id, validatedFields.data);
  revalidatePath("/admin");
}

export async function deleteCustomerAction(id: string) {
  await deleteCustomer(id);
  revalidatePath("/admin");
}

// Booking Actions
export async function addBookingAction(formData: FormData) {
  const rawData = {
    customerId: formData.get("customerId"),
    roomId: formData.get("roomId"),
    checkIn: formData.get("checkIn"),
    checkOut: formData.get("checkOut"),
    status: formData.get("status"),
  };

  const validatedFields = bookingSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }
  await addBooking(validatedFields.data);
  revalidatePath("/admin");
}

export async function updateBookingAction(id: string, formData: FormData) {
    const rawData = {
        customerId: formData.get("customerId"),
        roomId: formData.get("roomId"),
        checkIn: formData.get("checkIn"),
        checkOut: formData.get("checkOut"),
        status: formData.get("status"),
    };
    
  const validatedFields = bookingSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }
  await updateBooking(id, validatedFields.data);
  revalidatePath("/admin");
}

export async function deleteBookingAction(id: string) {
  await deleteBooking(id);
  revalidatePath("/admin");
}
