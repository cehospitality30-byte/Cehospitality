import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, CheckCircle, XCircle, Calendar, Clock, Users, Mail, Phone, Loader2 } from 'lucide-react';
import { useBookings, useUpdateBooking } from '@/hooks/useBookings';

interface Booking {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string | Date;
  time: string;
  guests: number;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string | Date;
}

export default function BookingsInbox() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: bookings = [], isLoading } = useBookings() as { data: Booking[]; isLoading: boolean; };
  const updateMutation = useUpdateBooking();

  const filteredBookings = bookings.filter(
    (booking: Booking) =>
      !searchQuery ||
      booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.phone.includes(searchQuery)
  );

  const handleView = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  const handleStatusChange = async (id: string, status: Booking['status']) => {
    await updateMutation.mutateAsync({ id, data: { status } });
  };

  const getStatusBadge = (status: Booking['status']) => {
    const variants = {
      pending: 'bg-amber-500/20 text-amber-500',
      confirmed: 'bg-green-500/20 text-green-500',
      cancelled: 'bg-red-500/20 text-red-500',
    };
    return (
      <Badge className={variants[status]}>{status.toUpperCase()}</Badge>
    );
  };

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  return (
    <AdminLayout
      title="Bookings Inbox"
      description={`Manage table reservations${!isLoading ? ` (${pendingCount} pending)` : ''}`}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              Export
            </Button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="border border-border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking: Booking) => {
                  const bookingId = booking._id || booking.id || '';
                  return (
                    <TableRow key={bookingId}>
                      <TableCell className="font-medium">{booking.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div>{new Date(booking.date).toLocaleDateString()}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {booking.time}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          {booking.guests}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="w-3 h-3" />
                            {booking.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            {booking.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleView(booking)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {booking.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleStatusChange(bookingId, 'confirmed')}
                                className="text-green-500"
                                disabled={updateMutation.isPending}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleStatusChange(bookingId, 'cancelled')}
                                className="text-red-500"
                                disabled={updateMutation.isPending}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Booking Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>View and manage booking information</DialogDescription>
            </DialogHeader>
            {selectedBooking && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="font-medium">{selectedBooking.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p>{selectedBooking.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p>{selectedBooking.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Date</label>
                    <p>{new Date(selectedBooking.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Time</label>
                    <p>{selectedBooking.time}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Guests</label>
                    <p>{selectedBooking.guests}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Created</label>
                    <p>{new Date(selectedBooking.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                {selectedBooking.message && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Special Requests</label>
                    <p className="mt-1 p-3 bg-muted rounded-lg">{selectedBooking.message}</p>
                  </div>
                )}
                <div className="flex gap-2 pt-4">
                  {selectedBooking.status === 'pending' && (
                    <>
                      <Button
                        onClick={async () => {
                          const id = selectedBooking._id || selectedBooking.id || '';
                          await handleStatusChange(id, 'confirmed');
                          setIsDialogOpen(false);
                        }}
                        className="flex-1"
                        disabled={updateMutation.isPending}
                      >
                        Confirm Booking
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={async () => {
                          const id = selectedBooking._id || selectedBooking.id || '';
                          await handleStatusChange(id, 'cancelled');
                          setIsDialogOpen(false);
                        }}
                        className="flex-1"
                        disabled={updateMutation.isPending}
                      >
                        Cancel Booking
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

