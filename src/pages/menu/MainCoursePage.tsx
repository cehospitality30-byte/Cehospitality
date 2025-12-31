import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Section, SectionHeader } from '@/components/Section';
import { MenuItemCard } from '@/components/Cards';
import chefSpecial from '@/assets/chef-special.jpg';

const mainCourseItems = [
  { id: 1, name: 'Grilled Salmon', description: 'Atlantic salmon with lemon butter sauce.', price: '$28.00', image: chefSpecial },
  { id: 2, name: 'Lamb Rack', description: 'Herb-crusted lamb with mint jus.', price: '$34.00', image: chefSpecial },
  { id: 3, name: 'Mushroom Risotto', description: 'Creamy arborio rice with wild mushrooms.', price: '$22.00', image: chefSpecial },
  { id: 4, name: 'Duck Confit', description: 'Slow-cooked duck leg with cherry reduction.', price: '$30.00', image: chefSpecial },
  { id: 5, name: 'Pan-Seared Sea Bass', description: 'Mediterranean style with olive tapenade.', price: '$32.00', image: chefSpecial },
  { id: 6, name: 'Filet Mignon', description: 'Prime beef tenderloin with peppercorn sauce.', price: '$38.00', image: chefSpecial },
  { id: 7, name: 'Chicken Supreme', description: 'Free-range chicken with truffle mash.', price: '$26.00', image: chefSpecial },
  { id: 8, name: 'Vegetable Wellington', description: 'Seasonal vegetables in golden pastry.', price: '$24.00', image: chefSpecial },
];

const MainCoursePage = () => {
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
            <span className="text-gradient-gold">Main Course</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            Exquisite main dishes crafted with premium ingredients 
            and culinary expertise.
          </p>
        </div>
      </section>

      {/* Menu Items */}
      <Section>
        <SectionHeader 
          label="Signature Dishes"
          title="Main Courses"
          description="The heart of your dining experience, prepared to perfection."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainCourseItems.map((item, index) => (
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
                category="Main Course"
              />
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default MainCoursePage;
