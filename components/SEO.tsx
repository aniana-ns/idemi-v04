import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOData } from '../types';
import { CONTACT_INFO, SITE_METADATA } from '../constants';

interface SEOProps {
  seo: SEOData;
  path: string;
}

const SEO: React.FC<SEOProps> = ({ seo, path }) => {
  const siteName = SITE_METADATA.name;
  const baseUrl = "https://idemi.org";
  const currentUrl = `${baseUrl}${path}`;
  const defaultImage = "https://idemi.org/assets/TechTransfer/logo1.png";
  const ogImage = seo.image || defaultImage;

  // Standardize keywords
  const combinedKeywords = Array.from(new Set([
      ...(seo.keywords || []),
      ...SITE_METADATA.defaultKeywords
  ]));

  // Generate Breadcrumbs Schema
  const generateBreadcrumbs = () => {
    const segments = path.split('/').filter(Boolean);
    const breadcrumbs = segments.map((segment, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      "item": `${baseUrl}/${segments.slice(0, index + 1).join('/')}`
    }));

    // Add Home
    breadcrumbs.unshift({
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((b, i) => ({...b, position: i + 1}))
    };
  };

  // Generate Main Schema based on Type
  const generateMainSchema = () => {
    const baseContext = { "@context": "https://schema.org" };

    const organizationSchema = {
      "@type": "GovernmentOrganization",
      "name": SITE_METADATA.officialName,
      "alternateName": [SITE_METADATA.name, "MSME Technology Centre Mumbai"],
      "url": baseUrl,
      "logo": defaultImage,
      "image": defaultImage,
      "parentOrganization": {
        "@type": "GovernmentOrganization",
        "name": SITE_METADATA.parentMinistry
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": CONTACT_INFO.phone,
        "contactType": "customer service",
        "email": CONTACT_INFO.email,
        "areaServed": "IN",
        "availableLanguage": ["en", "hi", "mr"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": CONTACT_INFO.address,
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400022",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": CONTACT_INFO.latitude,
        "longitude": CONTACT_INFO.longitude
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:30",
        "closes": "17:30"
      },
      "sameAs": [
        "https://www.facebook.com/IDEMIMumbai/",
        "https://twitter.com/idemimumbai",
        "https://www.linkedin.com/company/idemi-mumbai",
        "https://www.instagram.com/idemi_mumbai/"
      ]
    };

    if (seo.schemaType === 'Organization' || seo.schemaType === 'WebSite' || path === '/') {
      return { 
        ...baseContext, 
        ...organizationSchema
      };
    }

    if (seo.schemaType === 'LocalBusiness') {
       return {
         ...baseContext,
         ...organizationSchema,
         "@type": "LocalBusiness",
         "priceRange": "₹₹"
       };
    }

    if (seo.schemaType === 'Service') {
      return {
        ...baseContext,
        "@type": "GovernmentService",
        "name": seo.title,
        "description": seo.description,
        "provider": organizationSchema,
        "serviceType": "Technical Calibration, Testing & Training",
        "areaServed": {
            "@type": "Country",
            "name": "India"
        },
        "url": currentUrl,
        "image": ogImage
      };
    }

    if (seo.schemaType === 'Course') {
      return {
        ...baseContext,
        "@type": "Course",
        "name": seo.title,
        "description": seo.description,
        "provider": organizationSchema,
        "educationalCredentialAwarded": "Diploma/Certificate",
        "url": currentUrl,
        "image": ogImage,
        "offers": {
          "@type": "Offer",
          "category": "Educational Training"
        }
      };
    }

    if (seo.schemaType === 'Article') {
        return {
            ...baseContext,
            "@type": "Article",
            "headline": seo.title,
            "image": [ogImage],
            "author": {
                "@type": "Organization",
                "name": siteName
            },
            "publisher": organizationSchema,
            "datePublished": new Date().toISOString(),
            "description": seo.description
        };
    }

    // Default WebPage
    return {
      ...baseContext,
      "@type": "WebPage",
      "name": seo.title,
      "description": seo.description,
      "url": currentUrl,
      "publisher": organizationSchema
    };
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={combinedKeywords.join(", ")} />
      <link rel="canonical" href={currentUrl} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={seo.schemaType === 'Article' ? 'article' : 'website'} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={seo.title} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@idemimumbai" />
      <meta name="twitter:creator" content="@idemimumbai" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={seo.title} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateMainSchema())}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(generateBreadcrumbs())}
      </script>
    </Helmet>
  );
};

export default SEO;