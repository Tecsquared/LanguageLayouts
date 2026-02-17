# CLAUDE.md - Language Layouts Astro Site

## Overview

Astro static site for the Language Layouts marketing page — Notion templates for language learners and teachers, built on Paul Nation's "Four Strands" framework.

## Tech Stack

- **Astro 5** — static site generator
- **Bun** — package manager and runtime
- **Fonts:** Outfit (headings, weight 700-900) + Inter (body) via Google Fonts
- **No CSS frameworks** — custom CSS with Astro scoped `<style>` tags + `global.css`
- **Vanilla JS** — all interactivity via `<script>` tags (no UI framework)

## Commands

- `bun run dev` — start dev server (localhost:4321)
- `bun run build` — production build to `dist/`
- `bun run preview` — preview production build

## Project Structure

- `src/pages/index.astro` — single page composing all sections
- `src/layouts/BaseLayout.astro` — HTML shell, fonts, meta, global CSS
- `src/components/` — one `.astro` file per section
- `src/data/templates.ts` — template, strand, and connect card data
- `src/styles/global.css` — CSS variables, reset, typography, scroll reveal
- `src/assets/images/` — images processed by Astro
- `public/images/` — images served directly (template card images)

## Design System

- Background: white `#FFFFFF`, hero pink `#FFF5F5`
- Coral: `#FF6B6B`, Teal: `#4ECDC4`, Purple: `#9B59B6`, Orange: `#FF8C42`
- Headings: Outfit 900, Body: Inter 400/500/600
- Responsive at 768px breakpoint

## Interactive Elements

- **Four Strands:** click strand labels to color rope SVG + show description
- **Template Carousel:** arrow/dot nav, touch swipe, center-card scaling
- **Scroll Reveal:** IntersectionObserver adding `.visible` class
- **Navbar:** scroll border, hamburger toggle on mobile
