import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Section, SectionHeader } from '@/components/Section';
import { MenuItemCard } from '@/components/Cards';
import starters from '@/assets/starters.jpg';

const starterItems = [
  { id: 1, name: 'Truffle Arancini', description: 'Crispy risotto balls with truffle aioli.', price: '$14.00', image: starters },
  { id: 2, name: 'Bruschetta Trio', description: 'Classic tomato, mushroom, and olive tapenade.', price: '$12.00', image: starters },
  { id: 3, name: 'Prawn Tempura', description: 'Light battered prawns with sweet chili dip.', price: '$16.00', image: starters },
  { id: 4, name: 'Mezze Platter', description: 'Hummus, falafel, pita, and fresh vegetables.', price: '$18.00', image: starters },
  { id: 5, name: 'Beef Carpaccio', description: 'Thinly sliced beef with rocket and parmesan.', price: '$17.00', image: starters },
  { id: 6, name: 'Burrata Caprese', description: 'Creamy burrata with heirloom tomatoes.', price: '$15.00', image: starters },
  { id: 7, name: 'Calamari Fritti', description: 'Golden fried squid with lemon aioli.', price: '$14.00', image: starters },
  { id: 8, name: 'Soup of the Day', description: 'Chef\'s daily creation with artisan bread.', price: '$10.00', image: starters },
];

const StartersPage = () => {
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
            <span className="text-gradient-gold">Starters</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            Begin your culinary journey with our selection of 
            appetizers designed to awaken your palate.
          </p>
        </div>
      </section>

      {/* Menu Items */}
      <Section>
        <SectionHeader 
          label="First Course"
          title="Appetizer Selection"
          description="Perfectly portioned starters to begin your dining experience."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {starterItems.map((item, index) => (
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
                category="Starters"
              />
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default StartersPage;
