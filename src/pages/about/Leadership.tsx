import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Section, SectionHeader } from '@/components/Section';
import { DirectorCard } from '@/components/Cards';
import heroLounge from '@/assets/hero-lounge.jpg';

const Leadership = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navigation />
      
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroLounge} 
            alt="Leadership"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        </div>
        <div className="relative container mx-auto px-6 pt-20">
          <span className="text-primary font-accent text-xl italic mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            About Us
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            Our <span className="text-gradient-gold">Leadership</span>
          </h1>
        </div>
      </section>

      {/* Leadership Team */}
      <Section>
        <SectionHeader 
          label="Meet The Team"
          title="Visionary Leaders"
          description="The experts driving C E Hospitality's success and innovation."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DirectorCard 
            name="Samuel Charles"
            role="Founder & CEO"
            description="With over 5 years in luxury hospitality, Alexander leads the group's strategic vision and expansion. His passion for excellence and guest experience drives every decision."
          />
          <DirectorCard 
            name="Padma Vijaya"
            role="Director of Operations"
            description="Padma ensures seamless operations across all venues. Her expertise in hospitality management guarantees consistent quality and service excellence."
          />
          <DirectorCard 
            name="Sidhaartha"
            role="Board of Director"
            description="An award-winning chef bringing innovative cuisine and exceptional dining experiences. Sidhaartha curates our menus with creativity and precision."
          />
          <DirectorCard 
            name="Vidya Sagar"
            role="Board of Director"
            description="Vidya shapes the visual identity and guest experience across all C E Hospitality brands, ensuring consistency and memorable impressions."
          />
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Leadership;
