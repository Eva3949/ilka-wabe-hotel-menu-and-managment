import type { Category, MenuItem } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ItemActions } from './item-actions';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface MenuItemsTableProps {
  menuItems: MenuItem[];
  categories: Category[];
}

export function MenuItemsTable({ menuItems, categories }: MenuItemsTableProps) {
  const categoryMap = new Map(categories.map(c => [c.id, c.name]));

  if (menuItems.length === 0) {
    return (
       <div className="text-center p-8 text-muted-foreground">
          No menu items found. Add one to get started!
      </div>
    );
  }

  return (
    <>
      {/* Desktop View */}
      <Card className="hidden md:block">
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
                <TableCell className="text-right">{item.price.toFixed(2)} Birr</TableCell>
                <TableCell className="text-right">
                  <ItemActions item={item} categories={categories} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      {/* Mobile View */}
      <div className="md:hidden grid gap-4">
        {menuItems.map((item) => (
           <Card key={item.id}>
             <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <ItemActions item={item} categories={categories} />
                </div>
                <p className="text-sm text-muted-foreground">{categoryMap.get(item.categoryId) || 'N/A'}</p>
             </CardHeader>
             <CardContent className="flex justify-between items-center">
                <Badge variant="secondary">{item.itemType}</Badge>
                <div className="font-bold text-primary">{item.price.toFixed(2)} Birr</div>
             </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
