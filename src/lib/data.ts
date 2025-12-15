import type { MenuItem, Category } from './types';
import { placeholderImages } from './placeholder-images.json';

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


// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Category Functions ---

export async function getCategories(): Promise<Category[]> {
  await delay(100);
  return [...categories];
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
    await delay(100);
    return categories.find(c => c.id === id);
}

export async function addCategory(categoryData: Omit<Category, 'id'>): Promise<Category> {
  await delay(200);
  const newCategory: Category = {
    id: (categories.length + 1).toString(),
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
  await delay(100);
  return [...menuItems];
}

export async function getMenuItemById(id: string): Promise<MenuItem | undefined> {
    await delay(100);
    return menuItems.find(item => item.id === id);
}


export async function addMenuItem(itemData: Omit<MenuItem, 'id' | 'imageUrl' | 'imageHint'>): Promise<MenuItem> {
  await delay(200);
  const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
  const newItem: MenuItem = {
    id: (menuItems.length + 1 + Math.random()).toString(),
    ...itemData,
    imageUrl: randomImage.imageUrl,
    imageHint: randomImage.imageHint,
  };
  menuItems.push(newItem);
  return newItem;
}

export async function updateMenuItem(id: string, itemData: Partial<Omit<MenuItem, 'id' | 'imageUrl' | 'imageHint'>>): Promise<MenuItem | null> {
  await delay(200);
  const index = menuItems.findIndex(item => item.id === id);
  if (index === -1) return null;
  menuItems[index] = { ...menuItems[index], ...itemData };
  return menuItems[index];
}

export async function deleteMenuItem(id: string): Promise<boolean> {
  await delay(200);
  const initialLength = menuItems.length;
  menuItems = menuItems.filter(item => item.id !== id);
  return menuItems.length < initialLength;
}
