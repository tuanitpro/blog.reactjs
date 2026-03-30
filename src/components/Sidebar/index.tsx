import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { X, Menu } from "lucide-react";
import Logo from "@components/Logo";
import Hero from "@components/Hero";
import Navigation from "@components/Navigation";
import Footer from "@layouts/Footer";
import Category from "./Category";
import ExternalLink from "./ExternalLink";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      {/* ── Desktop sidebar — fixed ─────────────────── */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 w-72 h-screen bg-bg-primary border-r border-border shadow-sm z-30">
        <header className="flex-none px-6 py-6 border-b border-border">
          <div className="flex flex-col items-start gap-4">
            <Logo />
            <Hero />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <Navigation toggleVisibility={() => {}} />

          <div className="px-6 py-4 border-t border-border">
            <form role="search" method="get" action={import.meta.env.VITE_BLOG_URL}>
              <input
                placeholder="Search…"
                type="search"
                name="s"
                className="w-full bg-box border border-border rounded px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/40 placeholder:text-foreground/40 transition-colors"
              />
            </form>
          </div>

          <Category />
          <ExternalLink />
        </div>

        <Footer />
      </aside>

      {/* ── Mobile / tablet fixed top bar ───────────────────────────────── */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 z-40 bg-bg-primary border-b border-border flex items-center px-4 gap-3">
        <Logo />
        <div className="flex-1 min-w-0">
          <Hero />
        </div>
        <button
          className="shrink-0 text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
          onClick={open}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed top-0 left-0 h-screen w-72 bg-bg-primary border-r border-border z-50 flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div className="flex items-center h-16 px-4 gap-3 border-b border-border shrink-0">
              <Logo />
              <div className="flex-1 min-w-0">
                <Hero />
              </div>
              <button
                className="shrink-0 text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                onClick={close}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <Navigation toggleVisibility={close} />

              <div className="px-6 py-4 border-t border-border">
                <form role="search" method="get" action={import.meta.env.VITE_BLOG_URL}>
                  <input
                    placeholder="Search…"
                    type="search"
                    name="s"
                    className="w-full bg-box border border-border rounded px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/40 placeholder:text-foreground/40 transition-colors"
                  />
                </form>
              </div>

              <Category toggleVisibility={close} />
              <ExternalLink />
            </div>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Backdrop ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-black/40 z-[49]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
