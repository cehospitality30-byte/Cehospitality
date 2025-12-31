import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, Calendar, MapPin, ArrowRight } from "lucide-react";

interface CTASectionProps {
  variant: "homepage" | "cafe" | "lounge";
  className?: string;
}

const ctaContent = {
  homepage: {
    headline: "Your Perfect Hangout Awaits",
    description: "Whether it's a cozy coffee date, a fun evening with friends, or a family celebration — we've got your spot ready.",
    primaryText: "Book Your Table",
    primaryLink: "/booking",
    primaryIcon: Calendar,
    secondaryText: "Call Us Now",
    secondaryLink: "tel:+919876543210",
    secondaryIcon: Phone,
    bgClass: "bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10",
  },
  cafe: {
    headline: "Start Your Day Right",
    description: "Freshly brewed coffee, delicious bites & a cozy corner waiting just for you. Walk in anytime!",
    primaryText: "View Our Menu",
    primaryLink: "/menu",
    primaryIcon: ArrowRight,
    secondaryText: "Get Directions",
    secondaryLink: "https://maps.google.com/?q=Banjara+Hills+Hyderabad",
    secondaryIcon: MapPin,
    bgClass: "bg-gradient-to-r from-amber-900/20 via-background to-amber-800/10",
  },
  lounge: {
    headline: "Evenings Made Special",
    description: "Unwind in style with signature mocktails, live vibes & the perfect ambiance for memorable nights.",
    primaryText: "Reserve Your Spot",
    primaryLink: "/booking",
    primaryIcon: Calendar,
    secondaryText: "Explore Offers",
    secondaryLink: "/offers",
    secondaryIcon: ArrowRight,
    bgClass: "bg-gradient-to-br from-purple-900/20 via-background to-indigo-900/10",
  },
};

const CTASection = ({ variant, className = "" }: CTASectionProps) => {
  const content = ctaContent[variant];
  const PrimaryIcon = content.primaryIcon;
  const SecondaryIcon = content.secondaryIcon;

  const isExternalLink = content.secondaryLink.startsWith("http") || content.secondaryLink.startsWith("tel:");

  return (
    <section 
      className={`relative py-16 md:py-20 px-4 overflow-hidden ${content.bgClass} ${className}`}
      aria-label={`${variant} call to action`}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {content.headline}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            {content.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              asChild 
              size="lg" 
              className="group min-w-[200px] text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link to={content.primaryLink}>
                <PrimaryIcon className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                {content.primaryText}
              </Link>
            </Button>

            {isExternalLink ? (
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="group min-w-[200px] text-base font-semibold border-2 hover:bg-primary/5 transition-all duration-300"
              >
                <a href={content.secondaryLink} target={content.secondaryLink.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  <SecondaryIcon className="mr-2 h-5 w-5" />
                  {content.secondaryText}
                </a>
              </Button>
            ) : (
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="group min-w-[200px] text-base font-semibold border-2 hover:bg-primary/5 transition-all duration-300"
              >
                <Link to={content.secondaryLink}>
                  <SecondaryIcon className="mr-2 h-5 w-5" />
                  {content.secondaryText}
                </Link>
              </Button>
            )}
          </div>

          {/* Trust indicator */}
          <p className="text-sm text-muted-foreground pt-2">
            ⭐ Rated 4.8/5 by 500+ happy guests in Hyderabad
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
