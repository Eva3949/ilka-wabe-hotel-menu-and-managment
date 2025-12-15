'use client';

import { useState } from 'react';
import type { Category, MenuItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { MenuItemsTable } from './menu-items-table';
import { ItemFormDialog } from './item-form-dialog';

interface MenuItemsTabProps {
  menuItems: MenuItem[];
  categories: Category[];
}

export function MenuItemsTab({ menuItems, categories }: MenuItemsTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
        </Button>
      </div>
      <ItemFormDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        categories={categories}
      />
      <MenuItemsTable menuItems={menuItems} categories={categories} />
    </div>
  );
}
