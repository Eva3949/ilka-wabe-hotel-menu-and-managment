import type { Category, MenuItem } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { ItemActions } from './item-actions';
import Image from 'next/image';

interface MenuItemsTableProps {
  menuItems: MenuItem[];
  categories: Category[];
}

export function MenuItemsTable({ menuItems, categories }: MenuItemsTableProps) {
  const categoryMap = new Map(categories.map(c => [c.id, c.name]));

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                  data-ai-hint={item.imageHint}
                />
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{categoryMap.get(item.categoryId) || 'N/A'}</TableCell>
              <TableCell>{item.itemType}</TableCell>
              <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <ItemActions item={item} categories={categories} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {menuItems.length === 0 && (
         <div className="text-center p-8 text-muted-foreground">
            No menu items found. Add one to get started!
        </div>
      )}
    </Card>
  );
}
