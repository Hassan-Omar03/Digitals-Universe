"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Menu, MessageCircle, X } from "lucide-react"

const NAV_OFFSET = 114
const phoneNumber = "+971522740909"
const greetingMessage =
  "Hi! I'm interested in your digital services. Could you please provide more information?"
const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(greetingMessage)}`

const navItems = [
  { label: "Home",       id: "hero"         },
  { label: "About",      id: "about"        },
  { label: "Services",   id: "services"     },
  { label: "Projects",   id: "portfolio"    },
  { label: "Payment",    id: "payment"      },
  { label: "Reviews",    id: "testimonials" },
  { label: "Contact",    id: "contact"      },
]

function scrollToSection(id: string, smooth = true) {
  const target = document.getElementById(id)
  if (!target) { window.location.href = `/#${id}`; return }
  const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top: Math.max(top, 0), behavior: smooth ? "smooth" : "auto" })
  window.history.replaceState(null, "", `#${id}`)
}

export default function Navigation() {
  const [activeId,  setActiveId]  = useState("hero")
  const [isOpen,    setIsOpen]    = useState(false)
  const [isScrolled,setIsScrolled]= useState(false)

  useEffect(() => {
    const detect = () => {
      setIsScrolled(window.scrollY > 18)
      const sections = navItems
        .map(item => ({ id: item.id, element: document.getElementById(item.id) }))
        .filter((s): s is { id: string; element: HTMLElement } => Boolean(s.element))
        .sort((a, b) => a.element.offsetTop - b.element.offsetTop)
      if (!sections.length) return
      const pos = window.scrollY + NAV_OFFSET + 8
      const first = sections.find(s => s.id !== "hero")
      if (first && pos < first.element.offsetTop) { setActiveId("hero"); return }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      let next = sections[0].id
      if (atBottom) {
        next = sections[sections.length - 1].id
      } else {
        for (const s of sections) { if (s.element.offsetTop > pos) break; next = s.id }
      }
      setActiveId(next)
    }
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => { detect(); ticking = false })
    }
    detect()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    const hash = window.location.hash.replace("#", "")
    if (navItems.some(i => i.id === hash)) window.setTimeout(() => scrollToSection(hash, false), 50)
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll) }
  }, [])

  const handleNavClick = (id: string) => { setIsOpen(false); setActiveId(id); scrollToSection(id) }

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
      <div
        className={`du-nav-shell mx-auto grid w-full max-w-5xl grid-cols-[1fr_auto] items-center gap-4 rounded-[1.25rem] px-3 py-1.5 transition-all duration-300 lg:grid-cols-[auto_1fr_auto] lg:px-5 lg:py-4 ${
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
            src="/logo-transparent.png"
            alt="Digital Universe"
            width={500}
            height={281}
            priority
            className="h-[90px] w-auto max-w-[280px] shrink-0 object-contain sm:h-[100px] sm:max-w-[320px] lg:h-[70px] lg:max-w-[220px]"
          />
        </button>

        <nav className="du-nav-menu hidden min-w-0 items-center justify-center gap-5 xl:gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              aria-current={activeId === item.id ? "page" : undefined}
              className={`du-nav-link group relative rounded-md px-0 py-2 text-sm font-semibold tracking-[0.5px] transition-colors duration-200 xl:text-[15px] ${
                activeId === item.id ? "du-nav-link-active text-white" : "text-[#b8c8d8]/72 hover:text-white"
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
          className="du-nav-cta hidden h-10 items-center justify-center gap-2 rounded-full px-4 text-[13px] font-semibold tracking-[0.5px] text-white sm:inline-flex"
        >
          <MessageCircle className="h-4 w-4" />
          Get Started
        </a>

        <button
          type="button"
          onClick={() => setIsOpen(open => !open)}
          className="du-icon-action grid h-10 w-10 place-items-center rounded-full text-white lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="du-nav-mobile mx-auto mt-2 w-full max-w-6xl rounded-lg p-2 lg:hidden">
          {navItems.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              aria-current={activeId === item.id ? "page" : undefined}
              className={`du-nav-mobile-link flex w-full items-center rounded-md px-4 py-3 text-left text-sm font-black uppercase tracking-[0.12em] transition-all duration-300 ${
                activeId === item.id ? "du-nav-link-active text-white" : "text-[#b8c8d8]/70 hover:bg-white/10 hover:text-white"
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
      )}
    </header>
  )
}
