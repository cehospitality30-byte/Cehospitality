import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CinematicHero } from '@/components/CinematicHero';
import { Section, SectionHeader } from '@/components/Section';
import { DirectorCard, ServiceCard, MenuItemCard, PremiumCard } from '@/components/Cards';
import { BrandsSection } from '@/components/BrandsSection';
import { BookingForm } from '@/components/BookingForm';
import { Button } from '@/components/ui/button';
import SEO, { businessSchema } from '@/components/SEO';
import CTASection from '@/components/CTASection';
import { 
  UtensilsCrossed, Building2, 
  Truck, PartyPopper, Target, Eye, Clock, Award,
  ShieldCheck, Users, TrendingUp, Sparkles, ArrowRight, CalendarCheck, MapPin
} from 'lucide-react';
import signatureCoffee from '@/assets/signature-coffee.jpg';
import mocktail from '@/assets/mocktail.jpg';
import dessert from '@/assets/dessert.jpg';
import chefSpecial from '@/assets/chef-special.jpg';

const Index = () => {
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Cozmo Cafe Bistro Lounge | Best Cafe & Lounge in Hyderabad"
        description="Visit Cozmo Cafe Bistro Lounge - Hyderabad's premium cafe & lounge. Enjoy artisan coffee, gourmet food, mocktails, live music & cozy hangout space. Perfect for couples, friends & families near Banjara Hills."
        keywords="best cafe in Hyderabad, best lounge in Hyderabad, cafe lounge Hyderabad, coffee shop near me, cafe near me, lounge near me, hangout places Hyderabad, romantic cafe Hyderabad, Banjara Hills cafe"
        canonicalUrl="https://cozmocafe.com/"
        structuredData={businessSchema}
      />
      
      {/* Floating Reserve Button */}
      <Link
        to="/booking"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold ${
          showFloatingButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Reserve a table at Cozmo Cafe Hyderabad"
      >
        <CalendarCheck className="w-5 h-5" />
        Reserve Table
      </Link>
      <Navigation />
      
      {/* Cinematic Hero with Integrated Slider */}
      <CinematicHero />

      {/* Company Overview - About Section */}
      <Section id="overview">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-accent text-lg italic mb-4 block">About Cozmo Cafe Hyderabad</span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Best <span className="text-gradient-gold">Cafe & Lounge</span> in Hyderabad
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Welcome to Cozmo Cafe Bistro Lounge – Hyderabad's premier destination for premium coffee, 
              gourmet cuisine, refreshing beverages, and a sophisticated lounge experience. Located in 
              the heart of the city, we're the perfect hangout spot for youth, couples, friends, and families.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Experience the finest artisan coffee, handcrafted mocktails, delicious snacks, and 
              exceptional meals in our cozy, modern ambiance. Whether you're looking for a romantic 
              date night cafe, a fun hangout with friends, or a family-friendly restaurant in Hyderabad, 
              Cozmo Cafe is your perfect choice.
            </p>
            <div className="flex flex-wrap gap-8 mb-8">
              <div>
                <span className="text-4xl font-display text-primary">1</span>
                <p className="text-muted-foreground text-sm">Live Outlet</p>
              </div>
              <div>
                <span className="text-4xl font-display text-foreground">4</span>
                <p className="text-muted-foreground text-sm">Upcoming Projects</p>
              </div>
              <div>
                <span className="text-4xl font-display text-foreground">5+</span>
                <p className="text-muted-foreground text-sm">Years Vision</p>
              </div>
            </div>
            <Button variant="gold" asChild>
              <Link to="/about">Learn More About Us <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src={signatureCoffee} 
                alt="Best signature coffee at Cozmo Cafe Hyderabad" 
                className="rounded-xl h-64 w-full object-cover"
                loading="lazy"
              />
              <img 
                src={mocktail} 
                alt="Refreshing mocktails at premium lounge in Hyderabad" 
                className="rounded-xl h-64 w-full object-cover mt-8"
                loading="lazy"
              />
              <img 
                src={dessert} 
                alt="Delicious desserts at Cozmo Cafe Bistro Lounge" 
                className="rounded-xl h-64 w-full object-cover -mt-8"
                loading="lazy"
              />
              <img 
                src={chefSpecial} 
                alt="Chef special gourmet dishes at best restaurant Hyderabad" 
                className="rounded-xl h-64 w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
              <p className="font-accent text-lg italic">Crafted with Passion</p>
              <p className="font-display text-2xl">Since 2020</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Homepage CTA */}
      <CTASection variant="homepage" />

      {/* Brand Structure */}
      <Section dark id="brands">
        <SectionHeader 
          label="Our Portfolio"
          title="Building a Hospitality Empire"
          description="From cafés to resorts, we're expanding our vision across multiple hospitality segments in Hyderabad and beyond."
        />
        <BrandsSection />
      </Section>

      {/* Vision & Mission */}
      <Section id="vision">
        <div className="grid lg:grid-cols-2 gap-12">
          <PremiumCard className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <Eye className="w-12 h-12 text-primary mb-6" />
            <h3 className="font-display text-2xl text-foreground mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become the most loved cafe and lounge brand in Hyderabad and beyond, 
              setting the benchmark for premium hospitality, exceptional service, and 
              unforgettable guest experiences.
            </p>
          </PremiumCard>
          <PremiumCard className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <Target className="w-12 h-12 text-primary mb-6" />
            <h3 className="font-display text-2xl text-foreground mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To deliver premium cafe and lounge experiences through exceptional coffee, 
              delicious food, refreshing beverages, and warm hospitality that makes every 
              guest feel special at our Hyderabad location.
            </p>
          </PremiumCard>
        </div>
      </Section>

      {/* Leadership */}
      <Section dark id="leadership">
        <SectionHeader 
          label="Leadership"
          title="Visionaries Behind the Brand"
          description="Meet the dedicated leaders driving C E Hospitality towards excellence."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DirectorCard 
            name="Samuel Charles"
            role="Founder & CEO"
            description="With over 5 years in luxury hospitality, Alexander leads the group's vision for expansion and excellence."
          />
          <DirectorCard 
            name="Padma Vijaya"
            role="Director of Operations"
            description="Padma ensures seamless operations across all venues, maintaining our high standards of service."
          />
          <DirectorCard 
            name="Sidhaartha"
            role="Culinary Director"
            description="An award-winning chef bringing innovative cuisine and exceptional dining experiences to our guests."
          />
          <DirectorCard 
            name="Vidya Sagar"
            role="Brand Director"
            description="Vidya shapes our visual identity and guest experience, ensuring consistency across all brands."
          />
        </div>
      </Section>

      {/* Services */}
      <Section id="services">
        <SectionHeader 
          label="Our Services in Hyderabad"
          title="What We Offer"
          description="From coffee and snacks to fine dining and lounge experiences - we cater to every occasion."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard 
            title="Premium Dine-In"
            description="Experience our elegant cafe and lounge ambiance with attentive service, perfect for couples and families in Hyderabad."
            icon={<UtensilsCrossed className="w-6 h-6" />}
          />
          <ServiceCard 
            title="Takeaway & Delivery"
            description="Enjoy Cozmo Cafe's premium coffee and food delivered to your doorstep across Hyderabad."
            icon={<Truck className="w-6 h-6" />}
          />
          <ServiceCard 
            title="Party & Event Catering"
            description="Elevate your celebrations with our professional catering services for birthdays, anniversaries, and corporate events."
            icon={<PartyPopper className="w-6 h-6" />}
          />
          <ServiceCard 
            title="Private Dining"
            description="Exclusive private spaces for romantic dinners, intimate gatherings, and special celebrations in Hyderabad."
            icon={<Users className="w-6 h-6" />}
          />
          <ServiceCard 
            title="Live Entertainment"
            description="Weekend nights come alive with live music and curated entertainment at our lounge in Hyderabad."
            icon={<Sparkles className="w-6 h-6" />}
          />
          <ServiceCard 
            title="Corporate Events"
            description="Professional venue for business meetings, product launches, and corporate gatherings in Hyderabad."
            icon={<Building2 className="w-6 h-6" />}
          />
        </div>
      </Section>

      {/* Cafe CTA */}
      <CTASection variant="cafe" />

      {/* Menu Preview */}
      <Section dark id="menu">
        <SectionHeader 
          label="Our Menu"
          title="Taste the Excellence"
          description="A curated selection of artisan coffee, mocktails, gourmet dishes, and desserts."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <MenuItemCard 
            name="Signature Latte"
            description="Single-origin espresso with velvety steamed milk and artisan latte art."
            price="₹250"
            image={signatureCoffee}
            category="Coffee"
          />
          <MenuItemCard 
            name="Sunset Spritzer"
            description="Refreshing blend of citrus, passion fruit, and sparkling soda."
            price="₹320"
            image={mocktail}
            category="Mocktails"
          />
          <MenuItemCard 
            name="Tiramisu Royale"
            description="Classic Italian dessert with espresso-soaked ladyfingers and mascarpone."
            price="₹380"
            image={dessert}
            category="Desserts"
          />
          <MenuItemCard 
            name="Grilled Tenderloin"
            description="Premium beef tenderloin with red wine reduction and seasonal vegetables."
            price="₹850"
            image={chefSpecial}
            category="Chef Special"
          />
        </div>
        <div className="text-center">
          <Button variant="gold-outline" size="lg" asChild>
            <Link to="/menu">View Full Menu <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </Section>

      {/* Lounge CTA */}
      <CTASection variant="lounge" />

      {/* Company Values */}
      <Section>
        <SectionHeader 
          label="Why Choose Cozmo Cafe"
          title="Our Promise to You"
          description="What makes us the best cafe and lounge in Hyderabad."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PremiumCard>
            <ShieldCheck className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display text-lg text-foreground mb-2">Hygiene First</h3>
            <p className="text-muted-foreground text-sm">Rigorous standards ensuring the highest levels of cleanliness and food safety.</p>
          </PremiumCard>
          <PremiumCard>
            <Award className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display text-lg text-foreground mb-2">Premium Quality</h3>
            <p className="text-muted-foreground text-sm">Only the finest ingredients in our coffee, food, and beverages.</p>
          </PremiumCard>
          <PremiumCard>
            <Clock className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display text-lg text-foreground mb-2">Prompt Service</h3>
            <p className="text-muted-foreground text-sm">Efficient operations ensuring quick service without compromising quality.</p>
          </PremiumCard>
          <PremiumCard>
            <TrendingUp className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display text-lg text-foreground mb-2">Cozy Ambiance</h3>
            <p className="text-muted-foreground text-sm">Modern, comfortable lounge setting perfect for relaxation and socializing.</p>
          </PremiumCard>
        </div>
      </Section>

      {/* Booking Section */}
      <Section dark id="booking">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-accent text-lg italic mb-4 block">Book a Table in Hyderabad</span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Reserve Your <span className="text-gradient-gold">Experience</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Whether you're planning a romantic date night, birthday celebration, friends hangout, 
              or family dinner in Hyderabad, our team is ready to create an unforgettable experience.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <address className="text-foreground not-italic">Road No. 12, Banjara Hills, Hyderabad, Telangana</address>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-foreground">Open Daily: 8:00 AM – 11:00 PM</span>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-8">
            <BookingForm />
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <section className="h-[400px] relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.7!2d78.4071!3d17.4126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI0JzQ1LjQiTiA3OMKwMjQnMjUuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Cozmo Cafe Bistro Lounge Location - Best Cafe in Banjara Hills Hyderabad"
          className="grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      <Footer />
    </div>
  );
};

export default Index;
