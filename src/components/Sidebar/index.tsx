import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { X, Menu, Search } from "lucide-react";
import Logo from "@components/Logo";
import Hero from "@components/Hero";
import Navigation from "@components/Navigation";
import Footer from "@layouts/Footer";
import ThemeToggle from "@components/ThemeToggle";
import Category from "./Category";
import ExternalLink from "./ExternalLink";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      {/* ── Desktop sidebar — fixed ─────────────────── */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 w-64 h-screen bg-bg-primary/80 backdrop-blur-xl border-r border-border/50 z-30">
        <header className="flex-none px-6 py-10 border-b border-border/30">
          <div className="flex flex-col items-start gap-6">
            <div className="w-full flex items-center justify-between">
              <Logo />
              <ThemeToggle showLabel />
            </div>
            <Hero />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto py-6">
          <Navigation toggleVisibility={() => {}} />

          <div className="px-6 py-6 mt-4 border-t border-border/30">
            <form role="search" method="get" action={import.meta.env.VITE_BLOG_URL}>
              <div className="relative group">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-accent transition-colors pointer-events-none" />
                <input
                  placeholder="Tìm kiếm…"
                  type="search"
                  name="s"
                  className="w-full bg-box/50 border border-border/50 pl-9 pr-3 py-2.5 text-sm text-foreground outline-none focus:border-accent/50 focus:bg-box placeholder:text-foreground/30 transition-all duration-300 rounded-sm"
                />
              </div>
            </form>
          </div>

          <Category />
          <ExternalLink />
        </div>

        <div className="p-6 border-t border-border/30">
          <Footer />
        </div>
      </aside>

      {/* ── Mobile / tablet fixed top bar ───────────────────────────────── */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 z-40 bg-bg-primary border-b border-border flex items-center px-4 gap-3">
        <Logo />
        <div className="flex-1 min-w-0">
          <Hero />
        </div>
        <ThemeToggle />
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
            className="lg:hidden fixed top-0 left-0 h-screen w-72 bg-bg-primary/95 backdrop-blur-xl border-r border-border/50 z-50 flex flex-col shadow-2xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center h-16 px-4 gap-3 border-b border-border/30 shrink-0">
              <Logo />
              <div className="flex-1 min-w-0">
                <Hero />
              </div>
              <ThemeToggle />
              <button
                className="shrink-0 w-10 h-10 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-foreground/5 rounded-full transition-colors cursor-pointer"
                onClick={close}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <Navigation toggleVisibility={close} />

              <div className="px-8 py-6 mt-4 border-t border-border/30">
                <form role="search" method="get" action={import.meta.env.VITE_BLOG_URL}>
                  <div className="relative group">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-accent transition-colors pointer-events-none" />
                    <input
                      placeholder="Tìm kiếm…"
                      type="search"
                      name="s"
                      className="w-full bg-box/50 border border-border/50 pl-9 pr-3 py-2.5 text-xs text-foreground outline-none focus:border-accent/50 focus:bg-box placeholder:text-foreground/30 transition-all duration-300 rounded-sm"
                    />
                  </div>
                </form>
              </div>

              <Category toggleVisibility={close} />
              <ExternalLink />
            </div>

            <div className="p-8 border-t border-border/30">
              <Footer />
            </div>
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
