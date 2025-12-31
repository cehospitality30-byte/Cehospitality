import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface GalleryImage {
  id: string;
  url: string;
  title?: string;
  category?: string;
  uploadedAt: string;
}

const mockImages: GalleryImage[] = [
  {
    id: '1',
    url: '/src/assets/hero-lounge.jpg',
    title: 'Lounge Interior',
    category: 'Interior',
    uploadedAt: '2024-01-10',
  },
  {
    id: '2',
    url: '/src/assets/signature-coffee.jpg',
    title: 'Signature Coffee',
    category: 'Food & Beverages',
    uploadedAt: '2024-01-11',
  },
  {
    id: '3',
    url: '/src/assets/dessert.jpg',
    title: 'Dessert Collection',
    category: 'Food & Beverages',
    uploadedAt: '2024-01-12',
  },
];

export default function GalleryManagement() {
  const [images, setImages] = useState<GalleryImage[]>(mockImages);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<GalleryImage>>({
    title: '',
    category: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDelete = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
    toast.success('Image deleted');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData({ ...formData, url: event.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile || formData.url) {
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        url: formData.url || URL.createObjectURL(selectedFile!),
        title: formData.title,
        category: formData.category,
        uploadedAt: new Date().toISOString(),
      };
      setImages([...images, newImage]);
      toast.success('Image uploaded');
      setIsDialogOpen(false);
      setFormData({ title: '', category: '' });
      setSelectedFile(null);
    }
  };

  return (
    <AdminLayout title="Gallery Management" description="Manage your cafe gallery images">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            {images.length} image{images.length !== 1 ? 's' : ''} in gallery
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Image</DialogTitle>
                <DialogDescription>Add a new image to the gallery</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="file">Image File *</Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="file" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      {selectedFile && (
                        <p className="text-xs text-muted-foreground mt-2">{selectedFile.name}</p>
                      )}
                    </label>
                  </div>
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Image title"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Interior, Food, Events, etc."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!selectedFile && !formData.url}>
                    Upload
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
            >
              <img
                src={image.url}
                alt={image.title || 'Gallery image'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(image.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {image.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-sm text-white font-medium">{image.title}</p>
                  {image.category && (
                    <p className="text-xs text-white/70">{image.category}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-12 border border-border rounded-lg">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No images in gallery</p>
            <p className="text-sm text-muted-foreground mt-2">
              Upload your first image to get started
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

