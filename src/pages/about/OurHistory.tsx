import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Section, SectionHeader } from '@/components/Section';
import heroLounge from '@/assets/hero-lounge.jpg';

const OurHistory = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navigation />
      
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroLounge} 
            alt="Our History"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        </div>
        <div className="relative container mx-auto px-6 pt-20">
          <span className="text-primary font-accent text-xl italic mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            About Us
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            Our <span className="text-gradient-gold">History</span>
          </h1>
        </div>
      </section>

      {/* Our Concept */}
      <Section>
        <SectionHeader 
          label="Our Concept"
          title="What We Offer"
          description="A unique blend of cafe culture and lounge comfort."
        />
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="opacity-0 animate-fade-up border-b border-border/30 pb-8" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <h3 className="font-display text-xl text-foreground mb-3 flex items-center gap-3">
              <span className="text-2xl">☕</span> Cafe Culture Meets Lounge Comfort
            </h3>
            <p className="text-muted-foreground">
              A thoughtfully designed space that transitions seamlessly from daytime productivity to evening relaxation.
            </p>
          </div>
          <div className="opacity-0 animate-fade-up border-b border-border/30 pb-8" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <h3 className="font-display text-xl text-foreground mb-3 flex items-center gap-3">
              <span className="text-2xl">🥤</span> Fresh Food & Crafted Beverages
            </h3>
            <p className="text-muted-foreground">
              From signature coffees and coolers to flavorful bites and comfort meals—every item is made to delight.
            </p>
          </div>
          <div className="opacity-0 animate-fade-up border-b border-border/30 pb-8" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            <h3 className="font-display text-xl text-foreground mb-3 flex items-center gap-3">
              <span className="text-2xl">💼</span> Work-Friendly Ambience
            </h3>
            <p className="text-muted-foreground">
              Comfortable seating, calm lighting, and a vibe that supports focus and creativity.
            </p>
          </div>
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
            <h3 className="font-display text-xl text-foreground mb-3 flex items-center gap-3">
              <span className="text-2xl">🎵</span> Relaxed Social Atmosphere
            </h3>
            <p className="text-muted-foreground">
              A place to meet, talk, celebrate, and unwind—without the rush.
            </p>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default OurHistory;
