'use client';

import { useState } from 'react';
import type { Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { CategoriesTable } from './categories-table';
import { CategoryFormDialog } from './category-form-dialog';

interface CategoriesTabProps {
  categories: Category[];
}

export function CategoriesTab({ categories }: CategoriesTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Category
        </Button>
      </div>
      <CategoryFormDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <CategoriesTable categories={categories} />
    </div>
  );
}
