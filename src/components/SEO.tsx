import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
}

// Local SEO Keywords for Cozmo Cafe Bistro Lounge Hyderabad
export const LOCAL_SEO_KEYWORDS = {
  primary: [
    'best cafe in Hyderabad',
    'best lounge in Hyderabad',
    'cafe lounge Hyderabad',
    'premium cafe Hyderabad',
    'coffee shop Hyderabad',
  ],
  secondary: [
    'cafe near me',
    'lounge near me',
    'best coffee Hyderabad',
    'hangout places Hyderabad',
    'date night Hyderabad',
    'birthday party venue Hyderabad',
  ],
  longTail: [
    'best cafe for couples in Hyderabad',
    'family friendly cafe Hyderabad',
    'cafe with live music Hyderabad',
    'premium lounge for friends Hyderabad',
    'romantic restaurant Hyderabad',
    'best brunch place Hyderabad',
    'coffee shop with snacks Hyderabad',
  ],
  nearMe: [
    'cafe near me',
    'lounge near me',
    'coffee shop near me',
    'restaurant near me',
    'hangout place near me',
  ],
};

// Business Schema for Google Business Profile
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "name": "Cozmo Cafe Bistro Lounge",
  "alternateName": "Cozmo Cafe",
  "description": "Premium cafe & lounge in Hyderabad offering artisan coffee, gourmet food, beverages, mocktails, and a sophisticated lounge experience for youth, couples, friends & families.",
  "url": "https://cozmocafe.com",
  "telephone": "+91-XXXXXXXXXX",
  "email": "info@cozmocafe.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Road No. 12, Banjara Hills",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500034",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "17.4126",
    "longitude": "78.4071"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "23:00"
    }
  ],
  "priceRange": "₹₹-₹₹₹",
  "servesCuisine": ["Continental", "Italian", "Indian", "Cafe", "Beverages"],
  "hasMenu": "https://cozmocafe.com/menu",
  "acceptsReservations": true,
  "image": "https://cozmocafe.com/images/lounge.jpg",
  "sameAs": [
    "https://www.facebook.com/cozmocafe",
    "https://www.instagram.com/cozmocafe",
    "https://www.google.com/maps/place/cozmocafe"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "250"
  },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "WiFi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Parking", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Live Music", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Private Dining", "value": true }
  ]
};

// Restaurant Schema
export const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Cozmo Cafe Bistro Lounge",
  "description": "Premium dining, cafe & lounge in Hyderabad with gourmet cuisine, artisan coffee, and sophisticated ambiance.",
  "servesCuisine": ["Continental", "Italian", "Cafe Food", "Desserts"],
  "priceRange": "₹₹-₹₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Road No. 12, Banjara Hills",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500034",
    "addressCountry": "IN"
  },
  "openingHours": "Mo-Su 08:00-23:00",
  "telephone": "+91-XXXXXXXXXX",
  "acceptsReservations": true
};

export const SEO = ({ 
  title, 
  description, 
  keywords = LOCAL_SEO_KEYWORDS.primary.join(', '),
  canonicalUrl,
  ogImage = '/og-image.jpg',
  structuredData
}: SEOProps) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Cozmo Cafe Bistro Lounge" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN-TG" />
      <meta name="geo.placename" content="Hyderabad" />
      <meta name="geo.position" content="17.4126;78.4071" />
      <meta name="ICBM" content="17.4126, 78.4071" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="Cozmo Cafe Bistro Lounge" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
