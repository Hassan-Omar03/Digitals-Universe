"use client"

import type { RefObject } from "react"
import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import Payment from "@/components/Payment"
import {
  ArrowRight,
  BarChart3,
  Bot,
  Briefcase,
  Calendar,
  Camera,
  ChevronRight,
  Code,
  Cpu,
  CreditCard,
  FileText,
  Gauge,
  Headphones,
  Image as ImageIcon,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  Mic,
  Package,
  PenTool,
  PhoneCall,
  PlayCircle,
  Rocket,
  Search,
  Share2,
  ShoppingCart,
  Sparkles,
  Smartphone,
  Star,
  Store,
  Target,
  Video,
  X,
} from "lucide-react"

const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false })

const Background3D = dynamic(() => import("./Background3D"), {
  ssr: false,
  loading: () => <StaticBackground />,
})

const phoneNumber = "+971522740909"
const greetingMessage =
  "Hi! I'm interested in your digital services. Could you please provide more information?"
const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(greetingMessage)}`

function StaticBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#070e1a]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,14,26,0.86),rgba(7,14,26,1)),linear-gradient(115deg,rgba(61,126,199,0.16),transparent_42%,rgba(139,190,240,0.08))]" />
    </div>
  )
}

const sparkleDots = [
  ["8%", "18%", "0s"],
  ["13%", "46%", "2.7s"],
  ["18%", "78%", "1.2s"],
  ["27%", "35%", "2.1s"],
  ["31%", "88%", "3.4s"],
  ["39%", "12%", "0.7s"],
  ["48%", "68%", "1.8s"],
  ["53%", "42%", "3.2s"],
  ["58%", "24%", "2.8s"],
  ["68%", "82%", "0.4s"],
  ["72%", "44%", "3.7s"],
  ["77%", "16%", "2.4s"],
  ["88%", "52%", "1.4s"],
  ["93%", "28%", "3s"],
] as const

function SparkleField({ className = "" }: { className?: string }) {
  return (
    <div className={`du-sparkle-field ${className}`} aria-hidden="true">
      {sparkleDots.map(([left, top, delay]) => (
        <span
          key={`${left}-${top}`}
          className="du-sparkle"
          style={{ left, top, animationDelay: delay }}
        />
      ))}
    </div>
  )
}

function HeroGlitterField() {
  return (
    <div className="du-hero-glitter-field relative min-h-[300px] overflow-hidden lg:min-h-[430px]" aria-hidden="true">
      <div className="pointer-events-none absolute left-[10%] top-[14%] h-32 w-32 rounded-full bg-[#5a9de0]/14 blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-[18%] h-44 w-44 rounded-full bg-[#37d0ae]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[10%] left-[24%] h-40 w-40 rounded-full bg-[#8bbef0]/12 blur-3xl" />
      <SparkleField className="opacity-95" />
    </div>
  )
}

const stats = [
  { value: "20+", label: "Projects Completed" },
  { value: "100+", label: "Happy Clients" },
  { value: "3+", label: "Years Experience" },
  { value: "98%", label: "Success Rate" },
]

const philosophyCards = [
  { image: "/hands2.png", title: "Meaningful Connections" },
  { image: "/mind.png", title: "Collective Expertise" },
  { image: "/partnership.png", title: "Long-term Partnerships" },
]

const missionPoints = [
  { label: "Empower Businesses" },
  { label: "Enhance Brand Visibility" },
  { label: "Create Lasting Impact" },
]

const serviceCategories = [
  {
    category: "Website Development",
    services: [
      {
        name: "Website Design (UI/UX)",
        icon: Layers,
        description: "Clean UI, user flows, and conversion-focused layouts.",
      },
      {
        name: "Business Website",
        icon: Briefcase,
        description: "Responsive company websites with clear messaging and SEO basics.",
      },
      {
        name: "E-commerce Website",
        icon: ShoppingCart,
        description: "Online stores with strong catalogs, checkout, and product flow.",
      },
      {
        name: "Booking Website",
        icon: Calendar,
        description: "Booking flows for services, appointments, events, and local teams.",
      },
      {
        name: "Speed Optimization",
        icon: Gauge,
        description: "Cleaner images, scripts, layouts, and Core Web Vitals.",
      },
    ],
  },
  {
    category: "Graphics Design",
    services: [
      {
        name: "Logo Design",
        icon: PenTool,
        description: "Modern marks, color direction, and reusable brand elements.",
      },
      {
        name: "Social Media Graphics",
        icon: Sparkles,
        description: "Platform-ready graphics for offers, launches, and campaigns.",
      },
      {
        name: "Photo Editing",
        icon: Camera,
        description: "Retouching, cleanup, color correction, and polished visuals.",
      },
    ],
  },
  {
    category: "Digital Marketing",
    services: [
      {
        name: "SEO",
        icon: Search,
        description: "Technical SEO, local SEO, keywords, and content structure.",
      },
      {
        name: "Social Media Marketing",
        icon: Share2,
        description: "Content planning, platform management, and reporting.",
      },
      {
        name: "Google Ads Setup",
        icon: BarChart3,
        description: "Search and display campaigns with tracking and goals.",
      },
      {
        name: "Google Business Profile",
        icon: Store,
        description: "Local profile setup, service details, images, and visibility.",
      },
      {
        name: "Google Map Location",
        icon: MapPin,
        description: "Accurate map listing, contact details, and directions.",
      },
      {
        name: "Facebook Ads",
        icon: Megaphone,
        description: "Meta campaigns for awareness, messages, leads, and sales.",
      },
      {
        name: "Instagram Ads",
        icon: ImageIcon,
        description: "Visual campaigns for Stories, Reels, feed, and retargeting.",
      },
      {
        name: "WhatsApp Business Setup",
        icon: MessageCircle,
        description: "Profile setup, catalog, quick replies, labels, and flows.",
      },
      {
        name: "TikTok Ads",
        icon: Video,
        description: "Short-form ad setup for discovery, engagement, and testing.",
      },
      {
        name: "LinkedIn Ads",
        icon: Linkedin,
        description: "B2B campaigns for leads, authority, and decision-makers.",
      },
      {
        name: "Email & Content Marketing",
        icon: Mail,
        description: "Newsletters, campaign copy, and nurture content.",
      },
      {
        name: "YouTube SEO",
        icon: PlayCircle,
        description: "Video metadata, keywords, titles, and discoverability.",
      },
      {
        name: "Shopify Marketing",
        icon: Package,
        description: "Store campaigns, product promotion, and growth planning.",
      },
      {
        name: "Shopify Store Setup",
        icon: ShoppingCart,
        description: "Theme, products, payments, shipping, and launch support.",
      },
      {
        name: "Lead Generation",
        icon: Target,
        description: "Landing pages, forms, and funnels for qualified leads.",
      },
    ],
  },
  {
    category: "Video Editing & 3D",
    services: [
      {
        name: "Video Editing",
        icon: Video,
        description: "Brand and social videos prepared for fast publishing.",
      },
      {
        name: "Short-form Content",
        icon: Smartphone,
        description: "Reels, Shorts, and TikToks with hooks and captions.",
      },
      {
        name: "3D Animation",
        icon: Cpu,
        description: "Product and explainer visuals with a technical edge.",
      },
    ],
  },
  {
    category: "Business & Consulting",
    services: [
      {
        name: "Digital Business Setup",
        icon: Rocket,
        description: "Website, profiles, tools, tracking, and launch assets.",
      },
      {
        name: "Online Strategy",
        icon: FileText,
        description: "A practical roadmap for website, marketing, and growth.",
      },
    ],
  },
  {
    category: "Music & Audio",
    services: [
      {
        name: "Audio Editing",
        icon: Headphones,
        description: "Noise cleanup, balancing, trimming, and mastering.",
      },
      {
        name: "Voice-over & Background Audio",
        icon: Mic,
        description: "Voice-over direction, music selection, and final polish.",
      },
    ],
  },
]

const processSteps = [
  {
    title: "Audit",
    text: "We review the offer, audience, site, and channels.",
  },
  {
    title: "Design",
    text: "We shape clean UI around fast decisions.",
  },
  {
    title: "Build",
    text: "We build for speed, mobile, and easy updates.",
  },
  {
    title: "Grow",
    text: "We launch, measure, and improve what converts.",
  },
]

const portfolio = [
  {
    title: "AB SMD Construction",
    category: "Construction Website",
    image: "/absmd.png",
    url: "https://absmd.us",
    description: "A polished construction website with clear services and trust signals.",
  },
  {
    title: "BIM Africa Quotation",
    category: "Business Web App",
    image: "/quotation.png",
    url: "https://quotation.bim.africa",
    description: "A quotation workflow for faster requests and smoother handling.",
  },
  {
    title: "BIM Africa Website",
    category: "Engineering Website",
    image: "/bim.png",
    url: "https://bim.africa",
    description: "A structured engineering site focused on services and credibility.",
  },
  {
    title: "Hawar Homes",
    category: "Real Estate",
    image: "/homes.png",
    url: "https://hawarhomes.com",
    description: "A premium property website for vacation homes and rental leads.",
  },
  {
    title: "Hoda Shine Services",
    category: "Cleaning Services",
    image: "/cleaning.png",
    url: "https://hodashineservices.com",
    description: "A service website shaped around trust, clarity, and leads.",
  },
  {
    title: "Asrar Salon & Spa",
    category: "Beauty Website",
    image: "/salon.png",
    url: "https://asrarsalon.com",
    description: "A polished salon website with mobile-friendly service browsing.",
  },
]

const testimonials = [
  {
    name: "Ahmed Al-Mansouri",
    role: "CEO, Dubai Properties",
    rating: 4.8,
    content:
      "The website is fast, polished, and easy for customers to use. Our enquiries improved quickly after launch.",
  },
  {
    name: "Fatima Rahman",
    role: "Founder, Bengal Fashion",
    rating: 4.7,
    content:
      "Their design and campaign work gave our brand a much stronger online presence and a clearer sales path.",
  },
  {
    name: "Dr. Sarah Williams",
    role: "Medical Director",
    rating: 4.9,
    content:
      "The booking flow made operations smoother for our team and simpler for patients. Very professional execution.",
  },
  {
    name: "Omar Hassan",
    role: "Restaurant Owner",
    rating: 4.6,
    content:
      "They gave us a sharper website, cleaner social presence, and a better route for customers to order and enquire.",
  },
  {
    name: "Jennifer Chen",
    role: "Startup Founder",
    rating: 4.8,
    content:
      "The brand visuals and product messaging helped us look more mature before launch. The process was clear throughout.",
  },
  {
    name: "Marcus Thompson",
    role: "Fitness Brand Owner",
    rating: 4.7,
    content:
      "The content strategy and website improvements made the brand easier to understand and easier to sell online.",
  },
]

export default function HomeClient() {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].category)
  const [isFabOpen, setIsFabOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [hasOpenedChat, setHasOpenedChat] = useState(false)
  const servicesScrollRef = useRef<HTMLDivElement>(null)
  const testimonialsScrollRef = useRef<HTMLDivElement>(null)

  const activeServices =
    serviceCategories.find((category) => category.category === activeCategory)?.services ?? []

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    const y = el.getBoundingClientRect().top + window.scrollY - 104
    window.scrollTo({ top: Math.max(y, 0), behavior: "auto" })
  }

  const scrollRail = (ref: RefObject<HTMLDivElement>, direction: "left" | "right") => {
    const el = ref.current
    if (!el) return

    el.scrollBy({
      left: direction === "left" ? -el.clientWidth : el.clientWidth,
      behavior: "auto",
    })
  }

  return (
    <div className="relative w-full bg-[#070e1a] text-neutral-200 selection:bg-[#3d7ec7]/30 selection:text-white">
      <Background3D />
      <SparkleField className="du-site-sprinkles" />

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {isFabOpen ? (
          <div className="flex flex-col gap-3">
            <a
              href={`tel:${phoneNumber}`}
              className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-[#0c1526] text-white shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-colors hover:bg-[#3d7ec7]"
              aria-label="Call Digital Universe"
            >
              <PhoneCall className="h-5 w-5" />
            </a>
            <button
              onClick={() => {
                setHasOpenedChat(true)
                setIsChatOpen(true)
                setIsFabOpen(false)
              }}
              className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-[#0c1526] text-white shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-colors hover:bg-[#3d7ec7]"
              aria-label="Open chat"
            >
              <Bot className="h-5 w-5" />
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-[#0c1526] text-white shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-colors hover:bg-[#3d7ec7]"
              aria-label="Message on WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        ) : null}

        <button
          onClick={() => setIsFabOpen((open) => !open)}
          className="grid h-14 w-14 place-items-center rounded-lg bg-[#3d7ec7] text-white shadow-[0_18px_48px_rgba(61,126,199,0.35)] transition-colors hover:bg-[#5a9de0]"
          aria-label="Open contact actions"
        >
          {isFabOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>

      {hasOpenedChat ? <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} /> : null}

      <div className="du-sections relative z-10 flex w-full flex-col">
        <section id="hero" className="relative flex min-h-[88vh] items-center overflow-hidden border-b border-white/10 bg-[#07111f]/85 px-4 pt-28 pb-12 md:pt-32 md:pb-16">
          <SparkleField />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[linear-gradient(180deg,rgba(90,157,224,0.16),transparent_78%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(61,126,199,0.12),transparent_38%,rgba(55,208,174,0.07))]" />
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              <div className="mb-5 inline-flex items-center justify-center gap-2 rounded-md border border-[#3d7ec7]/40 bg-[#3d7ec7]/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8bbef0]">
                <Cpu className="h-4 w-4" />
                Premium digital agency
              </div>
              <h1 className="mx-auto max-w-3xl text-3xl font-black leading-[1.08] text-white sm:text-4xl md:text-5xl lg:mx-0">
                Fast websites, clean brands, and digital growth that feels premium.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#b8c8d8] lg:mx-0">
                Digital Universe builds websites, UI/UX, SEO, ads, and brand assets that load quickly and convert clearly.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <button
                  onClick={() => scrollToSection("services")}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#3d7ec7] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#5a9de0]"
                >
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  Get Started Now
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-white/10 bg-[#0c1526]/75 px-3 py-4 shadow-[0_14px_40px_rgba(0,0,0,0.18)]">
                    <div className="text-xl font-black text-white">{stat.value}</div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <HeroGlitterField />
          </div>
        </section>

        <section id="about" className="du-blur-band relative scroll-mt-36 overflow-hidden px-4 py-14 md:py-16">
          <SparkleField className="opacity-60" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(90,157,224,0.14),transparent_46%)]" />
          <div className="mx-auto w-full max-w-6xl">
            <div className="text-center">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#8bbef0]/40 bg-white/[0.04] px-5 py-2.5 text-sm font-bold text-white/90 shadow-[0_0_30px_rgba(90,157,224,0.16)]">
                <Sparkles className="h-4 w-4 text-[#8bbef0]" />
                About Our Company
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                Welcome to <span className="text-[#5a9de0]">Digital Universe</span>
              </h2>
            </div>

            <div className="mt-11 grid gap-5 lg:grid-cols-[1.05fr_0.72fr_1fr]">
              <article className="relative rounded-lg border border-[#8bbef0]/40 bg-[#07111f]/75 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.3)]">
                <div className="absolute left-1/2 top-0 min-w-[min(230px,86vw)] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#8bbef0]/50 bg-[#07111f] px-5 py-1.5 text-center text-base font-black text-white shadow-[0_0_22px_rgba(90,157,224,0.2)] md:text-lg">
                  Our Core Philosophy
                </div>
                <div className="grid grid-cols-3 gap-5 pt-8">
                  {philosophyCards.map((item) => (
                    <div key={item.title} className="flex flex-col items-center text-center">
                      <div className="relative mb-4 h-20 w-20 sm:h-24 sm:w-24">
                        <Image src={item.image} alt={item.title} fill className="object-contain" sizes="96px" />
                      </div>
                      <h3 className="text-lg font-black leading-tight text-white">{item.title}</h3>
                    </div>
                  ))}
                </div>
              </article>

              <article className="relative rounded-lg border border-[#8bbef0]/40 bg-[#07111f]/75 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.3)]">
                <div className="absolute left-1/2 top-0 min-w-[min(150px,86vw)] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#8bbef0]/50 bg-[#07111f] px-5 py-1.5 text-center text-base font-black text-white shadow-[0_0_22px_rgba(90,157,224,0.2)] md:text-lg">
                  Our Mission
                </div>
                <div className="space-y-4 pt-9">
                  {missionPoints.map((item, index) => (
                    <div key={item.label} className="flex items-center gap-4 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
                      <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8bbef0]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-left text-base font-black text-white">{item.label}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="relative rounded-lg border border-[#8bbef0]/40 bg-[#07111f]/75 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.3)]">
                <div className="absolute left-1/2 top-0 min-w-[min(360px,92vw)] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#8bbef0]/50 bg-[#07111f] px-5 py-1.5 text-center text-sm font-black text-white shadow-[0_0_22px_rgba(90,157,224,0.2)] md:text-lg">
                  Global Reach & Trusted Partnerships
                </div>
                <div className="relative mt-8 h-48 overflow-hidden rounded-md">
                  <Image src="/map.png" alt="Global reach map" fill className="object-contain" sizes="(max-width: 1024px) 100vw, 33vw" />
                  <span className="absolute bottom-12 left-[56%] rounded-md bg-[#07111f]/80 px-2 py-1 text-sm font-bold text-white">UAE</span>
                  <span className="absolute right-3 top-20 rounded-md bg-[#07111f]/80 px-2 py-1 text-sm font-bold text-white">Bangladesh</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-md bg-white/[0.04] px-3 py-3 text-sm font-black text-white">From Startups to Enterprises</div>
                  <div className="rounded-md bg-white/[0.04] px-3 py-3 text-sm font-black text-white">Trusted Partner Globally</div>
                </div>
              </article>
            </div>

            <div className="mx-auto mt-7 grid max-w-3xl grid-cols-[80px_1fr_80px] items-center gap-5 rounded-lg border border-[#8bbef0]/40 bg-[#07111f]/75 px-5 py-4 text-center shadow-[0_18px_70px_rgba(0,0,0,0.24)]">
              <div className="relative h-14 w-14 justify-self-center">
                <Image src="/computer.png" alt="Technical excellence" fill className="object-contain" sizes="56px" />
              </div>
              <p className="text-xl font-black leading-tight text-white md:text-2xl">
                Combining Technical Excellence <br className="hidden sm:block" />
                with Creative Innovation
              </p>
              <div className="relative h-14 w-14 justify-self-center">
                <Image src="/bulb.png" alt="Creative innovation" fill className="object-contain" sizes="56px" />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="relative border-y border-white/10 bg-black/20 px-4 py-14 md:py-20">
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-[#3d7ec7]/40 bg-[#3d7ec7]/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8bbef0]">
                  <Code className="h-4 w-4" />
                  What We Build
                </div>
                <h2 className="text-2xl font-black text-white md:text-4xl">Services built to work together.</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollRail(servicesScrollRef, "left")}
                  className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/5 text-white transition-colors hover:bg-[#3d7ec7]"
                  aria-label="Scroll services left"
                >
                  <ChevronRight className="h-5 w-5 rotate-180" />
                </button>
                <button
                  onClick={() => scrollRail(servicesScrollRef, "right")}
                  className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/5 text-white transition-colors hover:bg-[#3d7ec7]"
                  aria-label="Scroll services right"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-8 flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {serviceCategories.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setActiveCategory(category.category)}
                  className={`whitespace-nowrap rounded-md border px-4 py-2 text-sm font-bold transition-colors ${
                    activeCategory === category.category
                      ? "border-[#3d7ec7] bg-[#3d7ec7] text-white"
                      : "border-white/10 bg-white/[0.04] text-neutral-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>

            <div ref={servicesScrollRef} className="mt-5 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {activeServices.map((service) => (
                <article
                  key={service.name}
                  className="min-w-[82vw] rounded-lg border border-white/10 bg-[#0c1526]/80 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)] sm:min-w-[46%] lg:min-w-[31%]"
                >
                  <service.icon className="h-8 w-8 text-[#5a9de0]" />
                  <h3 className="mt-5 text-xl font-black text-white">{service.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-400">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="du-blur-band relative px-4 py-14 md:py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8bbef0]">
                <Rocket className="h-4 w-4" />
                Delivery Flow
              </div>
              <h2 className="text-2xl font-black text-white md:text-4xl">Clear steps from idea to launch.</h2>
              <p className="mt-5 text-base leading-8 text-[#b8c8d8]">
                Design, build, and marketing stay connected from the first call.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {processSteps.map((step, index) => (
                <article key={step.title} className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
                  <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-md bg-[#3d7ec7] text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-black text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-400">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="payment" className="relative border-y border-white/10 bg-black/20 px-4 py-14 md:py-20">
          <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-[#3d7ec7]/40 bg-[#3d7ec7]/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8bbef0]">
                <CreditCard className="h-4 w-4" />
                Secure Checkout
              </div>
              <h2 className="text-2xl font-black text-white md:text-4xl">Simple payment for approved work.</h2>
              <p className="mt-5 text-base leading-8 text-[#b8c8d8]">
                Pay after your scope and amount are confirmed by the team.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#0c1526]/80 p-2 md:p-4">
              <Payment />
            </div>
          </div>
        </section>

        <section id="portfolio" className="du-blur-band relative px-4 py-14 md:py-16">
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8bbef0]">
                  <Layers className="h-4 w-4" />
                  Featured Work
                </div>
                <h2 className="text-2xl font-black text-white md:text-4xl">Real projects, shown all at once.</h2>
              </div>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.map((project) => (
                <article key={project.title} className="group overflow-hidden rounded-lg border border-white/10 bg-[#0c1526]/80 shadow-[0_18px_60px_rgba(0,0,0,0.2)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-black">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute left-3 top-3 rounded-md bg-[#3d7ec7]/90 px-3 py-1 text-xs font-bold text-white">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-black text-white">{project.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-neutral-400">{project.description}</p>
                    <Link
                      href={project.url}
                      target="_blank"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8bbef0] transition-colors hover:text-white"
                    >
                      View Project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="relative border-y border-white/10 bg-black/20 px-4 py-14 md:py-20">
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-[#3d7ec7]/40 bg-[#3d7ec7]/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8bbef0]">
                  <Star className="h-4 w-4" />
                  Client Reviews
                </div>
                <h2 className="text-2xl font-black text-white md:text-4xl">Trusted by clients who need clear delivery.</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollRail(testimonialsScrollRef, "left")}
                  className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/5 text-white transition-colors hover:bg-[#3d7ec7]"
                  aria-label="Scroll reviews left"
                >
                  <ChevronRight className="h-5 w-5 rotate-180" />
                </button>
                <button
                  onClick={() => scrollRail(testimonialsScrollRef, "right")}
                  className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/5 text-white transition-colors hover:bg-[#3d7ec7]"
                  aria-label="Scroll reviews right"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div ref={testimonialsScrollRef} className="mt-8 flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="min-w-[82vw] rounded-lg border border-white/10 bg-[#0c1526]/80 p-6 sm:min-w-[46%] lg:min-w-[31%]">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex gap-1 text-[#5a9de0]" aria-label={`${testimonial.rating} out of 5 rating`}>
                      {[1, 2, 3, 4, 5].map((star) => {
                        const fillWidth = Math.max(0, Math.min(1, testimonial.rating - star + 1)) * 100

                        return (
                          <span key={star} className="relative h-4 w-4">
                            <Star className="absolute inset-0 h-4 w-4 text-white/25" />
                            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillWidth}%` }}>
                              <Star className="h-4 w-4 fill-current text-[#5a9de0]" />
                            </span>
                          </span>
                        )
                      })}
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8bbef0]">
                      {testimonial.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-neutral-300">"{testimonial.content}"</p>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <div className="font-black text-white">{testimonial.name}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[#8bbef0]">{testimonial.role}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="du-blur-band relative px-4 py-14 md:py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-lg border border-white/10 bg-[#0c1526]/80 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-10">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8bbef0]">
                <MessageCircle className="h-4 w-4" />
                Start Your Project
              </div>
              <h2 className="text-2xl font-black text-white md:text-4xl">Ready for a faster digital presence?</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#b8c8d8]">
                Tell us what you need. We will shape the right scope for website, branding, marketing, or automation.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#3d7ec7] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#5a9de0]"
                >
                  WhatsApp Us
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href="mailto:hello@digitaluniverse.agency"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  Send Email
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
              {[
                { icon: PhoneCall, label: "Phone", value: "+971 52 274 0909" },
                { icon: Mail, label: "Email", value: "hello@digitaluniverse.agency" },
                { icon: MapPin, label: "Location", value: "Dubai, UAE" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                  <item.icon className="h-5 w-5 text-[#5a9de0]" />
                  <div className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">{item.label}</div>
                  <div className="mt-2 text-sm font-bold text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
