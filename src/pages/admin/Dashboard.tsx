import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Mail, UtensilsCrossed, Tag, TrendingUp, Users } from 'lucide-react';

const stats = [
  {
    title: 'Total Bookings',
    value: '124',
    change: '+12%',
    icon: Calendar,
    color: 'text-blue-500',
  },
  {
    title: 'New Messages',
    value: '23',
    change: '+5',
    icon: Mail,
    color: 'text-green-500',
  },
  {
    title: 'Menu Items',
    value: '156',
    change: '+8',
    icon: UtensilsCrossed,
    color: 'text-amber-500',
  },
  {
    title: 'Active Offers',
    value: '6',
    change: '2 new',
    icon: Tag,
    color: 'text-purple-500',
  },
];

const recentBookings = [
  { id: 1, name: 'John Doe', date: '2024-01-15', time: '7:00 PM', guests: 4, status: 'confirmed' },
  { id: 2, name: 'Jane Smith', date: '2024-01-15', time: '8:30 PM', guests: 2, status: 'pending' },
  { id: 3, name: 'Mike Johnson', date: '2024-01-16', time: '6:00 PM', guests: 6, status: 'confirmed' },
];

export default function Dashboard() {
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
                <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
                  <UtensilsCrossed className="w-6 h-6 text-primary mb-2" />
                  <p className="font-medium">Add Menu Item</p>
                  <p className="text-xs text-muted-foreground">Create new dish</p>
                </button>
                <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
                  <Tag className="w-6 h-6 text-primary mb-2" />
                  <p className="font-medium">Create Offer</p>
                  <p className="text-xs text-muted-foreground">New promotion</p>
                </button>
                <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
                  <Mail className="w-6 h-6 text-primary mb-2" />
                  <p className="font-medium">View Messages</p>
                  <p className="text-xs text-muted-foreground">23 unread</p>
                </button>
                <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
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

