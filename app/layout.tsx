import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

/* =========================
   Site Constants
========================= */
const SITE_NAME = "Digital Universe Agency"
const SITE_URL = "https://digitaluniverse.agency"
const SITE_DESC =
  "Dubai's #1 digital agency for web design, SEO, Google Ads, social media marketing, logo design, and e-commerce. Trusted by 100+ UAE businesses. Call +971524341819 for a free consultation."

const OG_IMAGE = "/og-image.jpg"
const LOGO_URL = `${SITE_URL}/logo.png`
const BRAND_EMAIL = "hello@digitaluniverse.agency"
const BRAND_PHONE = "+971524341819"

/* =========================
   Fonts
========================= */

/* =========================
   Advanced Metadata
========================= */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: SITE_NAME,
  category: "Business",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  title: {
    default: "Digital Universe | #1 Web Design & Digital Marketing Agency Dubai UAE",
    template: `%s | Digital Universe Agency Dubai`,
  },

  description: SITE_DESC,

  keywords: [
    // Dubai & UAE Primary Location Keywords (highest priority)
    "web design company Dubai",
    "digital marketing agency Dubai",
    "web development company UAE",
    "SEO agency Dubai",
    "best digital agency Dubai",
    "website design Dubai",
    "digital agency UAE",
    "web design agency Dubai",
    "digital marketing UAE",
    "top web agency Dubai",

    // Dubai Service-Specific High-Intent
    "e-commerce website Dubai",
    "logo design Dubai",
    "social media marketing Dubai",
    "Google Ads agency Dubai",
    "Facebook Ads Dubai",
    "Instagram marketing Dubai",
    "TikTok ads UAE",
    "SEO services Dubai",
    "local SEO Dubai",
    "branding agency Dubai",
    "UI UX design Dubai",
    "Shopify store Dubai",
    "WordPress website Dubai",
    "video editing Dubai",
    "WhatsApp marketing Dubai",

    // Long-Tail High-Converting Dubai Keywords
    "hire web developer Dubai",
    "affordable website design Dubai",
    "cheap SEO services UAE",
    "best SEO company in Dubai",
    "digital marketing for restaurants Dubai",
    "real estate website Dubai",
    "salon website design Dubai",
    "construction company website Dubai",
    "e-commerce SEO Dubai",
    "Google Business Profile setup Dubai",
    "website redesign Dubai",
    "lead generation Dubai",
    "online store setup UAE",
    "digital business setup Dubai",

    // Global Agency Keywords
    "digital agency",
    "web development agency",
    "custom software development",
    "digital marketing agency",
    "branding agency",
    "ui ux design agency",
    "seo services",
    "mobile app development",
    "conversion rate optimization",
    "social media marketing agency",
    "google ads management",
    "shopify development agency",
    "professional website design",
    "affordable web development",

    SITE_NAME,
    "Digital Universe Agency Dubai",
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Digital Universe | Dubai's #1 Web Design & Digital Marketing Agency",
    description: SITE_DESC,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Digital Universe Agency Dubai — Web Design, SEO & Digital Marketing UAE",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Digital Universe | Best Web Design & Digital Marketing Agency Dubai",
    description: SITE_DESC,
    images: [OG_IMAGE],
    creator: "@digitaluniverse",
    site: "@digitaluniverse",
  },

  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: ["/logo.png"],
    apple: [{ url: "/logo.png", sizes: "666x375", type: "image/png" }],
  },

  manifest: "/site.webmanifest",
  other: {
    "theme-color": "#070e1a",
    "color-scheme": "dark",
    "geo.region": "AE-DU",
    "geo.placename": "Dubai",
    "geo.position": "25.2048;55.2708",
    "ICBM": "25.2048, 55.2708",
    "business:contact_data:email": BRAND_EMAIL,
    "business:contact_data:phone_number": BRAND_PHONE,
    "business:contact_data:locality": "Dubai",
    "business:contact_data:country_name": "United Arab Emirates",
  },
}

