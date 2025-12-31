import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { PremiumCard } from '@/components/Cards';
import { Building2, Users, Award, Globe } from 'lucide-react';
import heroLounge from '@/assets/hero-lounge.jpg';

const CompanyOverview = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navigation />
      
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroLounge} 
            alt="Company Overview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        </div>
        <div className="relative container mx-auto px-6 pt-20">
          <span className="text-primary font-accent text-xl italic mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            About Us
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            Company <span className="text-gradient-gold">Overview</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <Section>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            C E Hospitality is a startup hospitality brand driven by a simple belief: great stays come from 
            thoughtful details and authentic service. We combine modern design, smart operations, and a 
            guest-first mindset to deliver reliable, high-quality experiences—every time.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you're visiting for work or leisure, we focus on what matters most: comfort, cleanliness, and care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PremiumCard className="text-center">
            <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-display text-3xl text-foreground mb-2">5</h3>
            <p className="text-muted-foreground">Hospitality Brands</p>
          </PremiumCard>
          <PremiumCard className="text-center">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-display text-3xl text-foreground mb-2">30+</h3>
            <p className="text-muted-foreground">Team Members</p>
          </PremiumCard>
          <PremiumCard className="text-center">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-display text-3xl text-foreground mb-2">6</h3>
            <p className="text-muted-foreground">Industry Awards</p>
          </PremiumCard>
          <PremiumCard className="text-center">
            <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-display text-3xl text-foreground mb-2">3</h3>
            <p className="text-muted-foreground">Cities</p>
          </PremiumCard>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default CompanyOverview;
