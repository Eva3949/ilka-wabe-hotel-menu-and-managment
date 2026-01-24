'use client';

import { useState, useMemo } from 'react';
import type { Category, MenuItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { MenuItemsTable } from './menu-items-table';
import { ItemFormDialog } from './item-form-dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MenuItemsTabProps {
  menuItems: MenuItem[];
  categories: Category[];
}

export function MenuItemsTab({ menuItems, categories }: MenuItemsTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [menuItems, searchQuery, selectedCategory]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto flex-1">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="whitespace-nowrap">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
        </Button>
      </div>
      <ItemFormDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        categories={categories}
      />
      <MenuItemsTable menuItems={filteredItems} categories={categories} />
    </div>
  );
}
