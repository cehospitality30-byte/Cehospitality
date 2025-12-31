import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { menuApi } from '@/lib/api';
import { toast } from 'sonner';

export function useMenuItems(params?: { category?: string; search?: string }) {
  return useQuery({
    queryKey: ['menuItems', params],
    queryFn: () => menuApi.getAll(params),
  });
}

export function useMenuItem(id: string) {
  return useQuery({
    queryKey: ['menuItem', id],
    queryFn: () => menuApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateMenuItem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => menuApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('Menu item created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create menu item');
    },
  });
}

export function useUpdateMenuItem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => menuApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      queryClient.invalidateQueries({ queryKey: ['menuItem', variables.id] });
      toast.success('Menu item updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update menu item');
    },
  });
}

export function useDeleteMenuItem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => menuApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('Menu item deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete menu item');
    },
  });
}

