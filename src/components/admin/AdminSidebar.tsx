import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Briefcase,
  Image,
  Calendar,
  Mail,
  Tag,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const baseMenuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
    exact: true,
  },
  {
    title: 'Menu Management',
    icon: UtensilsCrossed,
    href: '/admin/menu',
  },
  {
    title: 'Services',
    icon: Briefcase,
    href: '/admin/services',
  },
  {
    title: 'Gallery',
    icon: Image,
    href: '/admin/gallery',
  },
  {
    title: 'Bookings',
    icon: Calendar,
    href: '/admin/bookings',
    badge: 'new',
  },
  {
    title: 'Contact Inbox',
    icon: Mail,
    href: '/admin/contacts',
    badge: 'new',
  },
  {
    title: 'Offers',
    icon: Tag,
    href: '/admin/offers',
  },
  {
    title: 'Content Management',
    icon: FileText,
    href: '/admin/content',
  },
  {
    title: 'Leadership',
    icon: Users,
    href: '/admin/leadership',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/admin/settings',
  },
];

export function AdminSidebar() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(baseMenuItems);
  const [isAdmin, setIsAdmin] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  useEffect(() => {
    // Check if user is super admin to show super admin menu
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isSuperAdmin = payload.role === 'superadmin';
        setIsAdmin(isSuperAdmin);
        
        if (isSuperAdmin) {
          // Add super admin menu item
          setMenuItems([
            ...baseMenuItems,
            {
              title: 'Super Admin',
              icon: Users,
              href: '/admin/superadmin',
              exact: false,
            }
          ]);
        } else {
          setMenuItems(baseMenuItems);
        }
      } catch (error) {
        console.error('Error parsing token:', error);
        setIsAdmin(false);
        setMenuItems(baseMenuItems);
      }
    }
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-card"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-card border-r border-border z-40 transition-transform duration-300',
          'lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 border-b border-border flex items-center justify-between px-6">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="font-display text-lg text-primary-foreground font-bold">CE</span>
              </div>
              <div>
                <h2 className="font-display text-lg text-foreground">Admin Panel</h2>
                <p className="text-xs text-muted-foreground">C E Hospitality</p>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href, item.exact);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                    active
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className={cn('w-5 h-5', active && 'text-primary-foreground')} />
                  <span className="font-medium flex-1">{item.title}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-4 space-y-2">
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              <Building2 className="w-4 h-4" />
              <span>View Website</span>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/admin/login';
              }}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}

