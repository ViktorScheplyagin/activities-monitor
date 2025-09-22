# Activities Monitor – SvelteKit Build Playbook

Welcome! This document instructs any future agent that clones this repository
and renames it for a greenfield SvelteKit build of Activities Monitor. Follow
the steps below to reproduce the current product’s functionality and visual
language without relying on the legacy Next.js/React stack.

## 1. Project scope
- Ship a SvelteKit application that matches the UX, flows, and styles of the
  existing Activities Monitor product (tasks CRUD, timer, tags, notifications,
  theme switching, completed tasks page, task detail editing, time accumulator).
- Preserve the neomorphic look & feel: soft shadows, rounded cards, DS-Digital
  timer font, and the existing color palette.
- Favor clarity over magic. Svelte’s compiler already eliminates the Virtual
  DOM, so keep the architecture transparent and predictable.

## 2. Tooling baseline
- Framework: SvelteKit with TypeScript and Vite.
- Styling: plain CSS modules (or scoped `<style>` blocks) backed by extracted
  design tokens. No Tailwind, no CSS-in-JS.
- State management: Svelte stores (`writable`, `derived`, `readable`) instead of
  Zustand.
- Forms & validation: Svelte actions plus Zod schemas; avoid react-hook-form
  analogues.
- Persistence: reuse the IndexedDB task API logic from this repo, adapted to
  framework-agnostic TypeScript modules.
- Notifications: browser Notifications API with the same assets and sounds.

## 3. Design system extraction
1. Port the theme variables, colors, font faces, and shadow definitions from
   `app/globals.css` and `tailwind.config.js` into a `src/lib/styles/tokens.css`
   file that defines CSS custom properties.
2. Build a catalog of CSS utility classes (e.g. `.shadow-soft`, `.text-muted`,
   `.surface`) that replicate Tailwind combinations relied upon by the current
   UI.
3. Recreate neomorphic primitives (`Button`, `Card`, `Dialog`, `Input`,
   `Combobox`) as Svelte components under `src/lib/ui`. Each component should
   consume the shared tokens and expose props similar to their React analogues.
4. When styling error states, use the design token or translation key labeled
   `failed`—reuse it exactly as spelled in the legacy app.

## 4. Application architecture
1. Mirror the Feature-Sliced structure with SvelteKit idioms:
   - `src/routes` for pages (`/`, `/completed`, `/tasks/[id]`).
   - `src/lib/widgets` for layout-level compositions like the sticky header and
     navigation.
   - `src/lib/features` for user-facing flows (task create, task search, timer,
     tags, notifications, theme toggle, time accumulator).
   - `src/lib/entities` for domain logic (tasks API facade, DTOs, tag models).
   - `src/lib/shared` for utilities, stores, and CSS tokens.
2. Keep routing simple: use SvelteKit load functions only when data prefetching
   helps. Otherwise, run everything on the client, matching today’s IndexedDB
   usage.
3. Centralize stores in `src/lib/features/*/store.ts`. Derive view-specific
   data (filtered tasks, elapsed time) with Svelte `derived` stores instead of
   ad-hoc computations inside components.
4. Maintain parity for timer behaviors: focus sessions, breaks, skip, and save
   interactions must match the worker-driven logic we have today.

## 5. Feature parity checklist
- **Home page:** tasks list with search & filters, quick-create dialog, task
  completion toggles, empty states, sync indicator, and timer/time accumulator
  widgets.
- **Completed tasks page:** same list but filtered by completed status.
- **Task detail page:** full edit form with validation, tag assignment, timer
  history, and delete dialog.
- **Tags management:** add, rename, delete, and persist tags locally.
- **Timer:** worker-backed countdown, notifications, sound cues, skip/resume,
  and persisted stats.
- **Theme switching:** light/dark toggle stored in local storage and applied to
  `document.documentElement`.

## 6. Delivery expectations
- Produce a clean SvelteKit repo with the above structure and parity.
- Document setup steps (`npm install`, `npm run dev`, `npm run build`) in the
  README.
- Provide a smoke checklist describing how to validate key flows manually once
  the SvelteKit app runs locally.

By following this playbook, an agent can rebuild Activities Monitor on SvelteKit
from scratch while preserving the product experience users expect.
