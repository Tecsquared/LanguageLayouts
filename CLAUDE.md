# CLAUDE.md - Language Layouts Astro Site

## Overview

Astro 5 static site for the Language Layouts marketing page — Notion templates for language learners and teachers, built on Paul Nation's "Four Strands" framework. Reference design: https://damienherlihy.faces.site/languagelayouts

## Repository & Deployment

- **GitHub:** `Tecsquared/LanguageLayouts` (public)
- **Hosting:** Vercel (auto-deploys from GitHub pushes)
- **Owner:** Damien Herlihy (damienmherlihy@gmail.com)

## Tech Stack

- **Astro 5** — static site generator (single dependency: `astro ^5.7.0`)
- **Bun** — package manager and runtime
- **Fonts:** Outfit (headings, weight 700-900) + Inter (body, 400/500/600) via Google Fonts
- **No CSS frameworks** — custom CSS with Astro scoped `<style>` tags + `global.css`
- **Vanilla JS** — all interactivity via `<script>` tags (no UI framework)

## Commands

- `bunx --bun astro dev --port 4321` — start dev server
- `bun run build` — production build to `dist/`
- `bun run preview` — preview production build

## Project Structure

- `src/pages/index.astro` — single page composing all 17 sections
- `src/layouts/BaseLayout.astro` — HTML shell, fonts, meta, scroll reveal observer
- `src/components/` — one `.astro` file per section (13 components)
- `src/data/templates.ts` — all content data (strands, templates, services, connect links)
- `src/styles/global.css` — CSS variables, reset, typography, scroll reveal animations
- `public/images/` — static images served directly (template cards, illustrations, hero video)

## Page Section Order

Navbar > Hero > SoundsFamiliar > FourStrands > SmarterNotHarder > TemplateCarousel > BeyondTemplates > Architect > StayConnected > Footer (with SquigglyDividers between sections)

## Design System

- Background: white `#FFFFFF`, hero pink `#FFF5F5`
- Coral: `#FF6B6B`, Teal: `#4ECDC4`, Purple: `#9B59B6`, Orange: `#FF8C42`
- Headings: Outfit 900, Body: Inter 400/500/600
- Responsive at 768px breakpoint, radius 12px

## Interactive Elements

- **Four Strands:** toggle behavior — click strand labels/SVG rope to color strands + show descriptions, click again to deselect
- **3D Carousels:** `perspective: 1900px`, `rotateY` transforms, arrow/dot nav, touch swipe, wrap-around
- **Comparison Slider:** draggable before/after image comparison (Smarter Not Harder)
- **Scroll Reveal:** IntersectionObserver adding `.visible` class
- **Navbar:** fixed with backdrop blur, scroll border, hamburger toggle on mobile

## Key Links

- Language Layouts cards → https://www.notion.com/@languagelayouts
- Beyond Templates cards → mailto:damienmherlihy@gmail.com
- YouTube → https://www.youtube.com/@damienherlihy
- Newsletter → https://damienherlihy.substack.com/

## Deployment

Push to GitHub → Vercel auto-deploys (detects Astro, runs `astro build`, serves `dist/`)
