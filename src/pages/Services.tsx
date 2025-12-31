import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Section, SectionHeader } from '@/components/Section';
import { ServiceCard } from '@/components/Cards';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { 
  UtensilsCrossed, Truck, PartyPopper, Users, 
  Sparkles, Building2, Music, Cake, ArrowRight,
  Hotel, Heart, ShieldCheck, MapPin
} from 'lucide-react';

// Services Schema
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Cafe and Lounge Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Cozmo Cafe Bistro Lounge",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "IN"
    }
  },
  "areaServed": {
    "@type": "City",
    "name": "Hyderabad"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Cafe & Lounge Services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Dine-In Experience"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Takeaway"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Home Delivery"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Event Catering"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Private Dining"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Live Entertainment"}}
    ]
  }
};

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Services | Cozmo Cafe Bistro Lounge Hyderabad - Dine-In, Catering & Events"
        description="Explore our services at Cozmo Cafe Hyderabad - Premium dine-in, takeaway, home delivery, party catering, private dining, live music entertainment & corporate events. Best cafe services in Banjara Hills."
        keywords="cafe services Hyderabad, restaurant catering Hyderabad, private dining Hyderabad, party venue Banjara Hills, corporate events Hyderabad, live music cafe, food delivery Hyderabad, birthday party cafe"
        canonicalUrl="https://cozmocafe.com/services"
        structuredData={servicesSchema}
      />
      
      <Navigation />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-card">
        <div className="container mx-auto px-6 text-center">
          <span className="text-primary font-accent text-xl italic mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            What We Offer in Hyderabad
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            Our <span className="text-gradient-gold">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            From intimate dinners to grand celebrations in Hyderabad, we offer a range of 
            premium hospitality services tailored to your needs.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-foreground mb-10">What We Offer</h2>
          <div className="space-y-8">
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Hotel className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground mb-2">Smart & Comfortable Stays</h3>
                <p className="text-muted-foreground">Modern, well-designed spaces created for relaxation and productivity.</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground mb-2">Guest-Centric Service</h3>
                <p className="text-muted-foreground">A friendly team that listens, responds quickly, and goes the extra mile.</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground mb-2">Clean, Safe & Reliable</h3>
                <p className="text-muted-foreground">Strict hygiene standards and seamless operations you can trust.</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground mb-2">Convenient Locations</h3>
                <p className="text-muted-foreground">Strategically located properties for easy access and smooth travel.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Main Services */}
      <Section>
        <SectionHeader 
          label="Core Services in Hyderabad"
          title="Experience Excellence"
          description="Every service at Cozmo Cafe is designed to exceed your expectations."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            title="Premium Dine-In Experience"
            description="Immerse yourself in our elegant cafe & lounge ambiance in Banjara Hills with attentive service, exquisite cuisine, and sophisticated atmosphere perfect for couples, friends, and families."
            icon={<UtensilsCrossed className="w-6 h-6" />}
          />
          <ServiceCard 
            title="Takeaway Service"
            description="Enjoy Cozmo Cafe's premium coffee and dishes at home. Order ahead for quick pickup from our Hyderabad location and experience culinary excellence wherever you are."
            icon={<Truck className="w-6 h-6" />}
          />
          <ServiceCard 
            title="Home Delivery Hyderabad"
            description="We bring the Cozmo experience to your doorstep across Hyderabad. Fresh, carefully packaged, and delivered with care to Banjara Hills, Jubilee Hills, and surrounding areas."
            icon={<Truck className="w-6 h-6" />}
          />
          <ServiceCard 
            title="Party & Event Catering"
            description="Elevate your celebrations in Hyderabad with our professional catering services. Customized menus for birthdays, anniversaries, house parties with impeccable presentation."
            icon={<PartyPopper className="w-6 h-6" />}
          />
          <ServiceCard 
            title="Private Dining Hyderabad"
            description="Exclusive private spaces for intimate gatherings, romantic date nights, anniversary dinners, and special celebrations with personalized service."
            icon={<Users className="w-6 h-6" />}
          />
          <ServiceCard 
            title="Birthday & Event Orders"
            description="From customized birthday cakes to full party spreads, we help make your Hyderabad celebrations memorable with our special event packages."
            icon={<Cake className="w-6 h-6" />}
          />
        </div>
      </Section>

      {/* Special Services */}
      <Section dark>
        <SectionHeader 
          label="Special Experiences in Hyderabad"
          title="Beyond Dining"
          description="Unique experiences that make Cozmo Cafe Bistro Lounge the best hangout in Hyderabad."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            title="Live Entertainment & Music"
            description="Weekend nights come alive with live music, acoustic sessions, and curated entertainment at the best lounge in Hyderabad for an unforgettable evening."
            icon={<Music className="w-6 h-6" />}
          />
          <ServiceCard 
            title="Premium Lounge Experience"
            description="Our sophisticated lounge in Banjara Hills offers premium beverages, cozy seating, and the perfect atmosphere for unwinding with friends or a romantic evening."
            icon={<Sparkles className="w-6 h-6" />}
          />
          <ServiceCard 
            title="Corporate Events Hyderabad"
            description="Professional venue for business meetings, product launches, team gatherings, and corporate celebrations in Hyderabad. WiFi, AV equipment, and catering available."
            icon={<Building2 className="w-6 h-6" />}
          />
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl text-foreground mb-6">
            Ready to Experience Premium Hospitality in Hyderabad?
          </h2>
          <p className="text-muted-foreground mb-8">
            Whether you're planning a romantic dinner, birthday party, corporate event, or friends hangout in Hyderabad, 
            our team at Cozmo Cafe is ready to create an unforgettable experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="gold" size="lg" asChild>
              <Link to="/booking">Make a Reservation <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
            <Button variant="gold-outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Services;
