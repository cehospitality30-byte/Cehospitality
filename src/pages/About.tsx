import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Section, SectionHeader } from '@/components/Section';
import { PremiumCard, DirectorCard, BrandCard } from '@/components/Cards';
import SEO from '@/components/SEO';
import { 
  Eye, Target, Clock, Award, ShieldCheck, Users, 
  TrendingUp, Building2, Coffee, TreePalm, Wine,
  CheckCircle, Sparkles, Heart
} from 'lucide-react';

import heroLounge from '@/assets/hero-lounge.jpg';

// About Page Schema
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Cozmo Cafe Bistro Lounge Hyderabad",
  "description": "Learn about C E Hospitality and Cozmo Cafe Bistro Lounge - Hyderabad's premium cafe & lounge destination since 2020.",
  "mainEntity": {
    "@type": "Organization",
    "name": "C E Hospitality",
    "foundingDate": "2020",
    "founders": [
      {"@type": "Person", "name": "Samuel Charles"}
    ],
    "numberOfEmployees": "50+",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "IN"
    }
  }
};

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="About Us | Cozmo Cafe Bistro Lounge Hyderabad - Our Story"
        description="Discover the story of Cozmo Cafe Bistro Lounge - Hyderabad's premier cafe & lounge by C E Hospitality. Learn about our vision, mission, leadership team & commitment to excellence since 2020."
        keywords="about Cozmo Cafe, cafe history Hyderabad, C E Hospitality, best cafe brand Hyderabad, premium lounge Hyderabad, cafe founders, restaurant story"
        canonicalUrl="https://cozmocafe.com/about"
        structuredData={aboutSchema}
      />
      
      <Navigation />
      
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroLounge} 
            alt="Cozmo Cafe Bistro Lounge interior - Best cafe ambiance in Hyderabad"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        </div>
        <div className="relative container mx-auto px-6 pt-20">
          <span className="text-primary font-accent text-xl italic mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            About Cozmo Cafe Hyderabad
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            Our <span className="text-gradient-gold">Story</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl opacity-0 animate-fade-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            From a vision of excellence to Hyderabad's premier cafe & lounge, 
            discover the journey that shaped C E Hospitality.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <Section id="overview">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary font-accent text-lg italic mb-4 block">Who We Are</span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8">
            C E Hospitality
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            C E Hospitality is a startup hospitality brand driven by a simple belief: great stays come from 
            thoughtful details and authentic service. We combine modern design, smart operations, and a 
            guest-first mindset to deliver reliable, high-quality experiences—every time.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you're visiting for work or leisure, we focus on what matters most: comfort, cleanliness, and care.
          </p>
        </div>
      </Section>

      {/* History */}
      <Section dark id="history">
        <SectionHeader 
          label="Our Journey in Hyderabad"
          title="Company History"
          description="The story of passion, perseverance, and pursuit of excellence in Hyderabad's hospitality scene."
        />
        <div className="max-w-4xl mx-auto">
          <div className="relative pl-8 border-l-2 border-primary/30 space-y-12">
            <div className="relative">
              <div className="absolute -left-[41px] w-5 h-5 rounded-full bg-primary" />
              <span className="text-primary font-display text-xl">2020</span>
              <h3 className="font-display text-xl text-foreground mt-2 mb-3">The Vision Takes Shape in Hyderabad</h3>
              <p className="text-muted-foreground">
                C E Hospitality was founded in Hyderabad with a clear vision: to create hospitality experiences 
                that combine luxury, warmth, and impeccable service. Our founders identified a gap 
                in the market for premium yet accessible hospitality venues in Telangana.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] w-5 h-5 rounded-full bg-primary" />
              <span className="text-primary font-display text-xl">2021</span>
              <h3 className="font-display text-xl text-foreground mt-2 mb-3">Cozmo Cafe Bistro Lounge Opens in Banjara Hills</h3>
              <p className="text-muted-foreground">
                Our flagship venue opened its doors in Banjara Hills, introducing Hyderabad to a new standard of 
                cafe and lounge experience. The response exceeded expectations, making us one of the 
                best cafes in Hyderabad within months.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] w-5 h-5 rounded-full bg-primary" />
              <span className="text-primary font-display text-xl">2023</span>
              <h3 className="font-display text-xl text-foreground mt-2 mb-3">Expansion Plans Across Telangana</h3>
              <p className="text-muted-foreground">
                Building on our success in Hyderabad, we announced plans for four new hospitality projects: 
                luxury hotels, premium resorts, specialty coffee shops, and exclusive lounges.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] w-5 h-5 rounded-full bg-foreground/30" />
              <span className="text-muted-foreground font-display text-xl">2025 & Beyond</span>
              <h3 className="font-display text-xl text-foreground mt-2 mb-3">The Future Unfolds</h3>
              <p className="text-muted-foreground">
                With strategic expansion plans in motion across Hyderabad and beyond, we continue to grow while maintaining 
                our commitment to excellence that defines C E Hospitality.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section id="vision">
        <div className="grid lg:grid-cols-2 gap-12">
          <PremiumCard className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <Eye className="w-14 h-14 text-primary mb-6" />
            <h3 className="font-display text-3xl text-foreground mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To become the most loved cafe and lounge brand in Hyderabad and across India, 
              setting the benchmark for premium hospitality, exceptional service, and 
              unforgettable guest experiences.
            </p>
          </PremiumCard>
          <PremiumCard className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <Target className="w-14 h-14 text-primary mb-6" />
            <h3 className="font-display text-3xl text-foreground mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To deliver premium cafe and lounge experiences in Hyderabad through exceptional coffee, 
              delicious food, refreshing beverages, and warm hospitality that makes every 
              guest feel valued and special.
            </p>
          </PremiumCard>
        </div>
      </Section>

      {/* Leadership */}
      <Section dark id="leadership">
        <SectionHeader 
          label="Leadership"
          title="Meet Our Directors"
          description="The visionaries and experts driving C E Hospitality's success in Hyderabad."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DirectorCard 
            name="Samuel Charles"
            role="Founder & CEO"
            description="With over 15 years in luxury hospitality, Samuel leads the group's strategic vision and expansion across Hyderabad and beyond."
          />
          <DirectorCard 
            name="Padma Vijaya"
            role="Director of Operations"
            description="Padma ensures seamless operations across all venues. Her expertise in hospitality management guarantees consistent quality and service excellence."
          />
          <DirectorCard 
            name="Sidhaartha"
            role="Culinary Director"
            description="An award-winning chef bringing innovative cuisine and exceptional dining experiences. Sidhaartha curates our menus with creativity and precision."
          />
          <DirectorCard 
            name="Vidya Sagar"
            role="Brand Director"
            description="Vidya shapes the visual identity and guest experience across all C E Hospitality brands, ensuring consistency and memorable impressions."
          />
        </div>
      </Section>

      {/* Brand Portfolio */}
      <Section>
        <SectionHeader 
          label="Our Portfolio"
          title="Our Brands"
          description="A growing family of premium hospitality experiences."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BrandCard 
            name="Cozmo Cafe Bistro Lounge"
            type="Cafe & Lounge"
            status="live"
            description="Hyderabad's premium coffee, artisan mocktails, gourmet cuisine, and sophisticated lounge experience."
            icon={<Coffee className="w-7 h-7" />}
          />
          <BrandCard 
            name="Cafes"
            type="Dining"
            status="live"
            description="Modern cafe experiences with quality food and beverages."
            icon={<Coffee className="w-7 h-7" />}
          />
          <BrandCard 
            name="Resorts"
            type="Leisure"
            status="live"
            description="Destination retreats offering relaxation and adventure."
            icon={<TreePalm className="w-7 h-7" />}
          />
          <BrandCard 
            name="Lounges"
            type="Entertainment"
            status="live"
            description="Sophisticated venues with premium beverages and entertainment."
            icon={<Wine className="w-7 h-7" />}
          />
        </div>
      </Section>

      {/* Company Values */}
      <Section dark>
        <SectionHeader 
          label="Our Values"
          title="What We Stand For"
          description="The principles that guide every aspect of our hospitality in Hyderabad."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PremiumCard>
            <Heart className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display text-lg text-foreground mb-2">Guest First</h3>
            <p className="text-muted-foreground text-sm">Every decision is made with our guests' comfort and satisfaction in mind.</p>
          </PremiumCard>
          <PremiumCard>
            <Award className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display text-lg text-foreground mb-2">Excellence</h3>
            <p className="text-muted-foreground text-sm">We pursue the highest standards in everything we do.</p>
          </PremiumCard>
          <PremiumCard>
            <TrendingUp className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display text-lg text-foreground mb-2">Innovation</h3>
            <p className="text-muted-foreground text-sm">Continuously evolving to bring fresh experiences.</p>
          </PremiumCard>
          <PremiumCard>
            <Users className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display text-lg text-foreground mb-2">Teamwork</h3>
            <p className="text-muted-foreground text-sm">Together we create exceptional hospitality experiences.</p>
          </PremiumCard>
        </div>
      </Section>

      {/* Standards & Responsibilities */}
      <Section>
        <SectionHeader 
          label="Our Standards"
          title="Rules & Responsibilities"
          description="The operational principles that ensure consistent excellence across all our Hyderabad venues."
        />
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              Hygiene & Safety Standards
            </h3>
            <ul className="space-y-3">
              {[
                'Regular sanitization of all areas',
                'Staff health monitoring protocols',
                'FSSAI food safety certification compliance',
                'Emergency response procedures',
                'Guest safety as top priority'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Service Ethics
            </h3>
            <ul className="space-y-3">
              {[
                'Warm and genuine hospitality',
                'Prompt and attentive service',
                'Professional conduct at all times',
                'Respect for guest privacy',
                'Continuous improvement mindset'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default About;
