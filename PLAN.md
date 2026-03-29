# Improvement Plan

Based on code review conducted 2026-03-29.

---

## High Priority — Security

- [x] **XSS: Sanitize `dangerouslySetInnerHTML`**
  Install `dompurify` + `@types/dompurify`, wrap all `dangerouslySetInnerHTML` usages in `DOMPurify.sanitize()`.
  Files: `src/components/PostList/index.tsx` (usages moved here after PostList refactor)

- [x] **Move Telegram form submission server-side**
  `VITE_TELEGRAM_TOKEN` is exposed in the client bundle. Create a Cloudflare Worker or serverless function to proxy the request. Remove the token from frontend env vars.
  Files: `src/pages/contact/index.tsx`

- [x] **Validate Cloudflare Turnstile token server-side**
  After obtaining the Turnstile token on the client, send it to the proxy endpoint and verify it against `https://challenges.cloudflare.com/turnstile/v0/siteverify` before processing the form.

---

## Medium Priority — Architecture

- [x] **Extract shared `PostList` component**
  `home/index.tsx` and `category/index.tsx` duplicate infinite scroll + modal + GraphQL logic. Create `src/components/PostList/index.tsx` and a `usePostsQuery` hook in `src/hooks/`.

- [x] **`PageLayout` meta tags — no action needed (React 19)**
  React 19 natively hoists `<title>`, `<meta>`, `<link>`, `<style>`, and `<script>` rendered in JSX to `<document.head>`. The current implementation is correct. `useEffect` / `react-helmet-async` are unnecessary workarounds for React ≤ 18.
  Files: `src/layouts/PageLayout/index.tsx`

- [x] **Add TTL to LocalStorage cache**
  Categories and menus are cached forever. Add a timestamp on write and expire after a configurable duration (e.g. 1 hour).
  Files: `src/components/Sidebar/Category.tsx`, `src/components/Sidebar/ExternalLink.tsx`

- [ ] **Move hardcoded menu ID to config**
  Replace `"dGVybToxMw=="` with an env variable `VITE_MENU_ID`.
  Files: `src/components/Sidebar/ExternalLink.tsx`

---

## Medium Priority — Type Safety

- [ ] **Strengthen `post` type**
  Make `title` required or add explicit null guards everywhere it is used. Add a separate type for category query response shape.
  Files: `src/types/posts.type.ts`

- [ ] **Type route params**
  Add a typed `useParams` wrapper or assertion in category page.
  Files: `src/pages/category/index.tsx`

---

## Low Priority — Code Quality

- [x] **Remove duplicate router dependency**
  Delete `react-router` from `dependencies`; keep only `react-router-dom` (v7 merges them).
  Files: `package.json`

- [x] **Move test/build tools to `devDependencies`**
  Move `eslint-plugin-jest`, `jest-transform-css` out of `dependencies`.
  Files: `package.json`

- [x] **Add top-level `ErrorBoundary`**
  Wrap the route tree in an `ErrorBoundary` component to prevent full-app crashes.
  Files: `src/App.tsx`

- [x] **Reduce `useInfiniteScroll` bottom margin**
  Change `rootMargin: "0px 0px 400px 0px"` to `"0px 0px 150px 0px"` for better UX.
  Files: `src/hooks/useInfiniteScroll.tsx`

- [x] **Remove `React.Profiler` from production**
  Wrap profiler in a dev-only condition or remove it.
  Files: `src/index.tsx`
