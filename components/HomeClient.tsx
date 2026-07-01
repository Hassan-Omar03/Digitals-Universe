"use client"

import { useEffect, useRef, useState } from "react"
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
  Code,
  Cpu,
  CreditCard,
  FileText,
  Gauge,
  Headphones,
  Image as ImageIcon,
  Layers,
  Linkedin,
  Lock,
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
  CheckCircle2,
} from "lucide-react"

const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false })

const Background3D = dynamic(() => import("./Background3D"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-[#000308]" aria-hidden="true" />,
})

const phoneNumber = "+971524341819"
const greetingMessage =
  "Hi! I'm interested in your digital services. Could you please provide more information?"
const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(greetingMessage)}`

const stats = [
  { value: "15+", label: "Projects Delivered", sub: "across UAE & globally" },
  { value: "20+", label: "Happy Clients", sub: "projects + retainer clients" },
  { value: "4+", label: "Years Experience", sub: "in digital growth" },
  { value: "98%", label: "Success Rate", sub: "client satisfaction" },
]

const philosophyCards = [
  { image: "/hands2.png", title: "Meaningful Connections" },
  { image: "/mind.png", title: "Collective Expertise" },
  { image: "/partnership.png", title: "Long-term Partnerships" },
]

const missionPoints = [
  { image: "/arrow.png", label: "Empower Businesses" },
  { image: "/eye.png", label: "Enhance Brand Visibility" },
  { image: "/drop.png", label: "Create Lasting Impact" },
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
    icon: Search,
  },
  {
    title: "Design",
    text: "We shape clean UI around fast decisions.",
    icon: PenTool,
  },
  {
    title: "Build",
    text: "We build for speed, mobile, and easy updates.",
    icon: Code,
  },
  {
    title: "Grow",
    text: "We launch, measure, and improve what converts.",
    icon: Rocket,
  },
]

const portfolio = [
  {
    title: "DKing Car Rental",
    category: "Luxury Automotive",
    image: "/dking.jpg",
    url: "https://dkingcar.com",
    description: "A premium car rental platform built for luxury vehicles, fast bookings, and high-converting leads.",
    featured: true,
  },
  {
    title: "Hawar Homes",
    category: "Real Estate",
    image: "/homes.png",
    url: "https://hawarhomes.com",
    description: "A premium property website for vacation homes and rental leads in the Maldives.",
    featured: true,
  },
  {
    title: "Mauritius Travel & Tour",
    category: "Travel & Tourism",
    image: "/tour.jpg",
    url: "https://mauritiustraveltour.com",
    description: "A full-service travel website for Mauritius tour packages, island experiences, and online bookings.",
    featured: false,
  },
  {
    title: "BIM Africa",
    category: "Engineering",
    image: "/bim.png",
    url: "https://bim.africa",
    description: "A structured engineering firm site focused on services, global reach, and professional credibility.",
    featured: false,
  },
  {
    title: "Chemfix",
    category: "Industrial & Chemical",
    image: "/chemfix.jpg",
    url: "https://chemfix.org",
    description: "A professional B2B website for a chemical solutions provider built for trust and qualified leads.",
    featured: false,
  },
  {
    title: "Al Karam",
    category: "Retail & Fashion",
    image: "/alkaram.jpg",
    url: "https://alkaram-tau.vercel.app",
    description: "A clean retail website showcasing collections, brand identity, and a smooth shopping experience.",
    featured: false,
  },
  {
    title: "AB SMD Construction",
    category: "Construction",
    image: "/absmd.png",
    url: "https://absmd.us",
    description: "A US-based construction website with clear service listings, project highlights, and trust signals.",
    featured: false,
  },
  {
    title: "Construction Co.",
    category: "Construction",
    image: "/construction.png",
    url: "https://construction-mu-sandy.vercel.app",
    description: "A modern construction company website with project showcases, service offerings, and contact flow.",
    featured: false,
  },
  {
    title: "Hoda Shine Services",
    category: "Home Services",
    image: "/cleaning.png",
    url: "https://hodashineservices.com",
    description: "A service website shaped around trust, clarity, and generating qualified cleaning leads.",
    featured: false,
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

  const activeServices =
    serviceCategories.find((category) => category.category === activeCategory)?.services ?? []

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".du-reveal, .du-motion-box"))
    if (!items.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("du-reveal-visible")
            entry.target.classList.add("du-motion-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
    )

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [activeCategory])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    const y = el.getBoundingClientRect().top + window.scrollY - 104
    window.scrollTo({ top: Math.max(y, 0), behavior: "auto" })
  }

  return (
    <div className="relative w-full bg-[#070e1a] text-neutral-200 selection:bg-[#3d7ec7]/30 selection:text-white">
      <Background3D />

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {isFabOpen ? (
          <div className="flex flex-col gap-3">
            <a
              href={`tel:${phoneNumber}`}
              className="du-icon-action grid h-12 w-12 place-items-center rounded-lg text-white"
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
              className="du-icon-action grid h-12 w-12 place-items-center rounded-lg text-white"
              aria-label="Open chat"
            >
              <Bot className="h-5 w-5" />
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="du-icon-action grid h-12 w-12 place-items-center rounded-lg text-white"
              aria-label="Message on WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        ) : null}

        <button
          onClick={() => setIsFabOpen((open) => !open)}
          className="du-action-primary grid h-14 w-14 place-items-center rounded-lg text-white"
          aria-label="Open contact actions"
        >
          {isFabOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>

      {hasOpenedChat ? <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} /> : null}

      <div className="du-sections relative z-10 flex w-full flex-col">
        <section id="hero" className="du-mobile-hero relative flex min-h-screen items-center overflow-hidden px-4 pb-28 pt-20 md:justify-center md:min-h-[100svh] md:pb-32 md:pt-24 lg:pt-[120px]">
          {/* desktop: original centered layout */}
          <div className="du-reveal relative z-10 mx-auto hidden w-full max-w-[1100px] -translate-y-6 text-center md:block md:-translate-y-8 lg:-translate-y-10">
            
          <h1 className="du-split-heading mx-auto max-w-[1100px] text-[clamp(42px,6vw,52px)] font-black leading-[1] tracking-[-1.5px] text-white lg:text-[clamp(52px,4.5vw,60px)] 2xl:text-[clamp(58px,4.5vw,72px)]">
  WE TRANSFORM YOUR
  <br />
  BUSINESS DIGITAL
</h1>

<p className="mx-auto mt-6 max-w-[850px] text-[18px] font-normal leading-[1.5] text-[#d7e6f4] md:text-[20px] xl:text-[22px]">
  We help businesses grow, automate, and thrive in the digital world through powerful technology, smart strategies, and creative solutions that deliver real results.
</p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => scrollToSection("services")}
                className="du-action-primary inline-flex h-[60px] items-center justify-center gap-2 rounded-[14px] px-10 text-xl font-bold text-white"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="du-action-secondary inline-flex h-[60px] items-center justify-center gap-2 rounded-[14px] px-10 text-xl font-bold text-white"
              >
                Get Started Now
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* mobile: left-aligned compact layout */}
          <div className="du-reveal relative z-10 w-full max-w-[62vw] text-left md:hidden">
            <h1 className="du-split-heading text-[clamp(26px,7.5vw,34px)] font-extrabold leading-[1.05] tracking-[-0.5px]">
              WE TRANSFORM YOUR<br />
              BUSINESS<br />
              DIGITAL
            </h1>
            <p className="mt-3 max-w-[55vw] text-[12.5px] font-normal leading-[1.5] text-[#d7e6f4]">
              We help businesses grow, automate, and thrive in the digital world through powerful technology and creative solutions.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => scrollToSection("services")}
                className="du-action-primary inline-flex h-9 w-fit items-center gap-2 rounded-[10px] px-4 text-[12px] font-bold text-white"
              >
                Explore Services
                <ArrowRight className="h-3 w-3" />
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="du-action-secondary inline-flex h-9 w-fit items-center gap-2 rounded-[10px] px-4 text-[12px] font-bold text-white"
              >
                Get Started Now
                <MessageCircle className="h-3 w-3" />
              </a>
            </div>
          </div>
        </section>

        <section className="du-blur-band relative flex min-h-[100svh] items-center overflow-hidden border-b border-white/10 px-4 py-12 md:py-14">
          <div className="mx-auto w-full max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center justify-center gap-2 rounded-md border border-[#8bbef0]/40 bg-white/[0.04] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8bbef0]">
                <BarChart3 className="h-4 w-4" />
                Our impact in numbers
              </div>
              <h2 className="du-split-heading text-3xl font-black leading-tight text-white md:text-[2.45rem]">
                Real results. Real digital growth.
              </h2>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="du-reveal du-premium-card relative overflow-hidden rounded-2xl border border-white/10 px-5 py-5 text-center"
                >
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5a9de0]/60 to-transparent" />
                  <div className="text-[2.6rem] font-black leading-none tracking-tight text-white">{stat.value}</div>
                  <div className="mt-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#8bbef0]">{stat.label}</div>
                  <div className="mt-1 text-[10px] font-semibold text-white/30">{stat.sub}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="relative flex min-h-[100svh] scroll-mt-36 items-center overflow-hidden px-4 py-12 md:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(90,157,224,0.14),transparent_46%)]" />
          <div className="mx-auto w-full max-w-6xl">
            <div className="text-center">
              <div className="du-label-blur mb-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-white/90">
                <Sparkles className="h-4 w-4 text-[#8bbef0]" />
                About Our Company
              </div>
              <h2 className="du-split-heading text-3xl font-black tracking-tight text-white md:text-[2.45rem]">
                Welcome to Digital Universe
              </h2>
            </div>

            <div className="mx-auto mt-7 grid max-w-5xl gap-3 lg:grid-cols-[0.95fr_0.78fr_0.95fr]">
              <article className="du-reveal du-about-card relative rounded-[22px] border border-[#8bbef0]/40 p-3.5">
                <div className="du-about-card-title">
                  Our Core Philosophy
                </div>
                <div className="grid grid-cols-1 gap-2.5 pt-3 md:grid-cols-3">
                  {philosophyCards.map((item) => (
                    <div key={item.title} className="flex flex-col items-center rounded-[16px] border border-white/10 bg-white/[0.04] px-2.5 py-2.5 text-center">
                      <div className="relative mb-1.5 h-10 w-10">
                        <Image src={item.image} alt="" fill className="object-contain" sizes="40px" />
                      </div>
                      <h3 className="text-xs font-bold leading-tight text-white">{item.title}</h3>
                    </div>
                  ))}
                </div>
              </article>

              <article className="du-reveal du-about-card relative rounded-[22px] border border-[#8bbef0]/40 p-3.5">
                <div className="du-about-card-title">
                  Our Mission
                </div>
                <div className="space-y-2 pt-3">
                  {missionPoints.map((item) => (
                    <div key={item.label} className="du-mission-chip flex items-center gap-2.5 rounded-[16px] border border-white/10 bg-white/[0.04] px-2.5 py-2">
                      <span className="relative h-8 w-8 shrink-0">
                        <Image src={item.image} alt="" fill className="object-contain" sizes="32px" />
                      </span>
                      <p className="text-left text-xs font-bold text-white">{item.label}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="du-reveal du-about-card relative rounded-[22px] border border-[#8bbef0]/40 p-3.5">
                <div className="du-about-card-title text-xs md:text-sm">
                  Global Reach & Trusted Partnerships
                </div>
                <div className="relative mt-3.5 h-24 overflow-hidden rounded-[16px]">
                 <Image
  src="/map2.png"
  alt="Global reach map"
  fill
  className="object-contain scale-x-150 scale-y-125"
  sizes="(max-width: 1024px) 100vw, 33vw"
/>
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-[14px] bg-white/[0.04] px-2 py-1.5 text-[11px] font-bold leading-tight text-white">From Startups to Enterprises</div>
                  <div className="rounded-[14px] bg-white/[0.04] px-2 py-1.5 text-[11px] font-bold leading-tight text-white">Trusted Partner Globally</div>
                </div>
              </article>
            </div>

            <div className="du-reveal du-premium-card du-about-strip mx-auto mt-6 grid max-w-3xl grid-cols-[64px_1fr_64px] items-center gap-4 rounded-lg border border-[#8bbef0]/40 px-5 py-3.5 text-center">
              <div className="relative h-14 w-14 justify-self-center">
                <Image src="/computer.png" alt="Technical excellence" fill className="object-contain" sizes="56px" />
              </div>
              <p className="text-lg font-black leading-tight text-white md:text-xl">
                Combining Technical Excellence <br className="hidden sm:block" />
                with Creative Innovation
              </p>
              <div className="relative h-14 w-14 justify-self-center">
                <Image src="/bulb.png" alt="Creative innovation" fill className="object-contain" sizes="56px" />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="du-services-section du-blur-band relative flex min-h-[100svh] items-center overflow-hidden border-y border-white/10 px-4 py-12 md:py-14">
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8bbef0]">
                  <Code className="h-4 w-4" />
                  What We Build
                </div>
                <h2 className="du-split-heading max-w-3xl text-2xl font-black leading-tight text-white md:text-[2.55rem]">Services built to work together.</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[#b8c8d8]">
                  Choose a focused service track, or combine them into one connected digital growth system.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {serviceCategories.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setActiveCategory(category.category)}
                  className={`du-category-pill w-full rounded-[14px] border px-4 py-2.5 text-sm font-bold transition-colors ${
                    activeCategory === category.category
                      ? "border-[#3d7ec7] bg-[#3d7ec7] text-white"
                      : "border-white/10 bg-white/[0.04] text-neutral-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {activeServices.map((service) => (
                <article
                  key={service.name}
                  className="du-service-card rounded-[28px] border border-white/10 p-6"
                >
                  <span className="du-top-neon-sweep" aria-hidden="true" />
                  <span className="du-card-reflection" aria-hidden="true" />
                  <div className="du-icon-orb rounded-[18px] border border-white/15">
                    <service.icon className="h-8 w-8 text-[#d7f4ff]" />
                  </div>
                  <h3 className="du-card-title mt-5 text-xl font-black text-white">{service.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-400">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="du-flow-section relative flex min-h-[100svh] items-center overflow-hidden px-4 py-12 md:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_48%,rgba(90,157,224,0.18),transparent_42%),radial-gradient(circle_at_78%_32%,rgba(55,208,174,0.1),transparent_38%)]" />
          <div className="mx-auto w-full max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <div className="du-label-blur mb-5 inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8bbef0]">
                <Rocket className="h-4 w-4" />
                Delivery Flow
              </div>
              <h2 className="du-split-heading text-2xl font-black text-white md:text-[2.45rem]">Clear steps from idea to launch.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#b8c8d8]">
                Design, build, and marketing stay connected from the first call.
              </p>
            </div>

            <div className="relative mt-12 grid gap-5 lg:grid-cols-4">
              <div className="pointer-events-none absolute left-0 right-0 top-[35px] hidden h-px bg-gradient-to-r from-transparent via-[#8bbef0]/35 to-transparent lg:block" />
              {processSteps.map((step) => (
                <article
                  key={step.title}
                  className="du-reveal du-flow-card du-premium-card relative rounded-[28px] border border-[#8bbef0]/30 p-6"
                >
                  <span className="du-top-neon-sweep" aria-hidden="true" />
                  <span className="du-card-reflection" aria-hidden="true" />
                  <div className="relative mb-7 flex justify-center">
                    <div className="du-flow-icon du-icon-orb relative grid h-[76px] w-[76px] place-items-center rounded-[22px] border border-[#8bbef0]/50 bg-white/[0.08] text-base font-black text-white">
                      <step.icon className="h-9 w-9 text-[#8bbef0]" />
                    </div>
                  </div>
                  <h3 className="du-card-title text-center text-xl font-black text-white">{step.title}</h3>
                  <p className="mx-auto mt-3 max-w-[15rem] text-center text-sm leading-7 text-[#b8c8d8]">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Payment section temporarily disabled
        <section id="payment" className="du-blur-band relative flex min-h-[100svh] items-center border-y border-white/10 px-4 py-12 md:py-14">
          <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <div className="du-motion-box du-reveal du-flicker-left du-premium-card du-top-line-card flex flex-col justify-between rounded-[24px] border border-white/10 p-6 md:p-8">
              <span className="du-top-neon-sweep" aria-hidden="true" />
              <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8bbef0]">
                <CreditCard className="h-4 w-4" />
                Secure Checkout
              </div>
              <h2 className="du-split-heading text-2xl font-black leading-tight text-white md:text-[2.45rem]">Simple payment for approved work.</h2>
              <p className="mt-5 text-base leading-8 text-[#b8c8d8]">
                Pay after your scope and amount are confirmed by the team.
              </p>
              </div>
              <div className="mt-8 grid gap-3">
                {[
                  { icon: Lock, label: "Encrypted checkout" },
                  { icon: CheckCircle2, label: "Manual scope confirmation" },
                  { icon: CreditCard, label: "Stripe powered payment" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.04] px-4 py-3">
                    <item.icon className="h-5 w-5 text-[#8bbef0]" />
                    <span className="text-sm font-bold text-white">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="du-motion-box du-reveal du-flicker-right du-premium-card du-top-line-card rounded-[24px] border border-white/10 p-2 md:p-4">
              <span className="du-top-neon-sweep" aria-hidden="true" />
              <Payment />
            </div>
          </div>
        </section>
        */}

        <section id="portfolio" className="relative overflow-hidden px-4 py-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_0%,rgba(61,126,199,0.10),transparent_55%)]" />
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8bbef0]">
                <Layers className="h-4 w-4" />
                Featured Work
              </div>
              <h2 className="du-split-heading text-2xl font-black text-white md:text-[2.45rem]">
                Projects that speak for themselves.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#b8c8d8]">
                From luxury automotive to real estate and engineering — built to convert and built to last.
              </p>
            </div>

            {/* Featured row — top 2 projects larger */}
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              {portfolio.filter(p => p.featured).map((project) => (
                <Link
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="du-reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070e1a]/90 via-[#070e1a]/20 to-transparent" />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm ring-1 ring-white/20">
                        View Live <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="absolute left-3 top-3 rounded-full bg-[#3d7ec7]/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black text-white">{project.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-neutral-400">{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Regular grid — remaining projects */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.filter(p => !p.featured).map((project) => (
                <Link
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="du-reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070e1a]/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm ring-1 ring-white/20">
                        View Live <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <div className="absolute left-3 top-3 rounded-full bg-[#3d7ec7]/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-black text-white">{project.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-neutral-400">{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="du-blur-band relative flex min-h-[100svh] items-center overflow-hidden border-y border-white/10 px-4 py-12 md:py-14">
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8bbef0]">
                  <Star className="h-4 w-4" />
                  Client Reviews
                </div>
                <h2 className="du-split-heading text-2xl font-black text-white md:text-[2.45rem]">Trusted by clients who need clear delivery.</h2>
              </div>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="du-reveal du-premium-card rounded-[22px] border border-white/10 p-6">
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

        <section id="contact" className="relative flex min-h-[100svh] items-center overflow-hidden px-4 py-12 md:py-14">
          <div className="mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="du-motion-box du-reveal du-flicker-left du-premium-card du-top-line-card rounded-[26px] border border-white/10 p-6 md:p-10">
              <span className="du-top-neon-sweep" aria-hidden="true" />
              <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8bbef0]">
                <MessageCircle className="h-4 w-4" />
                Start Your Project
              </div>
              <h2 className="du-split-heading text-2xl font-black text-white md:text-[2.45rem]">Ready for a faster digital presence?</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#b8c8d8]">
                Tell us what you need. We will shape the right scope for website, branding, marketing, or automation.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="du-action-primary inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold text-white"
                >
                  WhatsApp Us
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href="mailto:hello@digitaluniverse.agency"
                  className="du-action-secondary inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold text-white"
                >
                  Send Email
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { icon: PhoneCall, label: "Phone", value: "+971 52 434 1819" },
                { icon: Mail, label: "Email", value: "hello@digitaluniverse.agency" },
                { icon: MapPin, label: "Location", value: "Dubai, UAE" },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="du-motion-box du-reveal du-flicker-right du-premium-card du-top-line-card rounded-[22px] border border-white/10 p-5"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <span className="du-top-neon-sweep" aria-hidden="true" />
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-[16px] border border-white/10 bg-white/[0.05]">
                      <item.icon className="h-5 w-5 text-[#8bbef0]" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.18em] text-[#8bbef0]">{item.label}</span>
                      <span className="mt-1 block text-sm font-bold text-white">{item.value}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
