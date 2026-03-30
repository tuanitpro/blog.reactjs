# Website Redesign Plan

---

## Redesign Goals

1. **Switch to Tailwind CSS** — replace `App.css` / `media-query.css` / component CSS files with Tailwind utility classes
2. **Add Framer Motion** — page transitions, element entrance animations, hover/tap effects
3. **Virtual Scroll** — replace the current infinite scroll + DOM accumulation with `@tanstack/react-virtual`
4. **Scroll-to-top on navigation** — reset window scroll position on every route change

---

## Current Tech Stack (relevant to this plan)

| Concern | Current | Target |
|---|---|---|
| Styling | CSS files + CSS variables (33KB App.css) | Tailwind CSS v4 |
| Animations | CSS keyframes + Lottie | Framer Motion + Lottie |
| Post list rendering | DOM accumulation (infinite scroll appends) | `@tanstack/react-virtual` |
| Scroll on nav | Not handled | `ScrollRestoration` / `useEffect` |

---

## Phase 1 — Install Dependencies

```bash
# Tailwind CSS v4 (Vite plugin)
npm install tailwindcss @tailwindcss/vite @tailwindcss/typography

# Framer Motion (v11+ ships as "motion" package)
npm install motion

# TanStack Virtual
npm install @tanstack/react-virtual
```

### Tailwind v4 Vite config change

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### Update `src/index.css`

Replace manual CSS variable block with Tailwind's `@import "tailwindcss"` directive.
Migrate CSS custom properties into `@theme {}` block.

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #e8e8e8;
  --color-background: #ffffff;
  --color-foreground: #121212;
  --color-box: #f7f7f7;
  --color-border: #d4d4d4;
}

@media (prefers-color-scheme: dark) {
  @theme {
    --color-bg-primary: #212121;
    --color-bg-secondary: #121212;
    --color-background: #121212;
    --color-foreground: #ededed;
    --color-box: #1a1a1a;
    --color-border: #333333;
  }
}
```

---

## Phase 2 — Tailwind Migration

### 2.1 Files to migrate (smallest → largest)

| File | Notes |
|---|---|
| `src/index.css` | Replace CSS vars with Tailwind `@theme` |
| `src/components/Logo/` | Simple, few classes |
| `src/components/Loader/` | Loading overlay |
| `src/components/LoadMoreSpinner/index.css` | Replace keyframe CSS with Tailwind `animate-*` |
| `src/layouts/Footer/` | Simple layout |
| `src/components/Hero/` | Site header branding |
| `src/components/Navigation/` | Nav links, active states |
| `src/components/Sidebar/` | Sidebar layout + mobile toggle |
| `src/components/Modal/index.css` | Modal overlay + dialog |
| `src/components/PostList/` | Card grid / list layout |
| `src/pages/home/` | Page layout |
| `src/pages/about/` | Rich text layout — use `prose dark:prose-invert` |
| `src/pages/contact/` | Form layout |
| `src/pages/category/` | Category header + list |
| `src/layouts/PageLayout/` | Outer wrapper |
| `src/styles/App.css` | **Delete** after all above are migrated |
| `src/styles/media-query.css` | **Delete** after all above are migrated |

### 2.2 Tailwind conventions

- **Dark mode:** `dark:` variant via `@media (prefers-color-scheme: dark)` — matches current approach
- **Responsive:** `sm:` `md:` `lg:` breakpoints map to current media-query.css breakpoints
- **Custom colors** from `@theme` usable as `bg-background`, `text-foreground`, etc.
- **Post/article content:** Apply `prose dark:prose-invert max-w-none` via `@tailwindcss/typography`

### 2.3 Layout grid target

```
Desktop (≥1024px):
┌─────────────────────────────────────────┐
│  Sidebar (256px fixed)  │  Content area  │
│  - Logo                 │  - Hero        │
│  - Navigation           │  - Post list   │
│  - Footer               │                │
└─────────────────────────────────────────┘

