"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Menu, MessageCircle, X } from "lucide-react"

const NAV_OFFSET = 104
const phoneNumber = "+971522740909"
const greetingMessage =
  "Hi! I'm interested in your digital services. Could you please provide more information?"
const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(greetingMessage)}`

const navItems = [
  { label: "Home", id: "hero", marker: "01" },
  { label: "About", id: "about", marker: "02" },
  { label: "Services", id: "services", marker: "03" },
  { label: "Checkout", id: "payment", marker: "04" },
  { label: "Portfolio", id: "portfolio", marker: "05" },
  { label: "Reviews", id: "testimonials", marker: "06" },
  { label: "Contact", id: "contact", marker: "07" },
]

function scrollToSection(id: string, smooth = true) {
  const target = document.getElementById(id)

  if (!target) {
    window.location.href = `/#${id}`
    return
  }

  const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top: Math.max(top, 0), behavior: smooth ? "smooth" : "auto" })
  window.history.replaceState(null, "", `#${id}`)
}

export default function Navigation() {
  const [activeId, setActiveId] = useState(navItems[0].id)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const detectActiveSection = () => {
      const sections = navItems
        .map((item) => ({ id: item.id, element: document.getElementById(item.id) }))
        .filter((section): section is { id: string; element: HTMLElement } => Boolean(section.element))
        .sort((a, b) => a.element.offsetTop - b.element.offsetTop)

      if (!sections.length) return

      const scrollPosition = window.scrollY + NAV_OFFSET + 8
      const pageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      let nextActiveId = sections[0].id

      if (pageBottom) {
        nextActiveId = sections[sections.length - 1].id
      } else {
        for (const section of sections) {
          if (section.element.offsetTop > scrollPosition) break
          nextActiveId = section.id
        }
      }

      setActiveId(nextActiveId)
    }

    let ticking = false
    const handleScroll = () => {
      if (ticking) return

      ticking = true
      window.requestAnimationFrame(() => {
        detectActiveSection()
        ticking = false
      })
    }

    detectActiveSection()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    const hash = window.location.hash.replace("#", "")
    if (navItems.some((item) => item.id === hash)) {
      window.setTimeout(() => scrollToSection(hash, false), 50)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  const handleNavClick = (id: string) => {
    setIsOpen(false)
    setActiveId(id)
    scrollToSection(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-4">
      <div className="du-nav-shell mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto] items-center gap-3 rounded-lg border border-[#8bbef0]/20 px-3 py-2.5 shadow-[0_16px_44px_rgba(0,0,0,0.3)] lg:grid-cols-[auto_1fr_auto]">
        <button
          type="button"
          onClick={() => handleNavClick("hero")}
          className="group flex min-w-0 items-center gap-2.5 text-left"
          aria-label="Go to Digital Universe home"
        >
          <Image
            src="/digitals-universe-logo-v4-mark.png"
            alt="Digital Universe"
            width={52}
            height={52}
            priority
            className="h-11 w-11 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="hidden leading-none sm:block">
            <span className="block text-base font-black uppercase tracking-[0.12em] text-white">Digital</span>
            <span className="block text-base font-black uppercase tracking-[0.12em] text-[#8bbef0]">Universe</span>
          </span>
        </button>

        <nav className="hidden min-w-0 items-center justify-center gap-1 rounded-lg border border-white/10 bg-black/20 p-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`group relative flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[11px] font-black uppercase tracking-[0.1em] transition-colors ${
                activeId === item.id
                  ? "bg-[#8bbef0]/15 text-white shadow-[inset_0_0_0_1px_rgba(139,190,240,0.35)]"
                  : "text-neutral-400 hover:bg-white/[0.07] hover:text-white"
              }`}
            >
              <span
                className={`text-[9px] tracking-normal ${
                  activeId === item.id ? "text-[#8bbef0]" : "text-neutral-600 group-hover:text-[#8bbef0]"
                }`}
              >
                {item.marker}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center justify-center gap-2 rounded-md border border-[#8bbef0]/25 bg-[#3d7ec7] px-4 py-2.5 text-xs font-black uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#5a9de0] sm:inline-flex"
        >
          <MessageCircle className="h-4 w-4" />
          Get Started
        </a>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.05] text-white lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="du-nav-shell mx-auto mt-2 w-full max-w-6xl rounded-lg border border-[#8bbef0]/20 p-2 shadow-[0_18px_55px_rgba(0,0,0,0.35)] lg:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-black uppercase tracking-[0.12em] transition-colors ${
                activeId === item.id
                  ? "bg-[#8bbef0]/15 text-white"
                  : "text-neutral-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-[10px] text-[#8bbef0]">{item.marker}</span>
              {item.label}
            </button>
          ))}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-md bg-[#3d7ec7] px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-white"
          >
            <MessageCircle className="h-5 w-5" />
            Get Started
          </a>
        </div>
      ) : null}
    </header>
  )
}
