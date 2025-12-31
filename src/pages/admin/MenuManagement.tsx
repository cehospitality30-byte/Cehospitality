import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Search, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useMenuItems, useCreateMenuItem, useUpdateMenuItem, useDeleteMenuItem } from '@/hooks/useMenu';

interface MenuItem {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  subcategory?: string;
  price?: string;
  description?: string;
  isSignature: boolean;
  type: 'beverage' | 'veg' | 'nonveg' | 'mixed';
  imageFile?: File;
}

export default function MenuManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    description: '',
    isSignature: false,
    type: 'beverage',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: items = [], isLoading } = useMenuItems({ search: searchQuery || undefined }) as { data: MenuItem[], isLoading: boolean };
  const createMutation = useCreateMenuItem();
  const updateMutation = useUpdateMenuItem();
  const deleteMutation = useDeleteMenuItem();

  const filteredItems = items.filter((item: MenuItem) =>
    !searchQuery || 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: '',
      subcategory: '',
      price: '',
      description: '',
      isSignature: false,
      type: 'beverage',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Prepare form data
      const submitData = { ...formData };
      
      // Add image file to the data if it exists
      if (imageFile) {
        submitData.imageFile = imageFile;
      }
      
      if (editingItem) {
        const id = editingItem._id || editingItem.id;
        if (id) {
          await updateMutation.mutateAsync({ id, data: submitData });
        }
      } else {
        await createMutation.mutateAsync(submitData);
      }
      setIsDialogOpen(false);
      setFormData({
        name: '',
        category: '',
        subcategory: '',
        price: '',
        description: '',
        isSignature: false,
        type: 'beverage',
      });
      setImageFile(null); // Reset image file
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <AdminLayout title="Menu Management" description="Manage your cafe menu items">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd}>
                <Plus className="w-4 h-4 mr-2" />
                Add Menu Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
                <DialogDescription>
                  {editingItem ? 'Update menu item details' : 'Create a new menu item'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Item Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beverages">Beverages</SelectItem>
                        <SelectItem value="Starters">Starters</SelectItem>
                        <SelectItem value="Main Course">Main Course</SelectItem>
                        <SelectItem value="Desserts">Desserts</SelectItem>
                        <SelectItem value="Chef Specials">Chef Specials</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Input
                      id="subcategory"
                      value={formData.subcategory}
                      onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="₹250"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="type">Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beverage">Beverage</SelectItem>
                      <SelectItem value="veg">Vegetarian</SelectItem>
                      <SelectItem value="nonveg">Non-Vegetarian</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isSignature"
                    checked={formData.isSignature}
                    onChange={(e) => setFormData({ ...formData, isSignature: e.target.checked })}
                    className="w-4 h-4 rounded border-border"
                  />
                  <Label htmlFor="isSignature" className="cursor-pointer">
                    Mark as Signature Item
                  </Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {(createMutation.isPending || updateMutation.isPending) ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Item'
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Menu Items Table */}
        <div className="border border-border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
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
              ) : filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No menu items found
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item: MenuItem) => {
                  const itemId = item._id || item.id || '';
                  return (
                    <TableRow key={itemId}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <div>
                          <div>{item.category}</div>
                          {item.subcategory && (
                            <div className="text-xs text-muted-foreground">{item.subcategory}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.type}</Badge>
                      </TableCell>
                      <TableCell>{item.price || 'N/A'}</TableCell>
                      <TableCell>
                        {item.isSignature && (
                          <Badge className="bg-primary/20 text-primary">Signature</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(itemId)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}

