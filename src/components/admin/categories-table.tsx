import type { Category } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { CategoryActions } from './category-actions';

interface CategoriesTableProps {
  categories: Category[];
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  return (
    <Card>
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
      {categories.length === 0 && (
         <div className="text-center p-8 text-muted-foreground">
            No categories found. Add one to get started!
        </div>
      )}
    </Card>
  );
}
