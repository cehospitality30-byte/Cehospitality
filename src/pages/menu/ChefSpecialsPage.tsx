import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Section, SectionHeader } from '@/components/Section';
import { MenuItemCard } from '@/components/Cards';
import chefSpecial from '@/assets/chef-special.jpg';

const chefSpecialItems = [
  { id: 1, name: 'Beef Tenderloin', description: 'Premium steak with red wine reduction.', price: '$38.00', image: chefSpecial },
  { id: 2, name: 'Lobster Thermidor', description: 'Classic French preparation with brandy cream.', price: '$48.00', image: chefSpecial },
  { id: 3, name: 'Wagyu Burger', description: 'A5 Wagyu patty with truffle mayo.', price: '$32.00', image: chefSpecial },
  { id: 4, name: 'Seafood Tower', description: 'Fresh oysters, prawns, and crab.', price: '$65.00', image: chefSpecial },
  { id: 5, name: 'Truffle Pasta', description: 'Handmade tagliatelle with black truffle.', price: '$36.00', image: chefSpecial },
  { id: 6, name: 'Rack of Venison', description: 'Game meat with juniper berry sauce.', price: '$42.00', image: chefSpecial },
  { id: 7, name: 'Whole Roasted Seabream', description: 'Mediterranean style with herbs.', price: '$40.00', image: chefSpecial },
  { id: 8, name: 'Tasting Menu', description: "Seven courses of chef's finest creations.", price: '$120.00', image: chefSpecial },
];

const ChefSpecialsPage = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navigation />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-card">
        <div className="container mx-auto px-6 text-center">
          <span className="text-primary font-accent text-xl italic mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Our Menu
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            Chef <span className="text-gradient-gold">Specials</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            Exclusive creations from our culinary director, 
            showcasing exceptional ingredients and techniques.
          </p>
        </div>
      </section>

      {/* Menu Items */}
      <Section>
        <SectionHeader 
          label="Culinary Excellence"
          title="Signature Creations"
          description="Our chef's most celebrated dishes, prepared with passion."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chefSpecialItems.map((item, index) => (
            <div 
              key={item.id}
              className="opacity-0 animate-fade-up"
              style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <MenuItemCard 
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                category="Chef Special"
              />
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default ChefSpecialsPage;
