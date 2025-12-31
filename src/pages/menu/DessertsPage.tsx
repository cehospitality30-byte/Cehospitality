import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Section, SectionHeader } from '@/components/Section';
import { MenuItemCard } from '@/components/Cards';
import dessert from '@/assets/dessert.jpg';

const dessertItems = [
  { id: 1, name: 'Tiramisu Royale', description: 'Classic Italian with espresso-soaked ladyfingers.', price: '$12.00', image: dessert },
  { id: 2, name: 'Chocolate Fondant', description: 'Warm chocolate cake with molten center.', price: '$14.00', image: dessert },
  { id: 3, name: 'Crème Brûlée', description: 'Vanilla custard with caramelized sugar top.', price: '$11.00', image: dessert },
  { id: 4, name: 'Panna Cotta', description: 'Italian cream dessert with berry compote.', price: '$10.00', image: dessert },
  { id: 5, name: 'Lemon Tart', description: 'Tangy lemon curd in buttery pastry.', price: '$11.00', image: dessert },
  { id: 6, name: 'Cheesecake New York', description: 'Rich and creamy classic cheesecake.', price: '$12.00', image: dessert },
  { id: 7, name: 'Gelato Selection', description: 'Three scoops of artisan Italian gelato.', price: '$9.00', image: dessert },
  { id: 8, name: 'Seasonal Fruit Tart', description: 'Fresh fruits on vanilla pastry cream.', price: '$13.00', image: dessert },
];

const DessertsPage = () => {
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
            <span className="text-gradient-gold">Desserts</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            Indulge in our heavenly selection of handcrafted 
            desserts and sweet creations.
          </p>
        </div>
      </section>

      {/* Menu Items */}
      <Section>
        <SectionHeader 
          label="Sweet Endings"
          title="Dessert Collection"
          description="The perfect finale to your dining experience."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dessertItems.map((item, index) => (
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
                category="Desserts"
              />
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default DessertsPage;
