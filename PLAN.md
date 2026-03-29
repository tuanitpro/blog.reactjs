# Improvement Plan

Based on code review conducted 2026-03-29, updated 2026-03-30.

---

## Medium Priority — Architecture

- [ ] **Move hardcoded menu ID to config**
  Replace `"dGVybToxMw=="` with an env variable `VITE_MENU_ID`.
  Files: `src/components/Sidebar/ExternalLink.tsx`
