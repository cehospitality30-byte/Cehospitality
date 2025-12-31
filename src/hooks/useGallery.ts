import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { galleryApi, uploadImageToCloudinary } from '@/lib/api';
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
    mutationFn: async (data: any) => {
      // If there's a file to upload, upload it to Cloudinary first
      if (data.imageFile) {
        const uploadResult = await uploadImageToCloudinary(data.imageFile, 'gallery');
        data.url = uploadResult.url;
        data.publicId = uploadResult.publicId;
        delete data.imageFile; // Remove the file object as it's not needed in the API call
      }
      return galleryApi.create(data);
    },
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

