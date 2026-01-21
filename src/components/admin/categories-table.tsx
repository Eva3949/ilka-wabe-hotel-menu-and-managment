import type { Category } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryActions } from './category-actions';

interface CategoriesTableProps {
  categories: Category[];
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  if (categories.length === 0) {
    return (
       <div className="text-center p-8 text-muted-foreground">
          No categories found. Add one to get started!
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
              <TableHead>Category Name</TableHead>
              <TableHead className="text-right w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-right">
                  <CategoryActions category={category} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Mobile View */}
      <div className="md:hidden grid gap-4">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <p className="font-medium">{category.name}</p>
              <CategoryActions category={category} />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
