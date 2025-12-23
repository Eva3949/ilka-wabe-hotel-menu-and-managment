"use server";

import { revalidatePath } from "next/cache";
import {
  addCategory,
  updateCategory,
  deleteCategory,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItems,
  getCategories,
} from "@/lib/data";
import { addRoom, updateRoom, deleteRoom } from "@/lib/rooms-data";
import type { Category, MenuItem, Room } from "@/lib/types";
import { suggestMenuItem, SuggestMenuItemInput } from "@/ai/flows/suggest-menu-item";
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
});

const roomSchema = z.object({
  name: z.string().min(3, "Room name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  pricePerNight: z.coerce.number().positive("Price must be a positive number."),
  capacity: z.coerce.number().int().positive("Capacity must be a positive number."),
  bedType: z.string().min(3, "Bed type is required."),
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

export async function suggestMenuItemAction(input: SuggestMenuItemInput) {
  try {
    const result = await suggestMenuItem(input);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to get AI suggestion." };
  }
}

export async function getFullMenuAsString() {
  const items = await getMenuItems();
  const categories = await getCategories();
  const categoryMap = new Map(categories.map(c => [c.id, c.name]));

  return items.map(item => `${item.name} (${categoryMap.get(item.categoryId) || 'Uncategorized'}): ${item.description}`).join('\n');
}

export async function addRoomAction(formData: FormData) {
  const validatedFields = roomSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    pricePerNight: formData.get("pricePerNight"),
    capacity: formData.get("capacity"),
    bedType: formData.get("bedType"),
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
