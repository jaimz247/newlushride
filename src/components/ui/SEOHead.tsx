import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
}

export default function SEOHead({ title: customTitle, description: customDescription }: SEOHeadProps = {}) {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Map hashes to custom, high-impact SEO meta-data
  let title = customTitle || "LushRide | Lagos' Premier Executive Chauffeur & Luxury Car Hire";
  let description = customDescription || "Experience Lagos with LushRide. Absolute comfort, uncompromising privacy, and precision scheduling. Premium chauffeur services, executive airport transfers, and armored SUV rentals.";
  let url = "https://lushride.com/" + (window.location.pathname !== '/' ? window.location.pathname : currentHash);

  if (currentHash === '#about') {
    title = "About Our Elite Chauffeur Services | LushRide Lagos";
    description = "Learn about LushRide's history of excellence in Lagos, Nigeria. Our meticulous chauffeur vetting, 24/7 concierge assistance, and commitment to luxury transit.";
  } else if (currentHash === '#services') {
    title = "VIP Executive Chauffeur Services & Airport Protocols | LushRide";
    description = "Bespoke executive chauffeur-driven travel in Lagos, executive airport pick-ups, protocol services, and hourly rentals with premium SUVs.";
  } else if (currentHash === '#fleet') {
    title = "Luxury Fleet Rental Lagos - Lexus RX, Range Rover SE & Armored SUVs | LushRide";
    description = "Explore our fleet of meticulously detailed, late-model luxury SUVs. Featuring Range Rover Prestige, Lexus RX 350, and armored Toyota Land Cruiser Prado.";
  } else if (currentHash === '#hubs' || currentHash === '#coverage') {
    title = "Lagos Coverage & Luxury Regional Hubs - Ikoyi, VI, Lekki | LushRide";
    description = "Providing flawless, stress-free chauffeured transit across Lagos: Victoria Island corporate corridors, Ikoyi residential estates, Lekki Phase 1, and Ikeja GRA.";
  } else if (currentHash === '#partner') {
    title = "Join as Fleet Partner & Corporate Leasing Solutions | LushRide";
    description = "Monetize your luxury vehicle safely with Lagos' premier transit platform, or discover corporate lease packages with professional drivers.";
  } else if (currentHash === '#book' || currentHash === '#contact') {
    title = "Secure Instant Chauffeur Booking Lagos | LushRide";
    description = "Request a bespoke quote for VIP airport protocols, corporate charters, wedding car rentals, and B6 armored Land Cruiser Prado escorts in Nigeria.";
  }

  // Highly advanced, dynamic JSON-LD schema payload (specifically boosting "Armored Land Cruiser Rental")
  const armoredSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "B6 Armored Toyota Land Cruiser Prado Rental - LushRoyale",
    "image": [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80"
    ],
    "description": "LushRide B6-level Armored Toyota Land Cruiser Prado rental in Lagos. Military-grade runflat tires, ballistic steel plating, transparent armor glass, sirene system, and tactical escort options.",
    "brand": {
      "@type": "Brand",
      "name": "Toyota"
    },
    "category": "Armored Car Rental / Luxury Escort",
    "offers": {
      "@type": "Offer",
      "url": "https://lushride.com/#fleet",
      "priceCurrency": "NGN",
      "price": "450000",
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "LocalBusiness",
        "name": "LushRide Lagos",
        "telephone": "+234 703 740 4784",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ikoyi",
          "addressLocality": "Lagos",
          "addressRegion": "Lagos State",
          "addressCountry": "NG"
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "42"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LushRide Lagos",
    "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    "@id": "https://lushride.com/#localbusiness",
    "url": "https://lushride.com",
    "telephone": "+234 703 740 4784",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Lagos Executive Terminal, Ikoyi",
      "addressLocality": "Lagos",
      "addressRegion": "Lagos State",
      "postalCode": "100001",
      "addressCountry": "NG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.4549,
      "longitude": 3.4246
    },
    "areaServed": ["Ikoyi", "Victoria Island", "Lekki Phase 1", "Ikeja GRA", "Banana Island", "Lagos Airport Terminal"],
    "sameAs": [
      "https://www.instagram.com/lushrideng/",
      "https://twitter.com/lushride"
    ]
  };

  return (
    <Helmet>
      {/* Dynamic titles and meta tags for specific sections */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Dynamic OpenGraph / Facebook Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80" />

      {/* Schema.org JSON-LD Structured Data Injection */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(armoredSchema)}
      </script>
    </Helmet>
  );
}
