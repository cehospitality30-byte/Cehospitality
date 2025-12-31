import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingApi } from '@/lib/api';
import { toast } from 'sonner';

export function useBookings(params?: { status?: string; date?: string }) {
  return useQuery({
    queryKey: ['bookings', params],
    queryFn: () => bookingApi.getAll(params),
  });
}

export function useBooking(id: string) {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => bookingApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => bookingApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking request submitted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to submit booking');
    },
  });
}

export function useUpdateBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => bookingApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking', variables.id] });
      toast.success('Booking updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update booking');
    },
  });
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => bookingApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete booking');
    },
  });
}

