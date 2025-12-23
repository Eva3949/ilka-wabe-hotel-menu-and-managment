import type { Booking, Room, Customer } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { BookingActions } from './booking-actions';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface BookingsTableProps {
  bookings: Booking[];
  rooms: Room[];
  customers: Customer[];
}

export function BookingsTable({ bookings, rooms, customers }: BookingsTableProps) {
  const roomMap = new Map(rooms.map(r => [r.id, r.name]));
  const customerMap = new Map(customers.map(c => [c.id, c.name]));

  const getStatusVariant = (status: Booking['status']) => {
    switch (status) {
      case 'Confirmed': return 'default';
      case 'Checked-In': return 'secondary';
      case 'Checked-Out': return 'outline';
      case 'Cancelled': return 'destructive';
      default: return 'default';
    }
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Check-In</TableHead>
            <TableHead>Check-Out</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{customerMap.get(booking.customerId) || 'N/A'}</TableCell>
              <TableCell>{roomMap.get(booking.roomId) || 'N/A'}</TableCell>
              <TableCell>{format(new Date(booking.checkIn), 'PPP')}</TableCell>
              <TableCell>{format(new Date(booking.checkOut), 'PPP')}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(booking.status)}>{booking.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <BookingActions booking={booking} rooms={rooms} customers={customers} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {bookings.length === 0 && (
         <div className="text-center p-8 text-muted-foreground">
            No bookings found. Add one to get started!
        </div>
      )}
    </Card>
  );
}
