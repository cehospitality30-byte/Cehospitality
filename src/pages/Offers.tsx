import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Section, SectionHeader } from '@/components/Section';
import { PremiumCard } from '@/components/Cards';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, Percent, Gift, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

import dessert from '@/assets/dessert.jpg';
import signatureCoffee from '@/assets/signature-coffee.jpg';
import chefSpecial from '@/assets/chef-special.jpg';

const offers = [
  {
    title: 'Happy Hour Special',
    description: 'Enjoy 20% off on all beverages from 4 PM to 7 PM, Monday to Thursday at our Hyderabad cafe.',
    discount: '20% OFF',
    image: signatureCoffee,
    validity: 'Mon - Thu, 4 PM - 7 PM',
    terms: 'Valid for dine-in only at Banjara Hills location. Cannot be combined with other offers.',
  },
  {
    title: 'Weekend Brunch Hyderabad',
    description: 'Unlimited brunch buffet with complimentary coffee. Perfect for weekend gatherings with friends and family.',
    discount: 'Special Menu',
    image: chefSpecial,
    validity: 'Sat - Sun, 10 AM - 2 PM',
    terms: 'Reservation required. Limited seating available at our Hyderabad outlet.',
  },
  {
    title: 'Dessert Delight',
    description: 'Order any main course and get a dessert of your choice absolutely free at Cozmo Cafe.',
    discount: 'FREE Dessert',
    image: dessert,
    validity: 'All Week',
    terms: 'Valid on main courses above ₹500. Subject to availability.',
  },
];

// Offers Schema
const offersSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "name": "Cozmo Cafe Bistro Lounge Special Offers",
  "description": "Special deals, discounts and offers at Cozmo Cafe Bistro Lounge Hyderabad",
  "itemListElement": offers.map((offer, index) => ({
    "@type": "Offer",
    "position": index + 1,
    "name": offer.title,
    "description": offer.description,
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "LocalBusiness",
      "name": "Cozmo Cafe Bistro Lounge",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana"
      }
    }
  }))
};

const Offers = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Offers & Deals | Cozmo Cafe Bistro Lounge Hyderabad - Discounts & Specials"
        description="Exclusive offers and deals at Cozmo Cafe Hyderabad. Happy hour discounts, weekend brunch specials, free desserts & loyalty rewards. Best cafe deals in Banjara Hills."
        keywords="cafe offers Hyderabad, restaurant discounts, happy hour Hyderabad, weekend brunch deals, cafe loyalty program, best deals Banjara Hills, cafe coupons Hyderabad"
        canonicalUrl="https://cozmocafe.com/offers"
        structuredData={offersSchema}
      />
      
      <Navigation />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-card">
        <div className="container mx-auto px-6 text-center">
          <span className="text-primary font-accent text-xl italic mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Special Deals in Hyderabad
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            Exclusive <span className="text-gradient-gold">Offers</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            Discover our special promotions and enjoy premium hospitality at exceptional value at Cozmo Cafe Hyderabad.
          </p>
        </div>
      </section>

      {/* Offers */}
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <article key={index} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={offer.image} 
                  alt={`${offer.title} - Special offer at Cozmo Cafe Hyderabad`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold text-sm">
                  {offer.discount}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-foreground mb-2">{offer.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{offer.description}</p>
                <div className="flex items-center gap-2 text-sm text-primary mb-2">
                  <Clock className="w-4 h-4" />
                  <time>{offer.validity}</time>
                </div>
                <p className="text-xs text-muted-foreground">{offer.terms}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Loyalty Program */}
      <Section dark>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-accent text-lg italic mb-4 block">Rewards Program Hyderabad</span>
            <h2 className="font-display text-4xl text-foreground mb-6">
              Join Our <span className="text-gradient-gold">Loyalty Program</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Become a valued member of Cozmo Cafe Hyderabad and unlock exclusive benefits, early access to new menu items, 
              birthday specials, and earn points on every visit.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Earn 1 point for every ₹100 spent',
                'Birthday special: Free dessert',
                'Early access to new menu launches',
                'Exclusive member-only events in Hyderabad',
                'Priority reservations at our Banjara Hills outlet'
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground">
                  <Gift className="w-5 h-5 text-primary" />
                  {benefit}
                </li>
              ))}
            </ul>
            <Button variant="gold" size="lg">
              Join Now <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <PremiumCard>
              <Percent className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-display text-2xl text-foreground">10%</h3>
              <p className="text-muted-foreground text-sm">Discount on first visit</p>
            </PremiumCard>
            <PremiumCard>
              <Gift className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-display text-2xl text-foreground">Free</h3>
              <p className="text-muted-foreground text-sm">Birthday dessert</p>
            </PremiumCard>
            <PremiumCard className="col-span-2">
              <h3 className="font-display text-xl text-foreground mb-2">Opening January 2026</h3>
              <p className="text-muted-foreground text-sm">Be among the first to experience premium hospitality at Cozmo Cafe Hyderabad – where great taste meets great moments!</p>
            </PremiumCard>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2 className="font-display text-3xl text-foreground mb-6">
            Ready to Experience the Best Cafe in Hyderabad?
          </h2>
          <Button variant="gold" size="lg" asChild>
            <Link to="/booking">Reserve Your Table <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Offers;
