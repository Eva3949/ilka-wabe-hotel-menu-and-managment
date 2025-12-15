'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { addCategoryAction, updateCategoryAction } from '@/app/actions';
import type { Category } from '@/lib/types';

interface CategoryFormDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  category?: Category;
}

const formSchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters.'),
});

export function CategoryFormDialog({
  isOpen,
  setIsOpen,
  category,
}: CategoryFormDialogProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({ name: category?.name || '' });
    }
  }, [category, isOpen, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('name', values.name);

    const action = category ? updateCategoryAction.bind(null, category.id) : addCategoryAction;
    const result = await action(formData);

    if (result?.error) {
      // Handle validation errors from server
    } else {
        toast({
            title: category ? 'Category Updated' : 'Category Added',
            description: `"${values.name}" has been successfully ${category ? 'updated' : 'added'}.`,
        });
        setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          <DialogDescription>
            {category ? 'Update the name of your menu category.' : 'Add a new category to organize your menu items.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Appetizers" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
