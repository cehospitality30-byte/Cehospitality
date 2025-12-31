import { AdminSidebar } from './AdminSidebar';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function AdminLayout({ children, title, description }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="lg:pl-64">
        <div className="p-6 md:p-8">
          {(title || description) && (
            <div className="mb-8">
              {title && (
                <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}

