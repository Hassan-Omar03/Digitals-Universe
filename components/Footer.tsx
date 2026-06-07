import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, MapPin, MessageCircle, PhoneCall } from "lucide-react"

const phoneNumber = "+971522740909"
const greetingMessage =
  "Hi! I'm interested in your digital services. Could you please provide more information?"
const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(greetingMessage)}`

const footerLinks = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Checkout", href: "/#payment" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
]

const services = [
  "Website Development",
  "UI/UX Design",
  "SEO & Ads",
  "Graphics Design",
  "Video Editing",
  "Business Setup",
]

export default function Footer() {
  return (
    <footer className="du-footer-blur relative z-10 border-t border-white/10 px-4">
      <div className="mx-auto w-full max-w-6xl py-10">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-7 md:flex-row md:items-center md:justify-between">
          <Link href="/#hero" className="inline-flex items-center gap-3">
            <Image
              src="/logo-transparent.png"
              alt="Digital Universe"
              width={1680}
              height={945}
              className="h-14 w-auto max-w-[12rem] shrink-0 object-contain"
            />
          </Link>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="du-action-primary inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-black text-white"
          >
            <MessageCircle className="h-5 w-5" />
            Start Your Project
          </a>
        </div>

        <p className="w-full border-b border-white/10 py-7 text-base leading-8 text-[#b8c8d8]">
          Digital Universe builds fast websites, clean brand systems, SEO, ads, content, and digital business tools for teams that need a sharper online presence.
        </p>

        <div className="grid gap-8 py-8 md:grid-cols-3">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white">Explore</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-neutral-400 transition-colors hover:text-[#8bbef0]"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white">Services</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1">
              {services.map((service) => (
                <span key={service} className="text-sm font-bold text-neutral-400">
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white">Contact</h2>
            <div className="mt-4 space-y-3">
              <a href={`tel:${phoneNumber}`} className="flex items-center gap-3 text-sm font-bold text-neutral-400 transition-colors hover:text-[#8bbef0]">
                <PhoneCall className="h-4 w-4 text-[#5a9de0]" />
                +971 52 274 0909
              </a>
              <a href="mailto:hello@digitaluniverse.agency" className="flex items-center gap-3 text-sm font-bold text-neutral-400 transition-colors hover:text-[#8bbef0]">
                <Mail className="h-4 w-4 text-[#5a9de0]" />
                hello@digitaluniverse.agency
              </a>
              <div className="flex items-center gap-3 text-sm font-bold text-neutral-400">
                <MapPin className="h-4 w-4 text-[#5a9de0]" />
                Dubai, UAE
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright 2026 Digital Universe. All rights reserved.</span>
          <span>Premium digital agency</span>
        </div>
      </div>
    </footer>
  )
}
