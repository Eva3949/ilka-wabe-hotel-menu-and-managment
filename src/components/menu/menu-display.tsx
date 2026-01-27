"use client";

import { useState, useMemo } from "react";
import type { Category, MenuItem } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuItemCard } from "./menu-item-card";
import { CakeSlice, Coffee, Soup, Utensils, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n/i18n-context";

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
  const { t } = useI18n();
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
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-foreground mt-2">
          {t('menu.title')}
        </h2>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          {t('menu.description')}
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
        <Input
          placeholder={t('menu.search')}
          className="pl-12 h-14 text-lg rounded-full shadow-lg border-primary/10 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all duration-300 bg-background/50 backdrop-blur-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <div className="flex justify-center mb-10">
          <TabsList className="flex flex-wrap h-auto p-4 bg-muted/30 backdrop-blur-md rounded-[2rem] border border-border/40 shadow-sm gap-2 justify-center max-w-4xl mx-auto">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id} 
                className="px-6 py-2.5 rounded-2xl flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-blue-600 data-[state=active]:shadow-md transition-all duration-300 text-muted-foreground font-semibold"
              >
                <span className="text-sm tracking-wide">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <div>
          {categories.map((category) => {
            const itemsInCategory = filteredItems.filter(
              (item) => item.categoryId === category.id
            );
            return (
              <TabsContent key={category.id} value={category.id} className="mt-0 focus-visible:outline-none">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {itemsInCategory.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {itemsInCategory.map((item) => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="bg-muted/30 p-6 rounded-full mb-4">
                        <Search className="h-10 w-10 text-muted-foreground/50" />
                      </div>
                      <p className="text-xl font-medium text-muted-foreground max-w-xs">
                        {searchQuery 
                          ? t('menu.noItems').replace('{query}', searchQuery).replace('{category}', category.name)
                          : t('menu.updating').replace('{category}', category.name)}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}
