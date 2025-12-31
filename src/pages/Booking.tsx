import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { BookingForm } from '@/components/BookingForm';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import SEO from '@/components/SEO';

// Booking Schema
const bookingSchema = {
  "@context": "https://schema.org",
  "@type": "ReservationAction",
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": "https://cozmocafe.com/booking",
    "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
  },
  "object": {
    "@type": "FoodEstablishment",
    "name": "Cozmo Cafe Bistro Lounge",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd floor, KPHB 4th phase near LODHA BELLAZA ROAD",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500072",
      "addressCountry": "IN"
    },
    "telephone": "+91-9703266969",
    "acceptsReservations": true
  }
};

const Booking = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Book a Table | Cozmo Cafe Bistro Lounge Hyderabad - Online Reservations"
        description="Book your table at Cozmo Cafe Bistro Lounge Hyderabad online. Reserve for romantic dinners, birthday parties, corporate events & family gatherings. Best table booking in Banjara Hills."
        keywords="book table Hyderabad, restaurant reservation, cafe booking online, table booking Banjara Hills, reserve table for dinner, party booking Hyderabad, event reservation cafe"
        canonicalUrl="https://cozmocafe.com/booking"
        structuredData={bookingSchema}
      />
      
      <Navigation />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-card">
        <div className="container mx-auto px-6 text-center">
          <span className="text-primary font-accent text-xl italic mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Reservations in Hyderabad
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            Book Your <span className="text-gradient-gold">Table</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            Reserve your spot for an unforgettable dining experience at Cozmo Cafe Bistro Lounge Hyderabad.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl text-foreground mb-6">Make a Reservation in Hyderabad</h2>
            <p className="text-muted-foreground mb-8">
              Fill out the form below and our team will confirm your booking within 24 hours. 
              For immediate assistance or same-day reservations, please call us directly.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl">
                <Phone className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-foreground">Call Us</h3>
                  <a href="tel:+919703266969" className="text-muted-foreground hover:text-primary transition-colors">
                    +91 9703266969
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl">
                <Mail className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-foreground">Email Us</h3>
                  <a href="mailto:sam@cehospitalitygroup.com" className="text-muted-foreground hover:text-primary transition-colors">
                    sam@cehospitalitygroup.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl">
                <Clock className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-foreground">Opening Hours</h3>
                  <p className="text-muted-foreground">Daily: 9:00 AM – 4:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-foreground">Location</h3>
                  <address className="text-muted-foreground not-italic">
                    COZMO CAFE BISTRO AND LOUNGE<br />
                    2nd floor, KPHB 4th phase near LODHA BELLAZA ROAD<br />
                    Hyderabad, Telangana 500072
                  </address>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-8">
            <BookingForm />
          </div>
        </div>
      </Section>

      {/* Important Notes */}
      <Section dark>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl text-foreground mb-6">Reservation Policy - Hyderabad</h2>
          <div className="text-muted-foreground space-y-4">
            <p>
              • Reservations are held for 15 minutes past the booking time
            </p>
            <p>
              • For parties of 8 or more at our Banjara Hills location, please contact us directly
            </p>
            <p>
              • Special requests (birthday cakes, decorations) are subject to availability
            </p>
            <p>
              • Cancellations must be made at least 4 hours in advance
            </p>
            <p>
              • Weekend reservations are recommended for the best cafe experience in Hyderabad
            </p>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Booking;
