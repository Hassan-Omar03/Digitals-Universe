import type { Metadata } from "next"
import HomeClient from "@/components/HomeClient"

const SITE_NAME = "Digital Universe Agency"
const SITE_URL = "https://digitaluniverse.agency"
const OG_IMAGE = "/og-image.jpg"

export const metadata: Metadata = {
  title: `${SITE_NAME} | Web Development, SEO & Digital Marketing Agency`,
  description:
    "Transform your business with premium web development, custom software, branding, UI/UX design, SEO services, and digital marketing solutions. Trusted by startups to enterprises worldwide. Get a free consultation today!",

  keywords: [
    "best digital agency 2026",
    "top web development company",
    "custom software development services",
    "professional branding agency",
    "expert seo services",
    "digital marketing agency worldwide",
    "affordable web design",
    "e-commerce development",
    "mobile app development",
    "UI UX design services",
    "conversion optimization",
    "social media marketing",
    "hire web developers",
    "premium digital solutions",
  ],

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Award-Winning Web Development & Digital Marketing`,
    description:
      "Your trusted partner for web development, branding, SEO, and digital marketing. We help businesses grow online with custom solutions, proven results, and exceptional service. 500+ satisfied clients worldwide.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Premium Digital Solutions for Your Business`,
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Professional Web Development & Digital Marketing`,
    description:
      "Award-winning digital agency offering web development, branding, SEO, and marketing services. Transform your online presence with our expert team.",
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
  },
}

export default function Page() {
  return <HomeClient />
}
