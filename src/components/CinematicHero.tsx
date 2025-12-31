import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import heroLounge from '@/assets/hero-lounge.jpg';
import signatureCoffee from '@/assets/signature-coffee.jpg';
import mocktail from '@/assets/mocktail.jpg';
import dessert from '@/assets/dessert.jpg';
import chefSpecial from '@/assets/chef-special.jpg';

const slides = [
  {
    image: heroLounge,
    label: 'WHERE CONVERSATIONS BREW & IDEAS FLOW',
    name: '',
    tagline: 'Welcome to C E Hospitality — a modern café & lounge experience built for Hyderabad\'s vibrant minds. From casual catch-ups and coffee breaks to business meetings and late-night conversations, we\'re your go-to space to eat, work, relax, and connect.',
    highlightTagline: true,
    cta: 'Visit Your Nearest Branch',
    ctaLink: '/contact',
    secondaryCta: 'Explore Our Menu',
    secondaryCtaLink: '/menu',
  },
  {
    image: signatureCoffee,
    label: 'SIGNATURE COLLECTION',
    name: 'Signature\nCoffee',
    tagline: 'Crafted with precision, served with passion. Premium beans from the finest estates.',
    cta: 'Order Now',
    ctaLink: '/menu',
  },
  {
    image: mocktail,
    label: 'ARTISAN BLENDS',
    name: 'Artisan\nMocktails',
    tagline: 'Refreshing blends that ignite your senses with vibrant flavors.',
    cta: 'View Menu',
    ctaLink: '/menu',
  },
  {
    image: dessert,
    label: 'SWEET INDULGENCE',
    name: 'Decadent\nDesserts',
    tagline: 'Sweet indulgence in every bite, crafted by our master pastry chefs.',
    cta: 'Order Now',
    ctaLink: '/menu',
  },
  {
    image: chefSpecial,
    label: 'CULINARY EXCELLENCE',
    name: 'Chef\nSpecials',
    tagline: 'Culinary excellence on your plate with seasonal gourmet creations.',
    cta: 'Explore Menu',
    ctaLink: '/menu',
  },
];

export function CinematicHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAnimationKey((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAnimationKey((prev) => prev + 1);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAnimationKey((prev) => prev + 1);
  };

  // Preload all images
  useEffect(() => {
    let mounted = true;
    let loaded = 0;

    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        if (mounted) {
          loaded++;
          setLoadedCount(loaded);
          if (loaded === slides.length) {
            setTimeout(() => setIsLoading(false), 500);
          }
        }
      };
    });

    return () => { mounted = false; };
  }, []);

  // Auto-slide with cinematic timing
  useEffect(() => {
    if (!isAutoPlaying || isLoading) return;
    
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isLoading, nextSlide]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Elegant Preloader */}
      <div 
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-1000 ${
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'hsl(20 10% 5%)' }}
      >
        <div className="relative mb-8">
          {/* Animated logo circle */}
          <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-spin" 
              style={{ animationDuration: '1.5s' }} 
            />
            <span className="absolute font-display text-2xl text-primary">CE</span>
          </div>
        </div>
        <p className="font-accent text-lg text-muted-foreground italic mb-4">Loading Experience</p>
        {/* Progress bar */}
        <div className="w-48 h-[2px] bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${(loadedCount / slides.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Background Slider with Horizontal Right-to-Left Transition */}
      <div className="absolute inset-0">
        <div 
          className="flex h-full transition-transform duration-1200 ease-cinematic"
          style={{ 
            width: `${slides.length * 100}%`,
            transform: `translateX(-${currentSlide * (100 / slides.length)}%)` 
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / slides.length}%` }}
            >
              {/* Image with parallax and subtle zoom */}
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={slide.image} 
                  alt={slide.name.replace('\n', ' ')}
                  className="w-full h-full object-cover transition-transform duration-6000 ease-out"
                  style={{ 
                    transform: `translateY(${scrollY * 0.2}px) scale(${currentSlide === index ? 1.05 : 1})`,
                  }}
                />
              </div>
              
              {/* Dark luxury gradient overlay per slide */}
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
            </div>
          ))}
        </div>
      </div>

      {/* Hero Content - Centered and changes per slide */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl" key={animationKey}>
            {/* Luxury Label */}
            <span 
              className="inline-block text-primary font-accent text-sm md:text-base tracking-[0.3em] mb-6 opacity-0 animate-fade-up"
              style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
            >
              {slides[currentSlide].label}
            </span>
            
            {/* Large Elegant Headline - only show if name exists */}
            {slides[currentSlide].name && (
              <h1 
                className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-[0.95] opacity-0 animate-fade-up"
                style={{ animationDelay: '250ms', animationFillMode: 'forwards' }}
              >
                {slides[currentSlide].name.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            )}
            
            {/* Premium Description - highlighted style for first slide */}
            <p 
              className={`max-w-2xl mb-10 leading-relaxed opacity-0 animate-fade-up ${
                (slides[currentSlide] as any).highlightTagline 
                  ? 'text-foreground text-xl md:text-2xl lg:text-3xl font-medium' 
                  : 'text-muted-foreground text-lg md:text-xl'
              }`}
              style={{ animationDelay: slides[currentSlide].name ? '400ms' : '250ms', animationFillMode: 'forwards' }}
            >
              {slides[currentSlide].tagline}
            </p>
            
            {/* Strong CTA Buttons */}
            <div 
              className="flex flex-wrap gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: '550ms', animationFillMode: 'forwards' }}
            >
              <Button variant="gold" size="xl" asChild>
                <Link to={slides[currentSlide].ctaLink}>{slides[currentSlide].cta}</Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to={slides[currentSlide].secondaryCtaLink || '/menu'}>
                  {slides[currentSlide].secondaryCta || 'Explore Our Menu'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-card/40 backdrop-blur-md border border-border/30 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-card/40 backdrop-blur-md border border-border/30 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              currentSlide === index 
                ? 'w-10 bg-primary' 
                : 'w-2 bg-foreground/30 hover:bg-foreground/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs tracking-[0.2em] rotate-90 origin-center translate-y-4 uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-muted-foreground to-transparent mt-6" />
      </div>
    </section>
  );
}
