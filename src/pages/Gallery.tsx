import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { X } from 'lucide-react';
import SEO from '@/components/SEO';

import heroLounge from '@/assets/hero-lounge.jpg';
import signatureCoffee from '@/assets/signature-coffee.jpg';
import mocktail from '@/assets/mocktail.jpg';
import dessert from '@/assets/dessert.jpg';
import chefSpecial from '@/assets/chef-special.jpg';
import starters from '@/assets/starters.jpg';

const galleryImages = [
  { src: heroLounge, alt: 'Cozmo Cafe Lounge Interior - Best cafe ambiance in Hyderabad', category: 'Interior' },
  { src: signatureCoffee, alt: 'Signature artisan coffee at Cozmo Cafe Hyderabad', category: 'Food' },
  { src: mocktail, alt: 'Premium mocktails at best lounge in Banjara Hills Hyderabad', category: 'Beverages' },
  { src: dessert, alt: 'Delicious desserts at Cozmo Cafe Bistro Lounge Hyderabad', category: 'Food' },
  { src: chefSpecial, alt: 'Chef special gourmet dishes at premium restaurant Hyderabad', category: 'Food' },
  { src: starters, alt: 'Gourmet starters and appetizers at Cozmo Cafe Hyderabad', category: 'Food' },
  { src: heroLounge, alt: 'Evening ambiance at best lounge for couples in Hyderabad', category: 'Interior' },
  { src: mocktail, alt: 'Cocktail bar and beverages at Cozmo Lounge Hyderabad', category: 'Beverages' },
];

const categories = ['All', 'Interior', 'Food', 'Beverages'];

// Gallery Schema
const gallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Cozmo Cafe Bistro Lounge Photo Gallery",
  "description": "Photo gallery of Cozmo Cafe Bistro Lounge Hyderabad - Interior, food, beverages, and ambiance",
  "about": {
    "@type": "CafeOrCoffeeShop",
    "name": "Cozmo Cafe Bistro Lounge",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana"
    }
  }
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Gallery | Cozmo Cafe Bistro Lounge Hyderabad - Photos & Ambiance"
        description="Explore the photo gallery of Cozmo Cafe Bistro Lounge Hyderabad. See our beautiful interior, delicious food, refreshing beverages & cozy lounge ambiance. Best cafe photos in Banjara Hills."
        keywords="cafe gallery Hyderabad, restaurant photos Banjara Hills, lounge ambiance Hyderabad, cafe interior design, food photography Hyderabad, best cafe decor"
        canonicalUrl="https://cozmocafe.com/gallery"
        structuredData={gallerySchema}
      />
      
      <Navigation />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-card">
        <div className="container mx-auto px-6 text-center">
          <span className="text-primary font-accent text-xl italic mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Visual Journey
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            Our <span className="text-gradient-gold">Gallery</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            Explore the atmosphere, cuisine, and experiences that await you at Cozmo Cafe Bistro Lounge Hyderabad.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <Section>
        {/* Filter */}
        <nav aria-label="Gallery categories" className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:border-primary/50'
              }`}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <figure 
              key={index}
              onClick={() => setSelectedImage(image.src)}
              className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <figcaption className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-foreground font-medium text-center px-2">{image.alt}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-label="Image preview"
        >
          <button 
            className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image preview"
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Cozmo Cafe Bistro Lounge Hyderabad Gallery Preview"
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
