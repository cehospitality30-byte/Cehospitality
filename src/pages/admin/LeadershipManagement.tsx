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
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Leader {
  id: string;
  name: string;
  role: string;
  description: string;
  image?: string;
}

const mockLeaders: Leader[] = [
  {
    id: '1',
    name: 'Samuel Charles',
    role: 'Founder & CEO',
    description: 'With over 15 years in luxury hospitality, Samuel leads the group\'s strategic vision...',
  },
  {
    id: '2',
    name: 'Padma Vijaya',
    role: 'Director of Operations',
    description: 'Padma ensures seamless operations across all venues...',
  },
  {
    id: '3',
    name: 'Sidhaartha',
    role: 'Culinary Director',
    description: 'An award-winning chef bringing innovative cuisine...',
  },
  {
    id: '4',
    name: 'Vidya Sagar',
    role: 'Brand Director',
    description: 'Vidya shapes the visual identity and guest experience...',
  },
];

export default function LeadershipManagement() {
  const [leaders, setLeaders] = useState<Leader[]>(mockLeaders);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLeader, setEditingLeader] = useState<Leader | null>(null);
  const [formData, setFormData] = useState<Partial<Leader>>({
    name: '',
    role: '',
    description: '',
  });

  const handleAdd = () => {
    setEditingLeader(null);
    setFormData({
      name: '',
      role: '',
      description: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (leader: Leader) => {
    setEditingLeader(leader);
    setFormData(leader);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setLeaders(leaders.filter((leader) => leader.id !== id));
    toast.success('Leader deleted');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLeader) {
      setLeaders(
        leaders.map((leader) =>
          leader.id === editingLeader.id ? { ...formData, id: editingLeader.id } as Leader : leader
        )
      );
      toast.success('Leader updated');
    } else {
      const newLeader: Leader = {
        ...formData,
        id: Date.now().toString(),
      } as Leader;
      setLeaders([...leaders, newLeader]);
      toast.success('Leader added');
    }
    setIsDialogOpen(false);
  };

  return (
    <AdminLayout title="Leadership Management" description="Manage leadership team members">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">{leaders.length} team members</p>
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
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Leader</Button>
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
              {leaders.map((leader) => (
                <TableRow key={leader.id}>
                  <TableCell className="font-medium">{leader.name}</TableCell>
                  <TableCell>{leader.role}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {leader.description}
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(leader)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(leader.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}

