import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { galleryApi } from '@/lib/api';
import { toast } from 'sonner';

export function useGalleryImages(category?: string) {
  return useQuery({
    queryKey: ['gallery', category],
    queryFn: () => galleryApi.getAll({ category }),
  });
}

export function useGalleryImage(id: string) {
  return useQuery({
    queryKey: ['galleryImage', id],
    queryFn: () => galleryApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateGalleryImage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => galleryApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast.success('Image uploaded successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to upload image');
    },
  });
}

export function useDeleteGalleryImage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => galleryApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast.success('Image deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete image');
    },
  });
}

