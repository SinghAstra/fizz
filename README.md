# ItzFizz — Scroll-Driven Hero Section

Next.js 16 (App Router) + Tailwind CSS + GSAP ScrollTrigger, deployed-ready for Vercel. recreates the car-scroll hero from https://paraschaturvedi.github.io/car-scroll-animation.

## Tech
- Next.js 16, React 19, TypeScript
- Tailwind CSS v4
- GSAP (ScrollTrigger)
- shadcn/ui (Button only)
- Fonts: Archivo + JetBrains Mono via next/font

## Run locally
```
npm install
npm run dev   # http://localhost:3000
npm run build # production build
npm run start
```

## Structure
- `app/layout.tsx` — fonts + metadata
- `app/globals.css` — design tokens (shell, road, trail, lime, sky, coal, orange)
- `app/page.tsx` — mounts `Hero`
- `components/hero.tsx` — sticky hero stage, intro timeline, scroll-driven car/trail/letter reveal
- `components/ui/button.tsx` — shadcn Button
- `lib/utils.ts` — `cn` helper
- `public/car.png` — hero vehicle asset

## How it works
- Intro (load): headline letters, stats, and car stagger in with `power3.out` easing; reduced-motion skips motion.
- Scroll: wrapper is `h-[260vh]` with a `sticky` hero stage. One GSAP timeline scrubbed to scroll moves the car across the road and grows the green trail `scaleX: 0 → 1`; headline letters switch white → black as the trail passes each letter's cached center.
- Only `transform`/`opacity` animate; no layout reads during scroll. `ScrollTrigger.refresh()` on resize/font load.

## Deploy (Vercel)
1. Push this folder to GitHub (no commits made by me — you push).
2. Import the repo on Vercel; framework preset Next.js.
3. Open the production URL on desktop and mobile.

## Submission
- Live URL: (Vercel production URL after deploy)
- GitHub repo: (your repo URL)
