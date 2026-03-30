import { useRef } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence } from "motion/react";

import Sidebar from "@components/Sidebar";
import ErrorBoundary from "@components/ErrorBoundary";

import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Category from "./pages/category";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { ScrollContext } from "./contexts/ScrollContext";

const queryClient = new QueryClient();

const AppContent = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useScrollToTop(scrollRef);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <ScrollContext.Provider value={scrollRef}>
        <div ref={scrollRef} className="flex-1 h-full overflow-y-auto pt-[72px] lg:pt-0">
          <main className="w-full max-w-3xl mx-auto px-8 lg:px-16 py-12 lg:py-14">
            <ErrorBoundary>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path=":slug" element={<Category />} />
                </Routes>
              </AnimatePresence>
              <Outlet />
            </ErrorBoundary>
          </main>
        </div>
      </ScrollContext.Provider>

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
);

export default App;
