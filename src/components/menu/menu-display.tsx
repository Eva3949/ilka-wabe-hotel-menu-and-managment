"use client";

import { useState, useMemo } from "react";
import type { Category, MenuItem } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuItemCard } from "./menu-item-card";
import { CakeSlice, Coffee, Soup, Utensils, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MenuDisplayProps {
  categories: Category[];
  items: MenuItem[];
}

const getCategoryIcon = (categoryName: string) => {
  const lowerCaseName = categoryName.toLowerCase();
  if (lowerCaseName.includes("drink")) return <Coffee className="mr-2 h-5 w-5" />;
  if (lowerCaseName.includes("dessert")) return <CakeSlice className="mr-2 h-5 w-5" />;
  if (lowerCaseName.includes("appetizer")) return <Soup className="mr-2 h-5 w-5" />;
  return <Utensils className="mr-2 h-5 w-5" />;
};

export function MenuDisplay({ categories, items }: MenuDisplayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const defaultTab = categories.length > 0 ? categories[0].id : "";

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  return (
    <div className="space-y-8">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search our delicious menu..."
          className="pl-10 h-12 text-lg rounded-full shadow-sm focus:ring-primary/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto bg-secondary/80">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="py-3 flex items-center justify-center data-[state=active]:bg-background data-[state=active]:shadow-md">
              {getCategoryIcon(category.name)}
              <span className="font-semibold">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => {
          const itemsInCategory = filteredItems.filter(
            (item) => item.categoryId === category.id
          );
          return (
            <TabsContent key={category.id} value={category.id} className="data-[state=active]:animate-slide-up">
              {itemsInCategory.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                  {itemsInCategory.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  <p>
                    {searchQuery 
                      ? "No items match your search in this category." 
                      : "No items in this category yet. Please check back later!"}
                  </p>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
