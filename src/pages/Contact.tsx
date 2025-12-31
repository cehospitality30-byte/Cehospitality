import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, Clock, MapPin, Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useCreateContact } from '@/hooks/useContacts';
import SEO from '@/components/SEO';
import { Loader2 } from 'lucide-react';

// Contact Page Schema
const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Cozmo Cafe Bistro Lounge Hyderabad",
  "description": "Get in touch with Cozmo Cafe Bistro Lounge for reservations, inquiries, and feedback. Located in Banjara Hills, Hyderabad.",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": "Cozmo Cafe Bistro Lounge",
    "telephone": "+91-9703266969",
    "email": "sam@cehospitalitygroup.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd floor, KPHB 4th phase near LODHA BELLAZA ROAD",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500072",
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Su 09:00-04:00"
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
  });

  const createContact = useCreateContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createContact.mutateAsync({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        phone: formData.phone || undefined,
        status: 'unread',
      });
      setFormData({ name: '', email: '', subject: '', message: '', phone: '' });
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Contact Us | Cozmo Cafe Bistro Lounge Hyderabad - Reservations & Inquiries"
        description="Contact Cozmo Cafe Bistro Lounge in Banjara Hills, Hyderabad. Call us for table reservations, event bookings, catering inquiries. Best cafe in Hyderabad. Open daily 8 AM - 11 PM."
        keywords="contact cafe Hyderabad, cafe phone number, restaurant booking Hyderabad, Banjara Hills cafe contact, cafe reservations Hyderabad, lounge inquiry"
        canonicalUrl="https://cozmocafe.com/contact"
        structuredData={contactSchema}
      />
      
      <Navigation />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-card">
        <div className="container mx-auto px-6 text-center">
          <span className="text-primary font-accent text-xl italic mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Get in Touch
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            Contact <span className="text-gradient-gold">Us</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            We'd love to hear from you. Reach out for reservations, inquiries, or feedback at our Hyderabad location.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-display text-3xl text-foreground mb-6">Visit Cozmo Cafe Hyderabad</h2>
            <p className="text-muted-foreground mb-8">
              Whether you have a question about our menu, want to book a table, organize a party, 
              or simply want to share your feedback, we're here to help at our Banjara Hills location.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Phone</h3>
                  <a href="tel:+919703266969" className="text-muted-foreground hover:text-primary transition-colors">
                    +91 9703266969
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Email</h3>
                  <a href="mailto:sam@cehospitalitygroup.com" className="text-muted-foreground hover:text-primary transition-colors">
                    sam@cehospitalitygroup.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Address</h3>
                  <address className="text-muted-foreground not-italic">
                    COZMO CAFE BISTRO AND LOUNGE<br />
                    2nd floor, KPHB 4th phase near LODHA BELLAZA ROAD<br />
                    Hyderabad, Telangana 500072
                  </address>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Hours</h3>
                  <p className="text-muted-foreground">
                    Daily: 9:00 AM – 4:00 AM
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/919703266969?text=Hi, I'd like to make a reservation at Cozmo Cafe Hyderabad"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              aria-label="Chat with Cozmo Cafe Hyderabad on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
          
          {/* Contact Form */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="font-display text-xl text-foreground mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                <Input 
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">Subject</label>
                <Input 
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Reservation, Inquiry, Feedback..."
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                <Textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows={5}
                  required
                  className="bg-background border-border focus:border-primary resize-none"
                />
              </div>
              <Button 
                type="submit" 
                variant="gold" 
                size="xl" 
                className="w-full"
                disabled={createContact.isPending}
              >
                {createContact.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </Section>

      {/* Map */}
      <section className="h-[400px] relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5!2d78.3996!3d17.4947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91f7a5e0e4a1%3A0x1234567890abcdef!2sKPHB%20Phase%204%2C%20Kukatpally%2C%20Hyderabad%2C%20Telangana%20500072!5e0!3m2!1sen!2sin!4v1704067200000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Cozmo Cafe Bistro Lounge Location - KPHB 4th Phase near Lodha Bellaza Road Hyderabad Map"
          className="grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* Nearby Landmarks */}
      <Section>
        <div className="text-center mb-10">
          <span className="text-primary font-accent text-lg italic mb-2 block">Easy to Find</span>
          <h2 className="font-display text-3xl text-foreground">Nearby Landmarks</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-card border border-border rounded-xl text-center hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-2">Lodha Bellaza</h3>
            <p className="text-muted-foreground text-sm">Right next to the building</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-xl text-center hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-2">KPHB Metro Station</h3>
            <p className="text-muted-foreground text-sm">5 minutes walk</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-xl text-center hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-2">JNTU</h3>
            <p className="text-muted-foreground text-sm">10 minutes drive</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-xl text-center hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-2">Kukatpally Y Junction</h3>
            <p className="text-muted-foreground text-sm">8 minutes drive</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <a 
            href="https://www.google.com/maps/dir//KPHB+Phase+4,+Kukatpally,+Hyderabad,+Telangana+500072"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <MapPin className="w-5 h-5" />
            Get Directions on Google Maps
          </a>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Contact;
