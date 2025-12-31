import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leaderApi } from '@/lib/api';
import { toast } from 'sonner';

export function useLeaders() {
  return useQuery({
    queryKey: ['leaders'],
    queryFn: () => leaderApi.getAll(),
  });
}

export function useLeader(id: string) {
  return useQuery({
    queryKey: ['leader', id],
    queryFn: () => leaderApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateLeader() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => leaderApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaders'] });
      toast.success('Leader added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add leader');
    },
  });
}

export function useUpdateLeader() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => leaderApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['leaders'] });
      queryClient.invalidateQueries({ queryKey: ['leader', variables.id] });
      toast.success('Leader updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update leader');
    },
  });
}

export function useDeleteLeader() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => leaderApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaders'] });
      toast.success('Leader deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete leader');
    },
  });
}

