import type { Booking, Room, Customer } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingActions } from './booking-actions';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Calendar, User, BedDouble } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';

interface BookingsTableProps {
  bookings: Booking[];
  rooms: Room[];
  customers: Customer[];
}

export function BookingsTable({ bookings, rooms, customers }: BookingsTableProps) {
  const { t } = useI18n();
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
  
  if (bookings.length === 0) {
    return (
        <div className="text-center p-8 text-muted-foreground">
            {t('bookings.noBookings')}
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
              <TableHead>{t('bookings.customer')}</TableHead>
              <TableHead>{t('bookings.room')}</TableHead>
              <TableHead>{t('bookings.checkIn')}</TableHead>
              <TableHead>{t('bookings.checkOut')}</TableHead>
              <TableHead>{t('bookings.status')}</TableHead>
              <TableHead className="text-right w-[100px]">{t('bookings.actions')}</TableHead>
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
      </Card>

      {/* Mobile View */}
      <div className="md:hidden grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{customerMap.get(booking.customerId) || 'N/A'}</CardTitle>
                <BookingActions booking={booking} rooms={rooms} customers={customers} />
              </div>
              <Badge variant={getStatusVariant(booking.status)} className="w-fit">{booking.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
               <div className="flex items-center gap-2 text-muted-foreground">
                <BedDouble className="h-4 w-4" />
                <span>{roomMap.get(booking.roomId) || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(booking.checkIn), 'MMM d, yyyy')} - {format(new Date(booking.checkOut), 'MMM d, yyyy')}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
