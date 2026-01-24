import { mysqlTable, varchar, text, double, int, datetime, decimal } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const categories = mysqlTable("category", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const menuItems = mysqlTable("menu_item", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: double("price").notNull(),
  itemType: varchar("item_type", { length: 50 }).notNull(),
  imageUrl: varchar("image_url", { length: 512 }).notNull(),
  imageHint: varchar("image_hint", { length: 255 }).notNull(),
  categoryId: varchar("category_id", { length: 36 }).notNull(),
});

export const rooms = mysqlTable("room", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  pricePerNight: double("pricePerNight").notNull(),
  capacity: int("capacity").notNull(),
  bedType: varchar("bedType", { length: 191 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 191 }),
  imageHint: varchar("imageHint", { length: 191 }).notNull(),
});

export const customers = mysqlTable("customer", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
});

export const bookings = mysqlTable("booking", {
  id: varchar("id", { length: 36 }).primaryKey(),
  customerId: varchar("customerId", { length: 191 }).notNull(),
  roomId: varchar("roomId", { length: 191 }).notNull(),
  checkIn: datetime("checkIn", { mode: 'date', fsp: 3 }).notNull(),
  checkOut: datetime("checkOut", { mode: 'date', fsp: 3 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
});

export const admins = mysqlTable("admin", {
  id: varchar("id", { length: 36 }).primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(), // 'owner' or 'receptionist'
});

// Relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  menuItems: many(menuItems),
}));

export const menuItemsRelations = relations(menuItems, ({ one }) => ({
  category: one(categories, {
    fields: [menuItems.categoryId],
    references: [categories.id],
  }),
}));

export const roomsRelations = relations(rooms, ({ many }) => ({
  bookings: many(bookings),
}));

export const customersRelations = relations(customers, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  customer: one(customers, {
    fields: [bookings.customerId],
    references: [customers.id],
  }),
  room: one(rooms, {
    fields: [bookings.roomId],
    references: [rooms.id],
  }),
}));
