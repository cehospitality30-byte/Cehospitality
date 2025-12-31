import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';
import { adminApi } from '@/lib/api';

interface Admin {
  _id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export default function SuperAdmin() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    name: '',
    password: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchAdmins = async () => {
    try {
      const response = await adminApi.getAll();
      // Type assertion to handle the response
      const data = response as { admins: Admin[] };
      setAdmins(data.admins);
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast.error('Failed to load admins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await adminApi.create(newAdmin);
      toast.success('Admin created successfully');
      setNewAdmin({ email: '', name: '', password: '' });
      setIsDialogOpen(false);
      fetchAdmins(); // Refresh the list
    } catch (error) {
      console.error('Error creating admin:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create admin');
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) {
      return;
    }

    try {
      await adminApi.delete(id);
      toast.success('Admin deleted successfully');
      fetchAdmins(); // Refresh the list
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete admin');
    }
  };

  return (
    <AdminLayout title="Super Admin Dashboard" description="Manage admin users">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Management</h1>
            <p className="text-muted-foreground">Create and manage admin accounts</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Admin</DialogTitle>
                <DialogDescription>
                  Add a new admin account to manage the system
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateAdmin} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create Admin
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Admin Users</CardTitle>
            <CardDescription>Manage system administrators</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading admins...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map((admin) => (
                    <TableRow key={admin._id}>
                      <TableCell className="font-medium">{admin.name}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          admin.role === 'superadmin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {admin.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(admin.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {admin.role !== 'superadmin' && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteAdmin(admin._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}