/* =========================
   JSON-LD Structured Data (Multi-Schema)
========================= */
function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    alternateName: ["Digital Universe", "Digital Universe Dubai", "DU Agency"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    description: "Digital Universe Agency is Dubai's leading digital agency offering web design, SEO, Google Ads, social media marketing, branding, and e-commerce development for businesses across the UAE and worldwide.",
    email: BRAND_EMAIL,
    telephone: BRAND_PHONE,
    foundingDate: "2020",
    numberOfEmployees: { "@type": "QuantitativeValue", value: "10" },
    areaServed: [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "City", name: "Dubai" },
      { "@type": "City", name: "Abu Dhabi" },
      { "@type": "City", name: "Sharjah" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      "Worldwide",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    sameAs: [
      "https://www.facebook.com/digitaluniverseagency",
      "https://twitter.com/digitaluniverse",
      "https://www.linkedin.com/company/digitaluniverseagency",
      "https://www.instagram.com/digitaluniverseagency",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        email: BRAND_EMAIL,
        telephone: BRAND_PHONE,
        availableLanguage: ["English", "Arabic"],
        contactOption: "TollFree",
        areaServed: "AE",
      },
      {
        "@type": "ContactPoint",
        contactType: "Sales",
        telephone: BRAND_PHONE,
        availableLanguage: ["English"],
        areaServed: "Worldwide",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    knowsAbout: [
      "Web Design Dubai",
      "SEO Dubai",
      "Digital Marketing UAE",
      "Social Media Marketing",
      "Google Ads",
      "E-commerce Development",
      "Shopify",
      "Branding",
      "UI UX Design",
      "Logo Design",
    ],
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}#local-business`,
    name: SITE_NAME,
    image: `${SITE_URL}${OG_IMAGE}`,
    logo: LOGO_URL,
    url: SITE_URL,
    telephone: BRAND_PHONE,
    email: BRAND_EMAIL,
    priceRange: "$$",
    currenciesAccepted: "AED, USD",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dubai",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "25.2048",
      longitude: "55.2708",
    },
    hasMap: "https://maps.google.com/?q=Dubai,UAE",
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "City", name: "Abu Dhabi" },
      { "@type": "City", name: "Sharjah" },
      { "@type": "City", name: "Ajman" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services Dubai",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design Dubai", description: "Professional website design and development for businesses in Dubai and the UAE." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Services Dubai", description: "Expert search engine optimization to rank your Dubai business on Google page 1." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Ads Management Dubai", description: "ROI-focused Google Ads campaigns for UAE businesses." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Marketing Dubai", description: "Facebook, Instagram, and TikTok marketing for Dubai brands." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Logo Design Dubai", description: "Professional logo and brand identity design for Dubai businesses." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-commerce Development Dubai", description: "Shopify and custom e-commerce store setup and marketing in the UAE." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Video Editing Dubai", description: "Professional video editing, Reels, and short-form content for UAE brands." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Business Profile Dubai", description: "Google Maps listing optimization and local SEO for Dubai businesses." } },
      ],
    },
    sameAs: organizationSchema.sameAs,
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESC,
    publisher: {
      "@id": `${SITE_URL}#organization`,
    },
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Digital Agency Services",
    provider: {
      "@id": `${SITE_URL}#organization`,
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description: "Custom website and web application development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Branding & Design",
            description: "Complete brand identity and UI/UX design services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO & Digital Marketing",
            description: "Search engine optimization and digital marketing solutions",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Social Media Marketing",
            description: "Social media management and advertising services",
          },
        },
      ],
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What digital services does Digital Universe Agency offer in Dubai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Digital Universe Agency in Dubai offers a full suite of digital services including custom website design and development, SEO (search engine optimization), Google Ads, Facebook and Instagram Ads, TikTok Ads, social media marketing, logo and branding design, UI/UX design, Shopify store setup, video editing, WhatsApp Business setup, Google Business Profile optimization, and complete digital business setup for startups and SMEs across the UAE.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a website cost in Dubai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Website design and development costs in Dubai vary based on scope. A professional business website typically starts from AED 1,500–3,000, while e-commerce websites and custom web applications range higher. Digital Universe Agency offers affordable packages tailored to startups, small businesses, and enterprises in the UAE. Contact us on WhatsApp at +971524341819 for a free quote.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer SEO services in Dubai and the UAE?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Digital Universe Agency provides expert SEO services in Dubai and across the UAE. Our SEO packages include technical SEO audits, on-page and off-page optimization, local SEO for Google Maps and Google Business Profile, keyword research, content strategy, and monthly reporting. We help Dubai businesses rank on page 1 of Google within weeks.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly can you rank my website on Google in Dubai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "With our advanced SEO strategy, most local Dubai businesses start seeing ranking improvements within 2–4 weeks for local and long-tail keywords. Competitive keywords typically take 2–3 months. We combine technical SEO, Google Business Profile optimization, and high-quality content to accelerate rankings across the UAE.",
        },
      },
      {
        "@type": "Question",
        name: "Can you manage Google Ads and Facebook Ads for my Dubai business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Digital Universe Agency is a leading paid ads agency in Dubai. We set up, manage, and optimize Google Search Ads, Google Display Ads, Facebook Ads, Instagram Ads, and TikTok Ads campaigns. Our team handles audience targeting, ad creatives, conversion tracking, and reporting to maximize your return on ad spend (ROAS) in the UAE market.",
        },
      },
      {
        "@type": "Question",
        name: "Do you set up Shopify stores for Dubai and UAE businesses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer complete Shopify store setup in Dubai and the UAE. This includes theme customization, product catalog setup, payment gateway integration, shipping configuration, SEO optimization, and launch support. We also run Shopify marketing campaigns to drive traffic and sales for your e-commerce business.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact Digital Universe Agency in Dubai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can reach Digital Universe Agency in Dubai via WhatsApp at +971524341819, by email at hello@digitaluniverse.agency, or through the contact form on our website at digitaluniverse.agency. We are based in Dubai, UAE and serve clients across the UAE and globally.",
        },
      },
    ],
  }

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}#webpage`,
    url: SITE_URL,
    name: "Digital Universe | #1 Web Design & Digital Marketing Agency Dubai UAE",
    description: SITE_DESC,
    isPartOf: {
      "@id": `${SITE_URL}#website`,
    },
    about: {
      "@id": `${SITE_URL}#organization`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}${OG_IMAGE}`,
      width: 1200,
      height: 630,
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}

/* =========================
   Root Layout
========================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <html lang="en">
      
      <body
        className="
          min-h-screen
          text-white
          bg-[#070e1a]
          antialiased
        "
      >
        <JsonLd />

        <Navigation />
        <main className="overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
