import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Coffee, Building2, TreePalm, Wine, ChevronDown, MapPin, ExternalLink } from 'lucide-react';

// ==========================================
// BRAND & LOCATION DATA CONFIGURATION
// Toggle 'status' between 'live' and 'coming-soon' to activate/deactivate
// ==========================================

interface Location {
  id: string;
  name: string;
  address: string;
  status: 'live' | 'coming-soon';
  href?: string;
}

interface Brand {
  id: string;
  name: string;
  type: string;
  status: 'live' | 'coming-soon';
  description: string;
  icon: ReactNode;
  href?: string;
  hasLocations?: boolean;
  locations?: Location[];
}

const brandsData: Brand[] = [
  {
    id: 'cozmo-cafe',
    name: 'Cozmo Cafe Bistro Lounge',
    type: 'Cafe & Lounge',
    status: 'live',
    description: 'Our flagship establishment offering premium coffee, artisan mocktails, gourmet cuisine, and a sophisticated lounge experience.',
    icon: <Coffee className="w-7 h-7" />,
    href: '/',
  },
  {
    id: 'hotels',
    name: 'Luxury Hotels',
    type: 'Hospitality',
    status: 'coming-soon',
    description: 'World-class accommodations designed to provide unparalleled comfort and memorable stays.',
    icon: <Building2 className="w-7 h-7" />,
  },
  {
    id: 'resorts',
    name: 'Premium Resorts',
    type: 'Leisure',
    status: 'coming-soon',
    description: 'Destination retreats offering relaxation, adventure, and exceptional hospitality experiences.',
    icon: <TreePalm className="w-7 h-7" />,
  },
  {
    id: 'coffee-shops',
    name: 'Specialty Coffee Shops',
    type: 'Quick Service',
    status: 'coming-soon',
    description: 'Artisan coffee destinations bringing specialty brews to urban locations.',
    icon: <Coffee className="w-7 h-7" />,
  },
  {
    id: 'lounges',
    name: 'Exclusive Lounges',
    type: 'Entertainment',
    status: 'coming-soon',
    description: 'Sophisticated evening venues with premium beverages and live entertainment.',
    icon: <Wine className="w-7 h-7" />,
    hasLocations: true,
    locations: [
      {
        id: 'lounge-downtown',
        name: 'Downtown Lounge',
        address: '123 Luxury Boulevard, Downtown District',
        status: 'coming-soon',
        href: '/lounges/downtown',
      },
      {
        id: 'lounge-marina',
        name: 'Marina Bay Lounge',
        address: '456 Marina Bay, Waterfront',
        status: 'coming-soon',
        href: '/lounges/marina',
      },
      {
        id: 'lounge-skyview',
        name: 'Skyview Rooftop Lounge',
        address: '789 Tower Heights, 50th Floor',
        status: 'coming-soon',
        href: '/lounges/skyview',
      },
    ],
  },
];

