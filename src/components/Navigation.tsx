import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
const navigationItems = [{
  name: 'Home',
  href: '/'
}, {
  name: 'About Us',
  href: '/about',
  subItems: [{
    name: 'Company Overview',
    href: '/about/overview'
  }, {
    name: 'Vision & Mission',
    href: '/about/vision'
  }, {
    name: 'Our History',
    href: '/about/history'
  }, {
    name: 'Leadership',
    href: '/about/leadership'
  }]
}, {
  name: 'Menu',
  href: '/menu',
  subItems: [{
    name: 'Coffee',
    href: '/menu/coffee'
  }, {
    name: 'Beverages',
    href: '/menu/beverages'
  }, {
    name: 'Starters',
    href: '/menu/starters'
  }, {
    name: 'Main Course',
    href: '/menu/main-course'
  }, {
    name: 'Desserts',
    href: '/menu/desserts'
  }, {
    name: 'Chef Specials',
    href: '/menu/chef-specials'
  }]
}, {
  name: 'Services',
  href: '/services'
}, {
  name: 'Gallery',
  href: '/gallery'
}, {
  name: 'Offers',
  href: '/offers'
}, {
  name: 'Booking',
  href: '/booking'
}, {
  name: 'Contact',
  href: '/contact'
}];
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleDropdownEnter = (itemName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsClosing(false);
    setActiveDropdown(itemName);
  };
  const handleDropdownLeave = () => {
    setIsClosing(true);
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setIsClosing(false);
    }, 150);
  };
  const handleSubItemClick = (href: string) => {
    // Close dropdown with animation
    setIsClosing(true);
    setTimeout(() => {
      setActiveDropdown(null);
      setIsClosing(false);
      // Navigate to page
      navigate(href);
    }, 100);
  };
  const handleMobileSubItemClick = (href: string) => {
    setIsOpen(false);
    navigate(href);
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/50' : 'bg-transparent'}`}>
      {/* Top Bar */}
      <div className="hidden lg:block border-b border-border/30">
        <div className="container mx-auto px-6 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6 text-muted-foreground">
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>+9703266969</span>
            </a>
            <a href="mailto:sam@cehospitalitygroup.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              <span>sam@cehospitalitygroup.com</span>
            </a>
          </div>
          <div className="text-muted-foreground">
            Open Daily: 9:00 AM – 4:00 AM
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="font-display text-xl text-primary-foreground font-bold">CE</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-lg text-foreground leading-tight">C E Hospitality</h1>
              <p className="text-xs text-primary">Cozmo Cafe Bistro Lounge</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationItems.map(item => <div key={item.name} className="relative" onMouseEnter={() => item.subItems && handleDropdownEnter(item.name)} onMouseLeave={() => item.subItems && handleDropdownLeave()}>
                <Link to={item.href} className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-300 relative group ${activeDropdown === item.name ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}>
                  {item.name}
                  {item.subItems && <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                  {/* Hover underline effect */}
                  <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-primary transform origin-left transition-transform duration-300 ${activeDropdown === item.name ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
                
                {/* Elegant Dropdown */}
                {item.subItems && activeDropdown === item.name && <div className={`absolute top-full left-0 pt-2 z-50 ${isClosing ? 'animate-dropdown-close' : 'animate-dropdown-open'}`}>
                    <div className="bg-card/98 backdrop-blur-xl border border-border/60 rounded-xl shadow-2xl overflow-hidden min-w-[220px]" style={{
                boxShadow: '0 20px 60px hsla(20, 10%, 5%, 0.6), 0 0 30px hsla(38, 90%, 55%, 0.08)'
              }}>
                      {/* Dropdown header accent */}
                      <div className="h-[2px] bg-gradient-to-r from-primary via-accent to-primary" />
                      
                      <div className="py-2">
                        {item.subItems.map((subItem, index) => <button key={subItem.name} onClick={() => handleSubItemClick(subItem.href)} className="w-full text-left px-5 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300 relative group flex items-center gap-3" style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isClosing ? 'none' : 'dropdownItemFade 0.3s ease-out forwards'
                  }}>
                            {/* Hover accent bar */}
                            <span className="w-0 h-4 bg-primary rounded-full transition-all duration-300 group-hover:w-[3px]" />
                            <span className="font-medium">{subItem.name}</span>
                          </button>)}
                      </div>
                    </div>
                  </div>}
              </div>)}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="gold" size="lg" asChild>
              <Link to="/booking">Reserve a Table</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-foreground hover:text-primary transition-colors" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border animate-fade-in">
          <div className="container mx-auto px-6 py-4">
            {navigationItems.map(item => <div key={item.name}>
                {item.subItems ? <div className="border-b border-border/30">
                    <button onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)} className="w-full flex items-center justify-between py-3 text-foreground hover:text-primary transition-colors">
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.name && <div className="pl-4 pb-3 animate-fade-in">
                        {item.subItems.map(subItem => <button key={subItem.name} onClick={() => handleMobileSubItemClick(subItem.href)} className="block w-full text-left py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                            {subItem.name}
                          </button>)}
                      </div>}
                  </div> : <Link to={item.href} onClick={() => setIsOpen(false)} className="block py-3 text-foreground hover:text-primary transition-colors border-b border-border/30">
                    {item.name}
                  </Link>}
              </div>)}
            <div className="mt-4">
              <Button variant="gold" className="w-full" asChild>
                <Link to="/booking" onClick={() => setIsOpen(false)}>Reserve a Table</Link>
              </Button>
            </div>
          </div>
        </div>}

      {/* Dropdown animation styles */}
      <style>{`
        @keyframes dropdownOpen {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes dropdownClose {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-8px) scale(0.96);
          }
        }
        
        @keyframes dropdownItemFade {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-dropdown-open {
          animation: dropdownOpen 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-dropdown-close {
          animation: dropdownClose 0.15s ease-out forwards;
        }
      `}</style>
    </nav>;
}