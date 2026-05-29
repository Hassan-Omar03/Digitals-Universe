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
  "Digital Universe Agency builds fast websites, UI/UX, branding, SEO, paid ads, and digital growth systems for startups, local businesses, and enterprises worldwide."

const OG_IMAGE = "/og-image.jpg"
const LOGO_URL = `${SITE_URL}/digitals-universe-logo-v4-mark.png`
const BRAND_EMAIL = "hello@digitaluniverse.agency"
const BRAND_PHONE = "+971522740909"

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
    default: `${SITE_NAME} | Fast Websites, Branding, SEO & Digital Growth`,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESC,

  keywords: [
    // Primary High-Intent Keywords
    "digital agency",
    "web development agency",
    "software development services",
    "custom software development",
    "digital marketing agency",
    "branding agency",
    "ui ux design agency",
    "seo services",
    "premium digital solutions",

    // Long-Tail High-Converting Keywords
    "best digital agency for startups",
    "custom web development for small businesses",
    "affordable seo services for enterprises",
    "professional branding and web design",
    "global digital marketing solutions",
    "enterprise software development company",
    "web application development services",
    "mobile app development company",

    // Service-Specific Keywords
    "e-commerce website development",
    "responsive web design services",
    "social media marketing agency",
    "conversion rate optimization services",
    "full brand identity design",
    "technical seo audit and optimization",
    "local seo services",
    "content marketing strategy",
    "email marketing automation",
    "google ads campaign management",
    "facebook ads management",
    "instagram marketing services",

    // Technology & Platform Keywords
    "next.js development agency",
    "react development services",
    "wordpress development company",
    "shopify development agency",
    "custom cms development",
    "progressive web app development",

    // Industry-Specific Keywords
    "healthcare web development",
    "fintech app development",
    "real estate website solutions",
    "restaurant website development",
    "educational platform development",

    // Intent-Based Keywords
    "hire web developers",
    "professional website design",
    "affordable web development",
    "expert digital marketing",
    "trusted branding agency",
    "certified seo experts",

    // AI & Modern Tech Keywords
    "ai-powered web solutions",
    "chatbot integration services",
    "api development and integration",
    "cloud migration services",

    // Result-Oriented Keywords
    "increase website traffic",
    "improve conversion rates",
    "boost online presence",
    "grow business online",

    SITE_NAME,
    "Digital Universe Agency Dubai",
    "Dubai digital agency",
    "website development Dubai",
    "SEO agency Dubai",
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
    title: `${SITE_NAME} | Fast Websites, Branding, SEO & Digital Growth`,
    description: SITE_DESC,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Premium Digital Solutions`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Fast Websites, Branding, SEO & Digital Growth`,
    description: SITE_DESC,
    images: [OG_IMAGE],
    creator: "@digitaluniverse",
    site: "@digitaluniverse",
  },

  icons: {
    icon: [{ url: "/digitals-universe-logo-v4-mark.png", type: "image/png" }],
    shortcut: ["/digitals-universe-logo-v4-mark.png"],
    apple: [{ url: "/digitals-universe-logo-v4-mark.png", sizes: "512x512", type: "image/png" }],
  },

  manifest: "/site.webmanifest",
  other: {
    "theme-color": "#070e1a",
    "color-scheme": "dark",
    "geo.region": "AE-DU",
    "geo.placename": "Dubai",
    "business:contact_data:email": BRAND_EMAIL,
    "business:contact_data:phone_number": BRAND_PHONE,
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
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    description: SITE_DESC,
    email: BRAND_EMAIL,
    telephone: BRAND_PHONE,
    foundingDate: "2020",
    areaServed: "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    sameAs: [
      "https://www.facebook.com/digitaluniverseagency",
      "https://twitter.com/digitaluniverse",
      "https://www.linkedin.com/company/digitaluniverseagency",
      "https://www.instagram.com/digitaluniverseagency",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: BRAND_EMAIL,
      telephone: BRAND_PHONE,
      availableLanguage: ["English"],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
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
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "25.2048",
      longitude: "55.2708",
    },
    areaServed: [
      "Dubai",
      "United Arab Emirates",
      "United States",
      "United Kingdom",
      "Worldwide",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
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
        name: "What services does Digital Universe Agency offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer comprehensive digital services including web development, mobile app development, branding and UI/UX design, SEO services, social media marketing, digital marketing, and e-commerce solutions.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to develop a custom website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Custom website development typically takes 4-12 weeks depending on complexity, features, and requirements. We provide detailed timelines during the consultation phase.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer SEO services with web development?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all our websites are built with SEO best practices. We also offer comprehensive SEO packages including technical SEO audits, local SEO, content strategy, and ongoing optimization.",
        },
      },
      {
        "@type": "Question",
        name: "What is your pricing for digital marketing services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our pricing varies based on project scope and requirements. We offer flexible packages starting from affordable options for small businesses to enterprise solutions. Contact us for a custom quote.",
        },
      },
    ],
  }

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}#webpage`,
    url: SITE_URL,
    name: `${SITE_NAME} | Fast Websites, Branding, SEO & Digital Growth`,
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
