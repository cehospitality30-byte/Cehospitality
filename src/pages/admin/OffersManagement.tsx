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
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useOffers } from '@/hooks/useOffers';
import { offerApi } from '@/lib/api';

interface Offer {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  discount?: string;
  code?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export default function OffersManagement() {
  const { data: offers = [], isLoading, refetch } = useOffers() as { data: Offer[]; isLoading: boolean; refetch: () => void; };
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [formData, setFormData] = useState<Partial<Offer>>({
    title: '',
    description: '',
    discount: '',
    code: '',
    startDate: '',
    endDate: '',
    isActive: true,
  });

  const filteredOffers = offers.filter((offer) =>
    offer.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingOffer(null);
    setFormData({
      title: '',
      description: '',
      discount: '',
      code: '',
      startDate: '',
      endDate: '',
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData(offer);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await offerApi.delete(id);
      toast.success('Offer deleted');
      refetch();
    } catch (error) {
      console.error('Error deleting offer:', error);
      toast.error('Failed to delete offer');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingOffer) {
        await offerApi.update(editingOffer._id || editingOffer.id || '', formData as Offer);
        toast.success('Offer updated');
      } else {
        await offerApi.create(formData);
        toast.success('Offer created');
      }
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      console.error('Error saving offer:', error);
      toast.error('Failed to save offer');
    }
  };

  return (
    <AdminLayout title="Offers Management" description="Manage special offers and promotions">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search offers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd}>
                <Plus className="w-4 h-4 mr-2" />
                Create Offer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingOffer ? 'Edit Offer' : 'Create Offer'}</DialogTitle>
                <DialogDescription>
                  {editingOffer ? 'Update offer details' : 'Create a new promotional offer'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Offer Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discount">Discount</Label>
                    <Input
                      id="discount"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                      placeholder="20%"
                    />
                  </div>
                  <div>
                    <Label htmlFor="code">Promo Code</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="WEEKEND20"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded border-border"
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    Active Offer
                  </Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Offer</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Offers Table */}
        <div className="border border-border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Validity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOffers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No offers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOffers.map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell className="font-medium">{offer.title}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {offer.description}
                      </p>
                    </TableCell>
                    <TableCell>{offer.discount || 'N/A'}</TableCell>
                    <TableCell>
                      {offer.code ? (
                        <Badge variant="outline">{offer.code}</Badge>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(offer.startDate).toLocaleDateString()} -{' '}
                      {new Date(offer.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {offer.isActive ? (
                        <Badge className="bg-green-500/20 text-green-500">Active</Badge>
                      ) : (
                        <Badge variant="outline">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(offer)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(offer.id)}>
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

