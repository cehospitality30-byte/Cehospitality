import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Mail, Phone, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import { useContacts, useUpdateContact } from '@/hooks/useContacts';

interface Contact {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string | Date;
}

export default function ContactInbox() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: contacts = [], isLoading } = useContacts();
  const updateMutation = useUpdateContact();

  const filteredContacts = contacts.filter(
    (contact: Contact) =>
      !searchQuery ||
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = async (contact: Contact) => {
    setSelectedContact(contact);
    setIsDialogOpen(true);
    if (contact.status === 'unread') {
      const id = contact._id || contact.id || '';
      if (id) {
        await updateMutation.mutateAsync({ id, data: { status: 'read' } });
      }
    }
  };

  const handleMarkReplied = async (id: string) => {
    await updateMutation.mutateAsync({ id, data: { status: 'replied' } });
  };

  const getStatusBadge = (status: Contact['status']) => {
    const variants = {
      unread: 'bg-blue-500/20 text-blue-500',
      read: 'bg-muted text-muted-foreground',
      replied: 'bg-green-500/20 text-green-500',
    };
    return <Badge className={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  const unreadCount = contacts.filter((c: Contact) => c.status === 'unread').length;

  return (
    <AdminLayout
      title="Contact Inbox"
      description={`Manage customer inquiries (${unreadCount} unread)`}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Contacts Table */}
        <div className="border border-border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Date</TableHead>
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
              ) : filteredContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No contacts found
                  </TableCell>
                </TableRow>
              ) : (
                filteredContacts.map((contact: Contact) => {
                  const contactId = contact._id || contact.id || '';
                  return (
                    <TableRow
                      key={contactId}
                      className={contact.status === 'unread' ? 'bg-primary/5' : ''}
                    >
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.subject}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="w-3 h-3" />
                            {contact.email}
                          </div>
                          {contact.phone && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              {contact.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(contact.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleView(contact)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {contact.status !== 'replied' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleMarkReplied(contactId)}
                              className="text-green-500"
                              disabled={updateMutation.isPending}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Contact Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Contact Details</DialogTitle>
              <DialogDescription>View and manage customer inquiry</DialogDescription>
            </DialogHeader>
            {selectedContact && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="font-medium">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="mt-1">{getStatusBadge(selectedContact.status)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p>{selectedContact.email}</p>
                  </div>
                  {selectedContact.phone && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p>{selectedContact.phone}</p>
                    </div>
                  )}
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Subject</label>
                    <p className="font-medium">{selectedContact.subject}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Date</label>
                    <p>{new Date(selectedContact.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Message</label>
                  <div className="mt-1 p-4 bg-muted rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      window.location.href = `mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`;
                    }}
                    className="flex-1"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Reply via Email
                  </Button>
                  {selectedContact.status !== 'replied' && (
                    <Button
                      onClick={async () => {
                        const id = selectedContact._id || selectedContact.id || '';
                        await handleMarkReplied(id);
                        setIsDialogOpen(false);
                      }}
                      className="flex-1"
                      disabled={updateMutation.isPending}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Replied
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

