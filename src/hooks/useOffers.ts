import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { offerApi } from '@/lib/api';
import { toast } from 'sonner';

export function useOffers(active?: boolean) {
  return useQuery({
    queryKey: ['offers', active],
    queryFn: () => offerApi.getAll({ active }),
  });
}

export function useOffer(id: string) {
  return useQuery({
    queryKey: ['offer', id],
    queryFn: () => offerApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateOffer() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => offerApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      toast.success('Offer created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create offer');
    },
  });
}

export function useUpdateOffer() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => offerApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      queryClient.invalidateQueries({ queryKey: ['offer', variables.id] });
      toast.success('Offer updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update offer');
    },
  });
}

export function useDeleteOffer() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => offerApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      toast.success('Offer deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete offer');
    },
  });
}

