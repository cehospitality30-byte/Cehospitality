import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function PremiumCard({ children, className, hover = true }: CardProps) {
  return (
    <div className={cn(
      'relative bg-card border border-border rounded-xl p-6 md:p-8 transition-all duration-500',
      hover && 'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5',
      className
    )}>
      {children}
    </div>
  );
}

interface BrandCardProps {
  name: string;
  type: string;
  status: 'live' | 'coming-soon';
  description: string;
  icon: ReactNode;
}

export function BrandCard({ name, type, status, description, icon }: BrandCardProps) {
  return (
    <div className={cn(
      'relative bg-card border rounded-xl p-6 transition-all duration-500',
      status === 'live' 
        ? 'border-primary/50 hover:border-primary hover:shadow-lg hover:shadow-primary/10' 
        : 'border-border hover:border-border/80'
    )}>
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <span className={cn(
          'text-xs font-medium px-3 py-1 rounded-full',
          status === 'live' 
            ? 'bg-primary/20 text-primary' 
            : 'bg-muted text-muted-foreground'
        )}>
          {status === 'live' ? 'Currently Operating' : 'Coming Soon'}
        </span>
      </div>

      {/* Icon */}
      <div className={cn(
        'w-14 h-14 rounded-xl flex items-center justify-center mb-4',
        status === 'live' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
      )}>
        {icon}
      </div>

      {/* Content */}
      <span className="text-sm text-muted-foreground">{type}</span>
      <h3 className={cn(
        'font-display text-xl mb-2',
        status === 'live' ? 'text-foreground' : 'text-muted-foreground'
      )}>
        {name}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

interface DirectorCardProps {
  name: string;
  role: string;
  description: string;
  image?: string;
}

export function DirectorCard({ name, role, description }: DirectorCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-500 group">
      {/* Avatar Placeholder */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-500">
        <span className="font-display text-2xl text-primary">{name.charAt(0)}</span>
      </div>
      
      <h3 className="font-display text-xl text-foreground mb-1">{name}</h3>
      <span className="text-primary text-sm font-medium">{role}</span>
      <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{description}</p>
    </div>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 group">
      <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
        {icon}
      </div>
      <h3 className="font-display text-xl text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}

interface MenuItemCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  category?: string;
}

export function MenuItemCard({ name, description, price, image, category }: MenuItemCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        {category && (
          <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1 bg-primary/90 text-primary-foreground rounded-full">
            {category}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-lg text-foreground">{name}</h3>
          <span className="text-primary font-semibold">{price}</span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
