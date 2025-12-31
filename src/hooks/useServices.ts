import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceApi } from '@/lib/api';
import { toast } from 'sonner';

export function useServices(active?: boolean) {
  return useQuery({
    queryKey: ['services', active],
    queryFn: () => serviceApi.getAll({ active }),
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: ['service', id],
    queryFn: () => serviceApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => serviceApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create service');
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => serviceApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['service', variables.id] });
      toast.success('Service updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update service');
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => serviceApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete service');
    },
  });
}

