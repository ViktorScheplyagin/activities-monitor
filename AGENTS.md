# Activities Monitor – Agent Handbook

## 1. Project at a glance
- This is a Next.js 14 App Router project written in TypeScript and styled with TailwindCSS.
- State is primarily managed with Zustand stores, forms are built with `react-hook-form` + Zod resolvers, and persistence relies on the IndexedDB wrapper in `src/shared/api/indexed-db.ts`.
- Feature-Sliced Design (FSD) is enforced: `app/` hosts Next.js route entries, `src/pages-layer` wires page-level compositions, `src/widgets` hold layout-level composites, `src/features` encapsulate user-facing capabilities, `src/entities` provide domain models & API facades, and `src/shared` contains design system primitives, utilities and infrastructure.

## 2. Structural conventions
- Keep new code inside the appropriate FSD layer. Cross-layer imports should only point downwards (e.g. pages -> features -> entities -> shared).
- Re-export public surface from each slice through its local `index.ts` (see `src/features/task-create/index.ts`). When exposing cross-feature glue, add a scoped `@x` directory (e.g. `src/features/task-search/@x/tasks-list`).
- When adding new pages, create a composition component under `src/pages-layer/<page>` and consume it inside the matching file in `app/` (compare `app/page.tsx` with `src/pages-layer/home/ui/Home.tsx`).
- Shared UI lives under `src/shared/ui`. Prefer the existing primitives, especially the neomorphic components (`src/shared/ui/neomorphic`) to keep the visual language consistent.

## 3. Coding guidelines
- Prefer functional React components with explicit prop interfaces and keep hooks at the top of component bodies.
- Type everything – rely on the exported interfaces such as `TaskData` (`src/entities/task/api/dto/task.ts`) and `TaskStatus` instead of inlining shapes.
- When working with forms, use the schemas in `src/features/task-form/model` / `src/features/task-create/model` and extend them with Zod if validation rules change.
- Zustand stores live in `model/store.ts` files. Mutations should use the existing setter helpers and keep side-effects (IndexedDB operations, console logging, etc.) inside the store methods.
- The helper `cn` is available via both `@/lib/utils` and `@/shared/lib/utils`. Match the import style already used in the file you touch; do not introduce yet another helper.
- Maintain existing formatting. The repository mixes Prettier’s 2-space default and hand-formatted 4-space blocks—follow the surrounding style in the file being edited and run Prettier if in doubt.
- Keep "use client" directives at the top of files that depend on browser-only APIs (e.g. Zustand hooks, window/document access).
- Web worker logic for the timer lives in `src/features/timer/workers/timeWorker.ts`; if you adjust timer behavior also review the hook in `src/features/timer/model/timer.ts` and the Zustand store in `src/features/timer/model/store.ts` for consistency.
- The pomodoro `TimeAccumulator` integrates with both the timer store and the tasks API. When changing timer flows, ensure skipped time (`skippedTimeSpent`) continues to sync with `useTimeAccumulatorStore` (`src/features/time-accumulator/ui/TimeAccumulator.tsx`).

## 4. Data & persistence notes
- All task CRUD goes through `src/entities/task/api/tasksApi.ts`, which delegates to the IndexedDB service in `src/shared/api/indexed-db.ts`. Always reuse this layer to keep data normalization (IDs, timestamps, status defaults) consistent.
- Task records store `createdAt`/`updatedAt` as `Date` objects. When hydrating from IndexedDB, be mindful to convert strings back to `Date` if you ever change the storage strategy.
- Tag management is handled locally via the persisted Zustand store in `src/features/tags/model/store.ts`; when mutating tags reuse its helper methods to keep persistence working.

## 5. UI patterns
- Build new UI with the neomorphic primitives (`Card`, `Button`, `Checkbox`, `Command`, etc.) exported from `@/shared/ui/neomorphic`. They already encapsulate the custom shadows and transitions defined in `tailwind.config.js`.
- `src/app/globals.css` defines color tokens, box-shadows, and font faces (e.g. DS-Digital for the timer). Avoid redefining these values; extend via Tailwind utility classes instead.
- Theme switching relies on the store in `src/features/theme/model/store.ts`. To add theme-aware styles, prefer Tailwind’s `dark:` variants.
- Notification assets live under `public/features/notification/assets`; audio playback & permission handling are abstracted in `src/features/notification/lib`.

## 6. Testing & quality checks
- Run `npm run lint` and `npm test` before submitting changes. Jest is configured in `jest.config.ts` and already mocks timers/web workers where needed (`src/features/timer/ui/Timer.test.tsx`).
- Storybook stories reside in `src/stories`; if you add visual primitives or adjust shared components, keep stories updated and validate with `npm run storybook` locally when possible.
- Next.js builds are performed with `npm run build`. Run this if you touch framework configuration or data-fetching logic that could impact production builds.

## 7. Common workflows
- To create a new feature: scaffold `ui/`, `model/`, `lib/` directories as needed, export via `index.ts`, and provide cross-slice access through `@x` if other features must consume its store or helpers.
- To extend task flows (creation/editing/deletion), coordinate updates across `src/features/task-create`, `src/features/task-form`, `src/features/task-delete`, and the `TasksList` store so UI, state and persistence stay aligned.
- When adjusting timer settings or controls, update the related tests (`src/features/timer/model/store.test.ts`, `src/features/timer/ui/Timer.test.tsx`) to reflect the new behavior.

Refer back to this document before making changes so future work stays aligned with the project’s architecture and tooling.