Mobile (<1024px):
┌─────────────────────────────────────────┐
│  Top bar (hamburger + logo)             │
│  Content (full width)                   │
│  Drawer sidebar (slide from left)       │
└─────────────────────────────────────────┘
```

---

## Phase 3 — Framer Motion Animations

### 3.1 Page Transitions

Wrap `<Routes>` with `<AnimatePresence mode="wait">` in `App.tsx`, keyed by `location.pathname`.

```tsx
// src/App.tsx
import { AnimatePresence } from 'motion/react'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8,  transition: { duration: 0.2 } },
}

// Each page root element: <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
```

### 3.2 Element Entrance Animations

Use `whileInView` + `viewport={{ once: true }}` for:

- **PostList cards** — stagger fade-up as they scroll into view
- **About page sections** — fade-in from left/right
- **Contact form fields** — stagger slide-in
- **Sidebar nav links** — stagger fade-in on mount

```tsx
// Reusable stagger pattern
const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' }
  })
}
```

### 3.3 Micro-interactions

| Element | Animation |
|---|---|
| Nav links | `whileHover={{ x: 4 }}` subtle translate |
| Post cards | `whileHover={{ scale: 1.02 }}` lift |
| Buttons | `whileTap={{ scale: 0.97 }}` press |
| Modal | `initial={{ scale: 0.95, opacity: 0 }}` → `animate={{ scale: 1, opacity: 1 }}` |
| Mobile sidebar drawer | `x: '-100%'` → `x: 0` slide-in |

### 3.4 Replace CSS keyframe animations with Framer Motion

| Current `@keyframes` | Framer Motion equivalent |
|---|---|
| `spin` | `animate={{ rotate: 360 }}` repeat Infinity |
| `pulse` | `animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}` |
| `bouncing` | `animate={{ y: [0, -10, 0] }}` + stagger |
| `fadeIn` | `initial={{ opacity: 0, scale: 0.95 }}` → animate |

---

## Phase 4 — Virtual Scroll with @tanstack/react-virtual

### 4.1 Problem

`PostList` appends all fetched `<PostItem>` nodes to the DOM. With many posts, DOM size grows unbounded.

### 4.2 Solution — `useVirtualizer`

```tsx
// src/components/PostList/index.tsx
import { useVirtualizer } from '@tanstack/react-virtual'

export function PostList({ posts, fetchNextPage, hasNextPage, isFetchingNextPage }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,  // estimated post card height in px
    overscan: 5,
  })

  // Trigger next page when last virtual item is reached
  useEffect(() => {
    const lastItem = rowVirtualizer.getVirtualItems().at(-1)
    if (!lastItem) return
    if (lastItem.index >= posts.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [rowVirtualizer.getVirtualItems(), hasNextPage, isFetchingNextPage])

  return (
    <div ref={parentRef} className="overflow-auto h-full">
      <div style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}>
        {rowVirtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={rowVirtualizer.measureElement}
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <PostItem post={posts[virtualItem.index]} />
          </div>
        ))}
      </div>
      {isFetchingNextPage && <LoadMoreSpinner />}
    </div>
  )
}
```

### 4.3 Remove `useInfiniteScroll` hook

The existing intersection-observer sentinel is replaced by virtual item boundary detection above.
Delete `src/hooks/useInfiniteScroll.tsx` after migration.

---

## Implementation Order

```
[x] Phase 1  Install deps
[x] Phase 2  Tailwind migration (all CSS files removed, Tailwind utilities in place)
[x] Phase 3  Framer Motion (AnimatePresence + page transitions + micro-interactions)
[x] Phase 4  Virtual scroll PostList refactor (useVirtualizer, useInfiniteScroll deleted)
[x] Phase 5  Scroll to top — handled via <ScrollRestoration /> from react-router-dom
[ ] Polish    Visual refinement pass
```

---

## Files to Delete After Migration

All deleted. ✓

---

## Known Issues

_None._

---

## Dependencies Summary

| Package | Purpose |
|---|---|
| `tailwindcss` | Utility CSS framework (v4) |
| `@tailwindcss/vite` | Vite plugin for Tailwind v4 |
| `@tailwindcss/typography` | Prose styling for post/about content |
| `motion` | Framer Motion v11+ animations |
| `@tanstack/react-virtual` | DOM virtualization for post list |
