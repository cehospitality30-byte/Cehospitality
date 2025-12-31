import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Mail, UtensilsCrossed, Tag, TrendingUp, Users } from 'lucide-react';
import { useBookings } from '@/hooks/useBookings';
import { useMenuItems } from '@/hooks/useMenu';
import { useOffers } from '@/hooks/useOffers';
import { useContacts } from '@/hooks/useContacts';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: bookings = [], isLoading: bookingsLoading } = useBookings() as { data: any[]; isLoading: boolean };
  const { data: menuItems = [], isLoading: menuItemsLoading } = useMenuItems() as { data: any[]; isLoading: boolean };
  const { data: offers = [], isLoading: offersLoading } = useOffers() as { data: any[]; isLoading: boolean };
  const { data: contacts = [], isLoading: contactsLoading } = useContacts() as { data: any[]; isLoading: boolean };

  // Calculate stats
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b: any) => b.status === 'pending').length;
  const totalMenuItems = menuItems.length;
  const activeOffers = offers.filter((o: any) => o.isActive).length;
  const unreadMessages = contacts.filter((c: any) => c.status === 'unread').length;

  const stats = [
    {
      title: 'Total Bookings',
      value: totalBookings.toString(),
      change: '+12%',
      icon: Calendar,
      color: 'text-blue-500',
    },
    {
      title: 'New Messages',
      value: unreadMessages.toString(),
      change: '+5',
      icon: Mail,
      color: 'text-green-500',
    },
    {
      title: 'Menu Items',
      value: totalMenuItems.toString(),
      change: '+8',
      icon: UtensilsCrossed,
      color: 'text-amber-500',
    },
    {
      title: 'Active Offers',
      value: activeOffers.toString(),
      change: '2 new',
      icon: Tag,
      color: 'text-purple-500',
    },
  ];

  // Get recent bookings
  const recentBookings = bookings
    .slice(0, 3)
    .map((booking: any) => ({
      id: booking._id || booking.id,
      name: booking.name,
      date: new Date(booking.date).toISOString().split('T')[0],
      time: booking.time,
      guests: booking.guests,
      status: booking.status,
    }));

  return (
    <AdminLayout title="Dashboard" description="Overview of your cafe management">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest reservation requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{booking.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.date} at {booking.time} • {booking.guests} guests
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        booking.status === 'confirmed'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-amber-500/20 text-amber-500'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common management tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/admin/menu')}
                  className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left cursor-pointer"
                >
                  <UtensilsCrossed className="w-6 h-6 text-primary mb-2" />
                  <p className="font-medium">Add Menu Item</p>
                  <p className="text-xs text-muted-foreground">Create new dish</p>
                </button>
                <button 
                  onClick={() => navigate('/admin/offers')}
                  className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left cursor-pointer"
                >
                  <Tag className="w-6 h-6 text-primary mb-2" />
                  <p className="font-medium">Create Offer</p>
                  <p className="text-xs text-muted-foreground">New promotion</p>
                </button>
                <button 
                  onClick={() => navigate('/admin/contacts')}
                  className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left cursor-pointer"
                >
                  <Mail className="w-6 h-6 text-primary mb-2" />
                  <p className="font-medium">View Messages</p>
                  <p className="text-xs text-muted-foreground">23 unread</p>
                </button>
                <button 
                  onClick={() => navigate('/admin/bookings')}
                  className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left cursor-pointer"
                >
                  <Calendar className="w-6 h-6 text-primary mb-2" />
                  <p className="font-medium">Manage Bookings</p>
                  <p className="text-xs text-muted-foreground">124 total</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

