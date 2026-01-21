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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { addMenuItemAction, updateMenuItemAction } from '@/app/actions';
import type { Category, MenuItem } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface ItemFormDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  categories: Category[];
  menuItem?: MenuItem;
}

const formSchema = z.object({
  name: z.string().min(2, 'Item name must be at least 2 characters.'),
  description: z.string().min(5, 'Description must be at least 5 characters.'),
  price: z.coerce.number().positive('Price must be a positive number.'),
  itemType: z.string().min(2, 'Item type is required.'),
  categoryId: z.string({ required_error: 'Please select a category.' }),
  imageUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
});

export function ItemFormDialog({
  isOpen,
  setIsOpen,
  categories,
  menuItem,
}: ItemFormDialogProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      itemType: '',
      categoryId: '',
      imageUrl: '',
    },
  });

  useEffect(() => {
    if (menuItem) {
      form.reset({
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price,
        itemType: menuItem.itemType,
        categoryId: menuItem.categoryId,
        imageUrl: menuItem.imageUrl,
      });
    } else {
      form.reset({
        name: '',
        description: '',
        price: 0,
        itemType: '',
        categoryId: '',
        imageUrl: '',
      });
    }
  }, [menuItem, isOpen, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    
    const action = menuItem ? updateMenuItemAction.bind(null, menuItem.id) : addMenuItemAction;
    const result = await action(formData);

    if (result?.error) {
        // Handle validation errors from server
    } else {
        toast({
            title: menuItem ? 'Item Updated' : 'Item Added',
            description: `"${values.name}" has been successfully ${menuItem ? 'updated' : 'added'}.`,
        });
        setIsOpen(false);
        router.refresh();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{menuItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
          <DialogDescription>
            {menuItem ? 'Update the details of your menu item.' : 'Add a new item to your menu.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Spaghetti Carbonara" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A classic Italian pasta dish..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="15.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="itemType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Veg, Non-Veg, Gluten-Free" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://example.com/image.jpg" {...field} />
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
