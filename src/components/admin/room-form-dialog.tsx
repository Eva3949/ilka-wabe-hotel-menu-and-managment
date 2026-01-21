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
import { useToast } from '@/hooks/use-toast';
import { addRoomAction, updateRoomAction } from '@/app/actions';
import type { Room } from '@/lib/types';

interface RoomFormDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  room?: Room;
}

const formSchema = z.object({
  name: z.string().min(3, 'Room name must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  pricePerNight: z.coerce.number().positive('Price must be a positive number.'),
  capacity: z.coerce.number().int().positive('Capacity must be a positive number.'),
  bedType: z.string().min(3, 'Bed type is required.'),
  imageUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
});

export function RoomFormDialog({
  isOpen,
  setIsOpen,
  room,
}: RoomFormDialogProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      pricePerNight: 0,
      capacity: 1,
      bedType: '',
      imageUrl: '',
    },
  });

  useEffect(() => {
    if (room) {
      form.reset({
        name: room.name,
        description: room.description,
        pricePerNight: room.pricePerNight,
        capacity: room.capacity,
        bedType: room.bedType,
        imageUrl: room.imageUrl || '',
      });
    } else {
      form.reset({
        name: '',
        description: '',
        pricePerNight: 0,
        capacity: 1,
        bedType: '',
        imageUrl: '',
      });
    }
  }, [room, isOpen, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    
    const action = room ? updateRoomAction.bind(null, room.id) : addRoomAction;
    const result = await action(formData);

    if (result?.error) {
        // Handle server-side validation errors if necessary
        // For example: form.setError('name', { message: result.error.name[0] });
    } else {
        toast({
            title: room ? 'Room Updated' : 'Room Added',
            description: `"${values.name}" has been successfully ${room ? 'updated' : 'added'}.`,
        });
        setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{room ? 'Edit Room' : 'Add New Room'}</DialogTitle>
          <DialogDescription>
            {room ? 'Update the details of this room.' : 'Add a new room to your hotel.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Deluxe King Suite" {...field} />
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
                    <Textarea placeholder="A spacious suite with a beautiful view..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pricePerNight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per Night</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="250.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input type="number" step="1" placeholder="2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="bedType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bed Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., King, 2 Queens" {...field} />
                  </FormControl>
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
                    <Input placeholder="https://example.com/image.jpg" {...field} />
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
