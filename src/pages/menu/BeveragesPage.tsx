import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Section, SectionHeader } from '@/components/Section';
import { MenuItemCard } from '@/components/Cards';
import mocktail from '@/assets/mocktail.jpg';

const beverageItems = [
  { id: 1, name: 'Sunset Spritzer', description: 'Citrus, passion fruit, and sparkling soda.', price: '$8.00', image: mocktail },
  { id: 2, name: 'Berry Bliss', description: 'Mixed berries blended with mint and lime.', price: '$7.50', image: mocktail },
  { id: 3, name: 'Tropical Paradise', description: 'Mango, pineapple, and coconut cream.', price: '$8.50', image: mocktail },
  { id: 4, name: 'Ginger Fizz', description: 'Fresh ginger, lemon, and sparkling water.', price: '$6.50', image: mocktail },
  { id: 5, name: 'Lavender Lemonade', description: 'Delicate lavender infused with fresh citrus.', price: '$7.00', image: mocktail },
  { id: 6, name: 'Cucumber Mint Cooler', description: 'Refreshing blend of cucumber and fresh mint.', price: '$6.50', image: mocktail },
  { id: 7, name: 'Rose Water Refresher', description: 'Elegant rose essence with a hint of lime.', price: '$7.50', image: mocktail },
  { id: 8, name: 'Hibiscus Iced Tea', description: 'Naturally sweet hibiscus with subtle floral notes.', price: '$6.00', image: mocktail },
];

const BeveragesPage = () => {
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
            <span className="text-gradient-gold">Beverages</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            Refreshing mocktails, fresh juices, and artisan beverages 
            crafted with premium ingredients.
          </p>
        </div>
      </section>

      {/* Menu Items */}
      <Section>
        <SectionHeader 
          label="Refreshing Drinks"
          title="Signature Mocktails"
          description="Alcohol-free creations that delight the senses."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {beverageItems.map((item, index) => (
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
                category="Beverages"
              />
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default BeveragesPage;
