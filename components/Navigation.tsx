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
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "portfolio" },
  { label: "Payment", id: "payment" },
  { label: "Reviews", id: "testimonials" },
  { label: "Contact", id: "contact" },
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
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const detectActiveSection = () => {
      setIsScrolled(window.scrollY > 18)
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
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 lg:pt-4">
      <div
        className={`du-nav-shell mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-4 rounded-[2rem] px-5 py-3 transition-all duration-300 lg:grid-cols-[auto_1fr_auto] lg:px-8 lg:py-4 ${
          isScrolled ? "du-nav-shell-scrolled" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => handleNavClick("hero")}
          className="group flex min-w-0 items-center gap-3 text-left"
          aria-label="Go to Digital Universe home"
        >
          <Image
            src="/digitals-universe-logo-v4-mark.png"
            alt="Digital Universe"
            width={52}
            height={52}
            priority
            className="du-nav-logo-mark h-12 w-12 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 lg:h-14 lg:w-14"
          />
          <span className="hidden leading-none sm:block lg:hidden xl:block">
            <span className="du-brand-word block text-base font-black uppercase tracking-[0.12em] text-white">Digital</span>
            <span className="du-brand-word-accent block text-base font-black uppercase tracking-[0.12em]">Universe</span>
          </span>
        </button>

        <nav className="du-nav-menu hidden min-w-0 items-center justify-center gap-7 xl:gap-10 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              aria-current={activeId === item.id ? "page" : undefined}
              className={`du-nav-link group relative rounded-md px-0 py-2 text-sm font-black uppercase tracking-[0.06em] transition-colors duration-200 xl:text-[15px] ${
                activeId === item.id
                  ? "du-nav-link-active text-white"
                  : "text-[#b8c8d8]/72 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="du-nav-cta hidden items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-white sm:inline-flex lg:px-6"
        >
          <MessageCircle className="h-4 w-4" />
          Get Started
        </a>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="du-icon-action grid h-11 w-11 place-items-center rounded-full text-white lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="du-nav-mobile mx-auto mt-2 w-full max-w-6xl rounded-lg p-2 lg:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              aria-current={activeId === item.id ? "page" : undefined}
              className={`du-nav-mobile-link flex w-full items-center rounded-md px-4 py-3 text-left text-sm font-black uppercase tracking-[0.12em] transition-all duration-300 ${
                activeId === item.id
                  ? "du-nav-link-active text-white"
                  : "text-[#b8c8d8]/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="du-action-primary mt-2 flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-white"
          >
            <MessageCircle className="h-5 w-5" />
            Get Started
          </a>
        </div>
      ) : null}
    </header>
  )
}
