import type { Metadata } from "next"
import HomeClient from "@/components/HomeClient"

const SITE_NAME = "Digital Universe Agency"
const SITE_URL = "https://digitaluniverse.agency"
const OG_IMAGE = "/og-image.jpg"

export const metadata: Metadata = {
  title: "Digital Universe | #1 Web Design & Digital Marketing Agency in Dubai UAE",
  description:
    "Dubai's top-rated digital agency for web design, SEO, social media marketing, logo design, and e-commerce development. Serving UAE businesses with proven results. Get a free consultation — call +971524341819 today!",

  keywords: [
    // High-intent Dubai & UAE location keywords
    "web design company Dubai",
    "digital marketing agency Dubai",
    "SEO agency Dubai",
    "web development company UAE",
    "best digital agency Dubai 2026",
    "website design Dubai affordable",
    "digital marketing company UAE",
    "top web design agency Dubai",
    "professional website development Dubai",
    "SEO services Dubai",
    // Service-specific high-value keywords
    "e-commerce website development Dubai",
    "logo design Dubai",
    "social media marketing Dubai",
    "Google Ads agency Dubai",
    "Facebook Ads agency UAE",
    "UI UX design agency Dubai",
    "mobile app development Dubai",
    "Shopify store setup Dubai",
    "video editing services Dubai",
    "branding agency Dubai",
    // Long-tail high-converting keywords
    "hire web developer in Dubai",
    "affordable SEO services UAE",
    "best SEO company in Dubai",
    "digital marketing for small business Dubai",
    "custom website design Dubai",
    "web design agency near me Dubai",
    "WordPress website development Dubai",
    "e-commerce SEO Dubai",
    "Instagram marketing agency Dubai",
    "TikTok ads agency UAE",
    // Trust & conversion keywords
    "award winning web agency Dubai",
    "website redesign Dubai",
    "digital transformation Dubai",
    "online business setup UAE",
    "lead generation Dubai",
    "conversion rate optimization UAE",
    "Google Business Profile setup Dubai",
    "WhatsApp marketing UAE",
    "content marketing Dubai",
    "email marketing agency UAE",
  ],

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Digital Universe | Dubai's #1 Web Design & Digital Marketing Agency",
    description:
      "Trusted by 100+ businesses across the UAE. We deliver custom websites, SEO, social media marketing, logo design, and e-commerce solutions that drive real growth. Free consultation — +971524341819.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Digital Universe Agency Dubai — Premium Web Design & Digital Marketing",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Digital Universe | Dubai's Best Web Design & Digital Marketing Agency",
    description:
      "Dubai's top-rated digital agency. Custom websites, SEO, social media ads, branding & e-commerce — all built to grow your business in the UAE and beyond.",
    images: [OG_IMAGE],
    creator: "@digitaluniverse",
    site: "@digitaluniverse",
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

  other: {
    "theme-color": "#070e1a",
    "color-scheme": "dark",
    "geo.region": "AE-DU",
    "geo.placename": "Dubai",
    "geo.position": "25.2048;55.2708",
    "ICBM": "25.2048, 55.2708",
  },
}

export default function Page() {
  return <HomeClient />
}
