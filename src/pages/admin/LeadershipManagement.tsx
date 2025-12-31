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
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLeaders, useCreateLeader, useUpdateLeader, useDeleteLeader } from '@/hooks/useLeaders';

interface Leader {
  _id?: string;
  id?: string;
  name: string;
  role: string;
  description: string;
  image?: string;
  publicId?: string;
  imageFile?: File;
}

export default function LeadershipManagement() {
  const { data: leaders = [], isLoading, refetch } = useLeaders() as { data: Leader[], isLoading: boolean, refetch: () => void };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLeader, setEditingLeader] = useState<Leader | null>(null);
  const [formData, setFormData] = useState<Partial<Leader>>({
    name: '',
    role: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const createMutation = useCreateLeader();
  const updateMutation = useUpdateLeader();
  const deleteMutation = useDeleteLeader();

  const handleAdd = () => {
    setEditingLeader(null);
    setFormData({
      name: '',
      role: '',
      description: '',
    });
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (leader: Leader) => {
    setEditingLeader(leader);
    setFormData(leader);
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this leader?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
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
      
      if (editingLeader) {
        const id = editingLeader._id || editingLeader.id;
        if (id) {
          await updateMutation.mutateAsync({ id, data: submitData });
        }
      } else {
        await createMutation.mutateAsync(submitData);
      }
      
      setIsDialogOpen(false);
      setFormData({ name: '', role: '', description: '' });
      setImageFile(null);
      
      toast.success(editingLeader ? 'Leader updated successfully' : 'Leader added successfully');
    } catch (error) {
      toast.error('Failed to save leader');
    }
  };

  return (
    <AdminLayout title="Leadership Management" description="Manage leadership team members">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">{leaders.length} team member{leaders.length !== 1 ? 's' : ''}</p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd}>
                <Plus className="w-4 h-4 mr-2" />
                Add Leader
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingLeader ? 'Edit Leader' : 'Add Leader'}</DialogTitle>
                <DialogDescription>
                  {editingLeader ? 'Update leader information' : 'Add a new leadership team member'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {imageFile && (
                    <p className="text-xs text-muted-foreground mt-1">{imageFile.name}</p>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={(editingLeader ? updateMutation.isPending : createMutation.isPending)}
                  >
                    {(editingLeader ? updateMutation.isPending : createMutation.isPending) ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (editingLeader ? 'Update' : 'Create')}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Leaders Table */}
        <div className="border border-border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : leaders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No leaders found
                  </TableCell>
                </TableRow>
              ) : (
                leaders.map((leader) => (
                  <TableRow key={leader._id || leader.id}>
                    <TableCell className="font-medium">{leader.name}</TableCell>
                    <TableCell>{leader.role}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {leader.description}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEdit(leader)}
                          disabled={updateMutation.isPending}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(leader._id || leader.id || '')}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}

