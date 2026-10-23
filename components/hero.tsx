"use client"

import { useCallback, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"

const WORDS = ["WELCOME", "ITZFIZZ"]

const STATS = [
  { pct: "58%", label: "Increase in pick up point use", color: "bg-lime" },
  { pct: "23%", label: "Decreased in customer phone calls", color: "bg-sky" },
  { pct: "27%", label: "Increase in pick up point use", color: "bg-coal" },
  { pct: "40%", label: "Decreased in customer phone calls", color: "bg-orange" }
]

export function Hero() {
  const root = useRef<HTMLDivElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const road = useRef<HTMLDivElement>(null)
  const car = useRef<HTMLImageElement>(null)
  const trail = useRef<HTMLDivElement>(null)
  const hint = useRef<HTMLDivElement>(null)
  const centers = useRef<number[]>([])
  const width = useRef(0)
  const cwidth = useRef(0)

  const measure = useCallback(() => {
    if (!road.current || !root.current || !car.current) return
    const rb = road.current.getBoundingClientRect()
    width.current = road.current.clientWidth
    cwidth.current = car.current.clientWidth
    centers.current = Array.from(root.current.querySelectorAll<HTMLElement>(".letter")).map((el) => {
      const b = el.getBoundingClientRect()
      return b.left + b.width / 2 - rb.left
    })
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const rl = root.current!
      const q = gsap.utils.selector(rl)
      const letters = q<HTMLElement>(".letter")
      const stats = q<HTMLElement>(".stat")
      const brand = q<HTMLElement>(".brand")[0]!
      const hintEl = hint.current!
      const carEl = car.current!
      const trailEl = trail.current!

      measure()
      document.fonts.ready.then(() => {
        measure()
        ScrollTrigger.refresh()
      })
      window.addEventListener("resize", measure)
      ScrollTrigger.addEventListener("refreshInit", measure)

      const intro = gsap.timeline()
      if (reduced) {
        intro.set(letters, { clearProps: "all" }).set(stats, { clearProps: "all" }).set(carEl, { clearProps: "all" })
      } else {
        intro
          .from([brand], { y: 16, opacity: 0, duration: 0.5 })
          .from(carEl, { y: 24, opacity: 0, duration: 0.7 }, "-=0.4")
          .from(letters, { yPercent: 140, opacity: 0, stagger: 0.025, duration: 0.9, ease: "power3.out" }, "-=0.6")
          .from(stats, { y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power3.out" }, "-=0.7")
      }

      const reveal = (p: number) => {
        const edge = p * width.current
        letters.forEach((el, i) => {
          const lit = centers.current[i] <= edge
          if (lit !== el.classList.contains("lit")) el.classList.toggle("lit", lit)
        })
        hintEl.classList.toggle("gone", p > 0.02)
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper.current!,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => reveal(self.progress)
        }
      })
      tl.to(carEl, { x: () => window.innerWidth - cwidth.current / 2, ease: "none" }, 0)
        .to(trailEl, { scaleX: 1, ease: "none", transformOrigin: "left" }, 0)

      return () => {
        window.removeEventListener("resize", measure)
        ScrollTrigger.removeEventListener("refreshInit", measure)
        tl.scrollTrigger?.kill()
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapper} className="h-[260vh] w-full relative">
      <section ref={(el) => { root.current = el as HTMLDivElement }} className="sticky top-0 z-10 h-screen w-full overflow-hidden bg-shell">
        <nav className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4">
          <div className="brand font-black text-[12px] tracking-widest uppercase">itzfizz</div>
          <Button variant="outline" className="h-9 px-3 text-[10px] uppercase tracking-widest">Get in touch</Button>
        </nav>
        <div className="absolute left-0 right-0 top-[36vh] h-[260px] md:top-[30vh] md:h-[320px] bg-road overflow-hidden">
          <div ref={trail} className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-trail" />
          <h1 aria-label="Welcome Itzfizz" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center gap-[0.1em] px-4 text-[clamp(2.4rem,8vw,10rem)] font-black text-white leading-none tracking-[0.02em]">
            {WORDS.map((word, wi) => (
              <span key={word} className="word inline-flex gap-[0.1em]">
                {word.split("").map((ch, ci) => (
                  <span key={`${word}-${ci}`} className="letter text-white transition-colors duration-300" aria-hidden={true}>{ch}</span>
                ))}
              </span>
            ))}
          </h1>
          <img ref={car} src="/car.png" alt="" decoding="async" className="absolute bottom-0 left-0 z-30 h-[90%] w-auto" />
        </div>
        <div ref={hint} className="absolute bottom-10 right-6 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink/90 text-[9px] font-mono text-white transition-opacity duration-500">
          <span>Scroll</span>
          <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-[calc(36vh+300px)] md:top-[calc(30vh+360px)] grid grid-cols-2 gap-6 md:grid-cols-4 w-[92%] max-w-[1180px]">
          {STATS.map((s, i) => (
            <div key={i} className={`stat rounded-xl p-5 shadow-lg flex flex-col gap-1 ${s.color} ${s.color === "bg-coal" ? "text-white" : "text-ink"}`}>
              <span className="text-4xl font-black tabular-nums">{s.pct}</span>
              <span className="text-[10px] font-mono uppercase tracking-widest leading-tight">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
