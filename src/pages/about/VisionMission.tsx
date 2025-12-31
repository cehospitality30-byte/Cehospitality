import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { PremiumCard } from '@/components/Cards';
import { Eye, Target, Star } from 'lucide-react';
import heroLounge from '@/assets/hero-lounge.jpg';

const VisionMission = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navigation />
      
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroLounge} 
            alt="Vision & Mission"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        </div>
        <div className="relative container mx-auto px-6 pt-20">
          <span className="text-primary font-accent text-xl italic mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            About Us
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            Vision & <span className="text-gradient-gold">Mission</span>
          </h1>
        </div>
      </section>

      {/* Vision & Mission */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <PremiumCard className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <Eye className="w-14 h-14 text-primary mb-6" />
            <h3 className="font-display text-3xl text-foreground mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To become a trusted hospitality brand known for consistency, warmth, and modern comfort.
            </p>
          </PremiumCard>
          <PremiumCard className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <Target className="w-14 h-14 text-primary mb-6" />
            <h3 className="font-display text-3xl text-foreground mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To deliver meaningful guest experiences through thoughtful design, efficient service, and genuine care.
            </p>
          </PremiumCard>
        </div>

        {/* Our Promise */}
        <PremiumCard className="relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <Star className="w-14 h-14 text-primary mb-6" />
          <h3 className="font-display text-3xl text-foreground mb-4">Our Promise</h3>
          <p className="text-muted-foreground leading-relaxed text-lg">
            As a growing hospitality startup, we value every guest relationship. Your comfort, trust, and satisfaction are our greatest achievements—and the foundation of our future.
          </p>
        </PremiumCard>

        {/* Call to Action */}
        <PremiumCard className="text-center">
          <h3 className="font-display text-3xl text-foreground mb-4">Call to Action</h3>
          <p className="text-xl text-foreground font-medium mb-2">Come for the coffee. Stay for the vibe.</p>
          <p className="text-muted-foreground text-lg">
            Visit Cozmo Cafe Bistro and Lounge at one of our Hyderabad locations today.
          </p>
        </PremiumCard>
      </Section>

      <Footer />
    </div>
  );
};

export default VisionMission;
