import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contentApi } from '@/lib/api';
import { toast } from 'sonner';

export function useContent(section?: string) {
  return useQuery({
    queryKey: ['content', section],
    queryFn: () => section ? contentApi.getBySection(section) : contentApi.getAll({ section }),
  });
}

export function useUpdateContent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { section: string; key: string; value: string }) => contentApi.update(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['content', variables.section] });
      toast.success('Content updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update content');
    },
  });
}

export function useBulkUpdateContent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ section, data }: { section: string; data: Record<string, string> }) => 
      contentApi.bulkUpdate(section, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['content', variables.section] });
      toast.success('Content saved successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to save content');
    },
  });
}

