import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Section, SectionHeader } from '@/components/Section';
import { MenuItemCard } from '@/components/Cards';
import signatureCoffee from '@/assets/signature-coffee.jpg';

const coffeeItems = [
  { id: 1, name: 'Signature Espresso', description: 'Bold single-origin espresso with rich crema.', price: '$4.50', image: signatureCoffee },
  { id: 2, name: 'Artisan Latte', description: 'Velvety steamed milk with espresso and latte art.', price: '$6.50', image: signatureCoffee },
  { id: 3, name: 'Cappuccino Classico', description: 'Traditional Italian cappuccino with perfect foam.', price: '$5.50', image: signatureCoffee },
  { id: 4, name: 'Cold Brew Reserve', description: '24-hour cold-steeped coffee, smooth and bold.', price: '$6.00', image: signatureCoffee },
  { id: 5, name: 'Mocha Deluxe', description: 'Rich chocolate meets espresso perfection.', price: '$7.00', image: signatureCoffee },
  { id: 6, name: 'Flat White', description: 'Double ristretto with velvety microfoam.', price: '$5.50', image: signatureCoffee },
  { id: 7, name: 'Affogato', description: 'Espresso poured over vanilla gelato.', price: '$8.00', image: signatureCoffee },
  { id: 8, name: 'Turkish Coffee', description: 'Traditional preparation with cardamom.', price: '$5.00', image: signatureCoffee },
];

const CoffeePage = () => {
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
            <span className="text-gradient-gold">Coffee</span> Selection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            Expertly crafted coffee beverages using the finest single-origin beans, 
            roasted to perfection by our master baristas.
          </p>
        </div>
      </section>

      {/* Menu Items */}
      <Section>
        <SectionHeader 
          label="Artisan Brews"
          title="Coffee Craftsmanship"
          description="Each cup is a work of art, prepared with passion and precision."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coffeeItems.map((item, index) => (
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
                category="Coffee"
              />
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default CoffeePage;