// Brand Card Component
function BrandCardAdvanced({ brand, onLocationExpand, isExpanded }: { 
  brand: Brand; 
  onLocationExpand?: () => void;
  isExpanded?: boolean;
}) {
  const navigate = useNavigate();
  const isLive = brand.status === 'live';
  const hasLocations = brand.hasLocations && brand.locations && brand.locations.length > 0;

  const handleClick = () => {
    if (!isLive) return;
    
    if (hasLocations && onLocationExpand) {
      onLocationExpand();
    } else if (brand.href) {
      navigate(brand.href);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'relative bg-card border rounded-xl p-6 transition-all duration-500 group',
        isLive 
          ? 'border-primary/50 cursor-pointer hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1' 
          : 'border-border/50 opacity-60 cursor-default',
        isExpanded && 'border-primary ring-2 ring-primary/20'
      )}
    >
      {/* Live Indicator Dot */}
      {isLive && (
        <div className="absolute top-4 left-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
        </div>
      )}

      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <span className={cn(
          'text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300',
          isLive 
            ? 'bg-primary/20 text-primary border border-primary/30' 
            : 'bg-muted/50 text-muted-foreground border border-border/50'
        )}>
          {isLive ? 'Live' : 'Coming Soon'}
        </span>
      </div>

      {/* Icon */}
      <div className={cn(
        'w-14 h-14 rounded-xl flex items-center justify-center mb-4 mt-4 transition-all duration-500',
        isLive 
          ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110' 
          : 'bg-muted/50 text-muted-foreground'
      )}>
        {brand.icon}
      </div>

      {/* Content */}
      <span className="text-sm text-muted-foreground font-medium">{brand.type}</span>
      <h3 className={cn(
        'font-display text-xl mb-2 mt-1 transition-colors duration-300',
        isLive ? 'text-foreground group-hover:text-primary' : 'text-muted-foreground'
      )}>
        {brand.name}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {brand.description}
      </p>

      {/* Action Indicator */}
      {isLive && (
        <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          {hasLocations ? (
            <>
              <MapPin className="w-4 h-4" />
              <span>Select Location</span>
              <ChevronDown className={cn(
                'w-4 h-4 transition-transform duration-300',
                isExpanded && 'rotate-180'
              )} />
            </>
          ) : (
            <>
              <ExternalLink className="w-4 h-4" />
              <span>View Brand</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Location Selector Component
function LocationSelector({ locations, onSelect, isVisible }: {
  locations: Location[];
  onSelect: (location: Location) => void;
  isVisible: boolean;
}) {
  const liveLocations = locations.filter(l => l.status === 'live');
  const upcomingLocations = locations.filter(l => l.status === 'coming-soon');

  return (
    <div className={cn(
      'overflow-hidden transition-all duration-500 ease-out',
      isVisible ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'
    )}>
      <div className="bg-secondary/50 border border-border/50 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-primary" />
          <h4 className="font-display text-lg text-foreground">Select a Location</h4>
        </div>
        
        <div className="space-y-3">
          {/* Live Locations */}
          {liveLocations.map((location, index) => (
            <button
              key={location.id}
              onClick={() => onSelect(location)}
              className="w-full text-left p-4 bg-card border border-primary/30 rounded-lg hover:border-primary hover:shadow-md hover:shadow-primary/10 transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {location.name}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{location.address}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </button>
          ))}

          {/* Upcoming Locations */}
          {upcomingLocations.map((location, index) => (
            <div
              key={location.id}
              className="w-full text-left p-4 bg-muted/30 border border-border/30 rounded-lg opacity-50 cursor-not-allowed animate-fade-in"
              style={{ animationDelay: `${(liveLocations.length + index) * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2 py-0.5 bg-muted text-muted-foreground rounded">
                      Coming Soon
                    </span>
                    <span className="font-medium text-muted-foreground">
                      {location.name}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground/70 mt-1">{location.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Brands Section Component
export function BrandsSection() {
  const [expandedBrandId, setExpandedBrandId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLocationExpand = (brandId: string) => {
    setExpandedBrandId(prev => prev === brandId ? null : brandId);
  };

  const handleLocationSelect = (location: Location) => {
    if (location.status === 'live' && location.href) {
      setExpandedBrandId(null);
      navigate(location.href);
    }
  };

  // Separate live and upcoming brands for better display
  const liveBrands = brandsData.filter(b => b.status === 'live');
  const upcomingBrands = brandsData.filter(b => b.status === 'coming-soon');

  return (
    <div className="space-y-8">
      {/* Live Brands */}
      {liveBrands.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <h3 className="text-lg font-medium text-foreground">Currently Operating</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveBrands.map((brand) => (
              <div key={brand.id} className="relative">
                <BrandCardAdvanced 
                  brand={brand}
                  onLocationExpand={brand.hasLocations ? () => handleLocationExpand(brand.id) : undefined}
                  isExpanded={expandedBrandId === brand.id}
                />
                {brand.hasLocations && brand.locations && (
                  <LocationSelector
                    locations={brand.locations}
                    onSelect={handleLocationSelect}
                    isVisible={expandedBrandId === brand.id}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Brands */}
      {upcomingBrands.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-muted-foreground/50"></div>
            <h3 className="text-lg font-medium text-muted-foreground">Coming Soon</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingBrands.map((brand) => (
              <div key={brand.id} className="relative">
                <BrandCardAdvanced 
                  brand={brand}
                  onLocationExpand={brand.hasLocations ? () => handleLocationExpand(brand.id) : undefined}
                  isExpanded={expandedBrandId === brand.id}
                />
                {brand.hasLocations && brand.locations && (
                  <LocationSelector
                    locations={brand.locations}
                    onSelect={handleLocationSelect}
                    isVisible={expandedBrandId === brand.id}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
